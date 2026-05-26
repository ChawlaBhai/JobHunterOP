document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Interactive Score Calculator
  const valRole = document.getElementById('val-role');
  const valComp = document.getElementById('val-comp');
  const valGrowth = document.getElementById('val-growth');
  const valLegit = document.getElementById('val-legit');

  const lblRole = document.getElementById('lbl-role');
  const lblComp = document.getElementById('lbl-comp');
  const lblGrowth = document.getElementById('lbl-growth');
  const lblLegit = document.getElementById('lbl-legit');

  const finalScore = document.getElementById('final-score');
  const scoreVerdict = document.getElementById('score-verdict');
  const progressCircle = document.getElementById('progress-ring__circle');

  const circumference = 2 * Math.PI * 70; // r = 70
  progressCircle.style.strokeDasharray = circumference;

  function updateScore() {
    const roleVal = parseInt(valRole.value);
    const compVal = parseInt(valComp.value);
    const growthVal = parseInt(valGrowth.value);
    const legitVal = parseInt(valLegit.value);

    // Update labels
    lblRole.textContent = `${roleVal}%`;
    lblComp.textContent = `${compVal}%`;
    lblGrowth.textContent = `${growthVal}%`;
    lblLegit.textContent = `${legitVal}%`;

    // Weighted Score calculation (Role 40%, Comp 30%, Growth 20%, Legit 10%)
    const scorePct = (roleVal * 0.4) + (compVal * 0.3) + (growthVal * 0.2) + (legitVal * 0.1);
    
    // Scale to 5.0
    const scaledScore = (scorePct / 20).toFixed(1);
    finalScore.textContent = scaledScore;

    // Progress Ring offset
    const offset = circumference - (scorePct / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;

    // Verdict styling
    if (scaledScore >= 4.0) {
      scoreVerdict.textContent = "Strong Fit — Apply Now!";
      scoreVerdict.className = "verdict green";
    } else {
      scoreVerdict.textContent = "Low Fit — Skip application!";
      scoreVerdict.className = "verdict red";
    }
  }

  // Add inputs listeners
  [valRole, valComp, valGrowth, valLegit].forEach(input => {
    input.addEventListener('input', updateScore);
  });

  // Run initial calculation
  updateScore();

  // 3. Interactive Terminal Simulator
  const terminalContent = document.getElementById('terminal-content');
  const restartBtn = document.getElementById('restart-terminal');

  const simulationLines = [
    { type: 'cmd', text: 'gemini' },
    { type: 'output', text: 'Welcome to Gemini CLI (v2.4.1).' },
    { type: 'cmd', text: '/get-me-hired' },
    { type: 'output', text: '🔄 Starting JobHunterOP (by Bidi Bhai) Setup Check...\n   cv.md: ❌ MISSING\n   config/profile.yml: ❌ MISSING\n   portals.yml: ❌ MISSING\n\n⚠️ Setup incomplete. Initializing interactive onboarding...\n' },
    { type: 'prompt', text: 'Step 1/5: Enter your name, email, and location:' },
    { type: 'input', text: 'Bidi Bhai, bidibhai@example.com, San Francisco, CA' },
    { type: 'prompt', text: 'Step 2/5: What roles are you targeting?' },
    { type: 'input', text: 'Senior AI Engineer, MLOps Architect' },
    { type: 'prompt', text: 'Step 3/5: Select portals to enable (default is Greenhouse, Naukri, Wellfound, LinkedInJobs, WeWorkRemotely, Remotive, RemoteOK, Remote4me, Himalayas):' },
    { type: 'input', text: 'Greenhouse, Wellfound, LinkedInJobs. Also add custom: site:hiring.com' },
    { type: 'prompt', text: 'Step 4/5: What is your target salary range?' },
    { type: 'input', text: '$180K - $220K' },
    { type: 'prompt', text: 'Step 5/5: Paste your resume text / profile details:' },
    { type: 'input', text: '10+ years of LLM engineering, productionizing agent workflows, scaling PyTorch clusters.' },
    { type: 'output', text: '⚙️ Processing setup configurations...\n📝 Writing cv.md...\n📝 Writing config/profile.yml...\n📝 Configuring portals.yml (custom: site:hiring.com enabled)...\n📝 Writing applications tracker...\n\n✅ Onboarding complete! All configs saved.\nRun `/jobhunter-op-scan` to search active jobs, or paste a JD URL to evaluate fit!' }
  ];

  let currentLineIndex = 0;
  let typingTimeout;

  function runTerminalSimulation() {
    terminalContent.innerHTML = '';
    currentLineIndex = 0;
    typeNextLine();
  }

  function typeNextLine() {
    if (currentLineIndex >= simulationLines.length) return;

    const line = simulationLines[currentLineIndex];
    const lineElement = document.createElement('div');

    if (line.type === 'cmd') {
      lineElement.innerHTML = `<span class="term-input-prompt">bidi@terminal:~$</span> <span class="typing"></span>`;
      terminalContent.appendChild(lineElement);
      const spanTyping = lineElement.querySelector('.typing');
      typeText(spanTyping, line.text, () => {
        spanTyping.classList.remove('typing');
        currentLineIndex++;
        typingTimeout = setTimeout(typeNextLine, 600);
      });
    } else if (line.type === 'input') {
      lineElement.innerHTML = `<span class="term-input-prompt">></span> <span class="typing"></span>`;
      terminalContent.appendChild(lineElement);
      const spanTyping = lineElement.querySelector('.typing');
      typeText(spanTyping, line.text, () => {
        spanTyping.classList.remove('typing');
        currentLineIndex++;
        typingTimeout = setTimeout(typeNextLine, 800);
      });
    } else if (line.type === 'prompt') {
      lineElement.className = 'term-prompt';
      lineElement.style.color = '#eab308';
      lineElement.textContent = line.text;
      terminalContent.appendChild(lineElement);
      currentLineIndex++;
      typingTimeout = setTimeout(typeNextLine, 700);
    } else {
      lineElement.className = 'term-output';
      lineElement.textContent = line.text;
      terminalContent.appendChild(lineElement);
      // Auto-scroll to bottom of terminal
      terminalContent.scrollTop = terminalContent.scrollHeight;
      currentLineIndex++;
      typingTimeout = setTimeout(typeNextLine, 1000);
    }
  }

  function typeText(element, text, callback) {
    let charIndex = 0;
    function typeChar() {
      if (charIndex < text.length) {
        element.textContent += text.charAt(charIndex);
        charIndex++;
        terminalContent.scrollTop = terminalContent.scrollHeight;
        typingTimeout = setTimeout(typeChar, 40);
      } else {
        if (callback) callback();
      }
    }
    typeChar();
  }

  restartBtn.addEventListener('click', () => {
    clearTimeout(typingTimeout);
    runTerminalSimulation();
  });

  // Start terminal typing simulation
  runTerminalSimulation();
});
