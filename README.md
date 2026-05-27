# 🎯 JobHunterOP — The Ultimate CLI Job Hunting Sniper (by Bidi Bhai)



<p align="center">
  <img src="docs/hero-banner.jpg" alt="JobHunterOP — CLI Job Hunting Sniper" width="800">
</p>

<p align="center">
  <em>"I got tired of sending 500 copy-paste resumes to black hole job portals. So I built a weapon."</em><br>
  Companies use AI bots to screen you out. <strong>It's your time now to use AI to filter them out!</strong><br>
  <em>Made by <strong>Bidi Bhai</strong>. 100% Open Source.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Gemini_CLI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini CLI">
  <img src="https://img.shields.io/badge/Claude_Code-000?style=for-the-badge&logo=anthropic&logoColor=white" alt="Claude Code">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white" alt="Playwright">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT">
</p>

---

<p align="center"><strong>740+ listings evaluated · 100+ tailored CVs generated · Landed a Head of Applied AI role</strong></p>

## What is JobHunterOP?

**JobHunterOP** (pronounced *JobHunter-O-P*, as in Overpowered) is a command-line pipeline that turns your terminal into a job search control center. It scans major ATS platforms and portals (Greenhouse, Ashby, Lever, Naukri, Wellfound, LinkedInJobs, WeWorkRemotely, Remotive, RemoteOK, Remote4me, Himalayas, and custom search engines), automatically checks if job links are still live using headless browsers, scores descriptions against your unique profile, and drafts tailored resumes for every role.

### 🔥 The Gemini CLI Edge (100% Free Engine)
We treat **Gemini CLI** as a first-class citizen. Why? Because you can use the Gemini CLI OAuth/free-tier API keys to run your entire job search pipeline for **exactly $0.00**. No expensive token bills, no rate limits holding you back. Just pure, free, agentic horsepower.

---

## Key Features

- 🕵️‍♂️ **Zero-Token Scanner:** Queries Greenhouse, Ashby, Lever, Naukri, Wellfound, LinkedInJobs, WeWorkRemotely, Remotive, RemoteOK, Remote4me, Himalayas, and custom boards directly without wasting LLM tokens.
- 🎯 **A-G Multi-Dimensional Scoring:** Scores roles out of 5.0 based on compensation, role fit, growth potential, and engineering culture. If it scores below 4.0, the system tells you to skip it. Stop wasting time on low-match listings!
- 📄 **ATS-Optimized PDF Generator:** Automatically generates custom-tailored resumes matching the exact keywords of the job description using beautifully formatted HTML/CSS or LaTeX templates.
- 💬 **Interactive Step-by-Step Onboarding:** No more dump of 50 CLI prompts. Run `/get-me-hired` and answer one simple question at a time to configure your profile, contact details, target roles, and portal preferences.
- 💻 **Bubble Tea TUI Dashboard:** Built-in terminal dashboard to browse, sort, and track your pipeline.
- 🛑 **Human-in-the-Loop:** We never apply for you automatically. Quality over quantity. You make the final call before hit submit.

---

## Quick Start (Under 3 Minutes)

### 1. Prerequisites
Make sure you have **Node.js (v18+)** and **npm** installed.
```bash
# Clone the repository
git clone https://github.com/ChawlaBhai/JobHunterOP.git
cd JobHunterOP

# Install dependencies
npm install

# Install Playwright browser engines (required for PDF resumes and liveness checks)
npx playwright install chromium
```

### 2. Run the Doctor
Check if your local system has all required modules ready:
```bash
npm run doctor
```

### 3. Start Onboarding
Open the Gemini CLI and start the interactive wizard:
```bash
# Install Gemini CLI globally if you haven't already
npm install -g @google/gemini-cli
gemini auth

# Launch the CLI session inside the repository
gemini
```
Inside the Gemini session, trigger the step-by-step onboarding by typing:
```
/get-me-hired
```
The wizard will ask you one question at a time: name, contact info, target roles, target salary, portal preferences (select from Greenhouse, Naukri, Wellfound, LinkedInJobs, WeWorkRemotely, Remotive, RemoteOK, Remote4me, Himalayas, etc., or add your own custom ones), and experience.

---

## CLI Slash Commands

Once onboarding is complete, use these commands inside your session:

| Command | Action |
|---------|--------|
| `/get-me-hired` | Launch the onboarding / sniper control center |
| `/jobhunter-op` | Show the main command menu & help |
| `/jobhunter-op {JD_Text_or_URL}` | Runs the full pipeline: evaluates role + drafts tailored resume + adds to tracker |
| `/jobhunter-op-scan` | Scans all configured boards for new openings |
| `/jobhunter-op-evaluate` | Evaluates a job description (scores A-G) without drafting a resume |
| `/jobhunter-op-pipeline` | Processes all pending URLs from `data/pipeline.md` in batch |
| `/jobhunter-op-tracker` | Prints a summary of your application pipeline |
| `/jobhunter-op-pdf` | Generates a tailored ATS-optimized PDF resume |
| `/jobhunter-op-contact` | Drafts a personalized LinkedIn outreach message |

---

## 🚀 How to Use JobHunterOP Like a Pro

To get the absolute best results out of JobHunterOP, follow this highly effective 6-step workflow:

1. **Onboard & Calibrate (`/get-me-hired`):** Run the onboarding wizard to configure your profile and CV. For best results, add 1 or 2 past writing samples (e.g., cover letters or emails) to `writing-samples/` so the humanizer engine can capture and match your natural writing style.
2. **Scan & Verify (`/jobhunter-op-scan`):** Search Greenhouse, Lever, Ashby, Naukri, and other portals. **Always run with `--verify`** (e.g., `node scan.mjs --verify`) to execute Playwright liveness checks. This strips out ghost postings, dead links, and pages without apply buttons before you spend tokens on them.
3. **Review & Batch Process (`/jobhunter-op-pipeline`):** View your inbox in `data/pipeline.md`. Delete low-interest rows, and process the remaining ones. This runs evaluations, scores the matches, and automatically drafts tailored resumes for each role.
4. **Auto-Fill Applications (`/jobhunter-op-apply`):** For roles scoring `4.0/5.0+`, run the live application assistant. The agent opens Chrome, auto-populates all form questions with custom-tailored humanized answers, uploads the generated PDF resume, and stands by for your final manual click to submit.
5. **LinkedIn Outreach Sniper (`/jobhunter-op-contact`):** Do not wait for a callback. Immediately run the contact command to find decision-makers at the company and generate a non-AI-sounding cold message to send.
6. **Track Your Pipeline (`/jobhunter-op-tracker` or TUI):** Use the Bubble Tea TUI dashboard (`./job-dashboard`) to track your interviews, offers, and callbacks locally.

---

## Customizing Portals

JobHunterOP comes pre-configured with **45+ companies** and **19 search queries** targeting top platforms. To customize:
- Customize your preferred portals during onboarding.
- Or edit `portals.yml` directly in the project root.
- To verify job listings are still live and drop expired ones, run:
  ```bash
  node scan.mjs --verify
  ```

---

## Bubble Tea Dashboard TUI

Run the beautiful built-in terminal dashboard to visualize your pipeline:
```bash
cd dashboard
go build -o job-dashboard .
./job-dashboard --path ..
```

---

## Project Structure

```
JobHunterOP/
├── AGENTS.md                    # Core agent instructions (all CLIs)
├── cv.md                        # Canonical resume markdown source of truth
├── config/
│   └── profile.yml              # Your target roles, exit story, and target salary
├── portals.yml                  # Configured search boards & positive/negative keywords
├── modes/                       # Reusable prompts for evaluation and pdf generation
├── templates/                   # HTML/CSS and LaTeX CV templates
├── data/                        # Local applications and pipeline files
├── reports/                     # Generated job evaluation reports
```

---

## Disclaimer

JobHunterOP is a local tool. Your resume, contact details, and logs stay on your machine. We do not collect or track any data. Always review AI-generated resumes for correctness before applying. 

Let's hunt! 🎯
