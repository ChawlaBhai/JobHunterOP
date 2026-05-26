#!/usr/bin/env node

/**
 * onboard.mjs — Interactive Onboarding & Setup Script
 * Handles checking setup status and writing configuration files from user details.
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const ROOT = dirname(fileURLToPath(import.meta.url));

const PATHS = {
  cv: join(ROOT, 'cv.md'),
  profileYml: join(ROOT, 'config', 'profile.yml'),
  profileMd: join(ROOT, 'modes', '_profile.md'),
  portals: join(ROOT, 'portals.yml'),
  applications: join(ROOT, 'data', 'applications.md'),
};

// --- Check Onboarding Status ---
if (process.argv.includes('--check')) {
  const status = {
    cv: existsSync(PATHS.cv),
    profileYml: existsSync(PATHS.profileYml),
    profileMd: existsSync(PATHS.profileMd),
    portals: existsSync(PATHS.portals),
    applications: existsSync(PATHS.applications),
  };
  status.complete = status.cv && status.profileYml && status.profileMd && status.portals && status.applications;
  console.log(JSON.stringify(status, null, 2));
  process.exit(0);
}

// --- Setup Onboarding Files ---
if (process.argv.includes('--setup')) {
  let jsonStr = '';
  const setupIdx = process.argv.indexOf('--setup');
  
  // Try to read payload from argument
  if (process.argv[setupIdx + 1] && !process.argv[setupIdx + 1].startsWith('--')) {
    jsonStr = process.argv[setupIdx + 1];
  } else {
    // Fall back to reading from stdin
    try {
      jsonStr = readFileSync(0, 'utf-8');
    } catch (err) {
      console.error(JSON.stringify({ error: 'Failed to read from stdin: ' + err.message }));
      process.exit(1);
    }
  }

  if (!jsonStr || !jsonStr.trim()) {
    console.error(JSON.stringify({ error: 'Missing JSON payload for --setup' }));
    process.exit(1);
  }

  try {
    const data = JSON.parse(jsonStr);
    
    // Ensure data directories exist
    mkdirSync(join(ROOT, 'data'), { recursive: true });
    mkdirSync(join(ROOT, 'config'), { recursive: true });
    mkdirSync(join(ROOT, 'modes'), { recursive: true });
    mkdirSync(join(ROOT, 'reports'), { recursive: true });
    mkdirSync(join(ROOT, 'output'), { recursive: true });

    // 1. Setup config/profile.yml
    let profileObj = {};
    const examplePath = join(ROOT, 'config', 'profile.example.yml');
    if (existsSync(examplePath)) {
      try {
        profileObj = yaml.load(readFileSync(examplePath, 'utf-8')) || {};
      } catch (e) {
        // Fallback
      }
    }

    profileObj.candidate = profileObj.candidate || {};
    profileObj.candidate.full_name = data.name || profileObj.candidate.full_name || 'Jane Smith';
    profileObj.candidate.email = data.email || profileObj.candidate.email || 'jane@example.com';
    profileObj.candidate.phone = data.phone || profileObj.candidate.phone || '';
    profileObj.candidate.location = data.location || profileObj.candidate.location || 'San Francisco, CA';
    profileObj.candidate.linkedin = data.linkedin || profileObj.candidate.linkedin || '';
    profileObj.candidate.portfolio_url = data.portfolio_url || profileObj.candidate.portfolio_url || '';
    profileObj.candidate.github = data.github || profileObj.candidate.github || '';

    profileObj.target_roles = profileObj.target_roles || {};
    profileObj.target_roles.primary = data.target_roles || profileObj.target_roles.primary || ['Senior AI Engineer'];
    profileObj.target_roles.archetypes = (data.target_roles || ['Senior AI Engineer']).map(role => ({
      name: role,
      level: 'Senior',
      fit: 'primary'
    }));

    profileObj.narrative = profileObj.narrative || {};
    profileObj.narrative.headline = data.headline || `${(data.target_roles && data.target_roles[0]) || 'AI Builder'}`;
    profileObj.narrative.exit_story = data.exit_story || '';
    profileObj.narrative.superpowers = data.superpowers || ['Problem Solving'];
    profileObj.narrative.proof_points = data.proof_points || [];

    profileObj.compensation = profileObj.compensation || {};
    profileObj.compensation.target_range = data.salary_range || '$150K-200K';
    profileObj.compensation.minimum = data.salary_min || '$120K';
    profileObj.compensation.location_flexibility = data.location_flexibility || 'Remote preferred';

    profileObj.location = profileObj.location || {};
    profileObj.location.country = data.country || '';
    profileObj.location.city = data.city || '';
    profileObj.location.timezone = data.timezone || '';
    profileObj.location.visa_status = data.visa_status || 'No sponsorship needed';

    writeFileSync(PATHS.profileYml, yaml.dump(profileObj, { indent: 2 }), 'utf-8');

    // 2. Setup modes/_profile.md
    let profileMdContent = '';
    const profileTemplatePath = join(ROOT, 'modes', '_profile.template.md');
    if (existsSync(profileTemplatePath)) {
      profileMdContent = readFileSync(profileTemplatePath, 'utf-8');
      if (data.exit_story) {
        profileMdContent = profileMdContent.replace(
          '<!-- Replace with YOUR story. This frames everything. -->',
          `Use the candidate's exit story: "${data.exit_story}"`
        );
      }
    } else {
      profileMdContent = `# User Profile Context -- jobhunter-op

## Your Target Roles

| Archetype | Thematic axes | What they buy |
|-----------|---------------|---------------|
${(data.target_roles || ['Senior AI Engineer']).map(r => `| **${r}** | Production systems, optimization, scaling | Expert delivery |`).join('\n')}

## Your Exit Narrative

Use the candidate's exit story: "${data.exit_story || ''}"
`;
    }
    writeFileSync(PATHS.profileMd, profileMdContent, 'utf-8');

    // 3. Setup portals.yml
    let portalsObj = {};
    const portalsExamplePath = join(ROOT, 'templates', 'portals.example.yml');
    if (existsSync(portalsExamplePath)) {
      try {
        portalsObj = yaml.load(readFileSync(portalsExamplePath, 'utf-8')) || {};
      } catch (e) {
        // Fallback
      }
    }

    // Enable/disable standard portals based on preferences
    if (data.enabled_portals && Array.isArray(data.enabled_portals) && portalsObj.search_queries) {
      const enabledList = data.enabled_portals.map(p => p.toLowerCase());
      for (const query of portalsObj.search_queries) {
        const queryName = (query.name || '').toLowerCase();
        // Check if query matches any enabled portal
        const isMatched = enabledList.some(p => {
          if (p === 'greenhouse') return queryName.includes('greenhouse');
          if (p === 'naukri') return queryName.includes('naukri');
          if (p === 'wellfound') return queryName.includes('wellfound');
          if (p === 'linkedinjobs' || p === 'linkedin') return queryName.includes('linkedin');
          if (p === 'weworkremotely') return queryName.includes('weworkremotely');
          if (p === 'remotive') return queryName.includes('remotive');
          if (p === 'remoteok') return queryName.includes('remoteok');
          if (p === 'remote4me') return queryName.includes('remote4me');
          if (p === 'himalayas') return queryName.includes('himalayas');
          return queryName.includes(p);
        });
        query.enabled = isMatched;
      }
    }

    // Add custom portals
    if (data.custom_portals && Array.isArray(data.custom_portals)) {
      portalsObj.search_queries = portalsObj.search_queries || [];
      for (const custom of data.custom_portals) {
        if (custom.name && custom.query) {
          portalsObj.search_queries.push({
            name: custom.name,
            query: custom.query,
            enabled: true
          });
        }
      }
    }

    if (data.target_roles && data.target_roles.length > 0) {
      const keywords = new Set(['AI', 'ML', 'LLM', 'Agent', 'Agentic']);
      for (const role of data.target_roles) {
        keywords.add(role);
        const parts = role.split(/\s+/);
        for (const part of parts) {
          const clean = part.replace(/[^a-zA-Z]/g, '');
          if (clean.length > 3) keywords.add(clean);
        }
      }
      portalsObj.title_filter = portalsObj.title_filter || {};
      portalsObj.title_filter.positive = Array.from(keywords);
    }
    writeFileSync(PATHS.portals, yaml.dump(portalsObj, { indent: 2 }), 'utf-8');


    // 4. Setup cv.md
    const cvText = data.cv_text || `# ${data.name || 'Jane Smith'}

Email: ${data.email || 'jane@example.com'} | Phone: ${data.phone || ''}
Location: ${data.location || 'San Francisco, CA'}
LinkedIn: ${data.linkedin || ''}

## Summary
Highly skilled professional targeting ${(data.target_roles || ['Senior AI Engineer']).join(', ')}.

## Experience
- **Current / Past Role** | Company Name
  *Accomplished key milestones related to targeted positions.*

## Skills
- Technical and communication skills listed here.
`;
    writeFileSync(PATHS.cv, cvText, 'utf-8');

    // 5. Setup data/applications.md
    if (!existsSync(PATHS.applications)) {
      writeFileSync(PATHS.applications, `# Applications Tracker

| # | Date | Company | Role | Score | Status | PDF | Report | Notes |
|---|------|---------|------|-------|--------|-----|--------|-------|
`, 'utf-8');
    }

    console.log(JSON.stringify({ status: 'success', message: 'Onboarding setup completed successfully!' }));
    process.exit(0);
  } catch (err) {
    console.error(JSON.stringify({ error: 'Failed to write configurations: ' + err.message }));
    process.exit(1);
  }
}

console.error(JSON.stringify({ error: 'Invalid command arguments. Use --check or --setup <JSON>' }));
process.exit(1);
