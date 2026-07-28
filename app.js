/* Production-Ready JavaScript Logic - HG Digital Solutions Agency Platform */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons with Fallback Retry
  initLucideIcons();

  // Theme Toggle
  initThemeToggle();

  // Mobile Navigation & Drawer with Body Scroll Lock
  initNavigation();

  // Project Showcase Tabs
  initProjectTabs();

  // Interactive Pricing Calculator
  initCalculator();

  // AI Chatbot Widget
  initChatbot();

  // FAQ Accordion
  initAccordion();

  // Contact Form Setup
  initContactForm();

  // Escape key global listener for Modals & Mobile Menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDocModal();
      closeMobileMenu();
    }
  });
});

/* LUCIDE ICON LOADER WITH RETRY LOOP */
function initLucideIcons() {
  const tryLoadIcons = () => {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  };

  tryLoadIcons();
  window.addEventListener('load', tryLoadIcons);
  setTimeout(tryLoadIcons, 300);
  setTimeout(tryLoadIcons, 1000);
}

/* 1. THEME TOGGLE LOGIC */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  
  const savedTheme = localStorage.getItem('hg_theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
    if (themeIcon) themeIcon.setAttribute('data-lucide', 'sun');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-theme');
      document.body.classList.toggle('dark-theme', !isLight);
      
      const newTheme = isLight ? 'light' : 'dark';
      localStorage.setItem('hg_theme', newTheme);
      
      if (themeIcon) {
        themeIcon.setAttribute('data-lucide', isLight ? 'sun' : 'moon');
        initLucideIcons();
      }
    });
  }
}

/* 2. NAVIGATION & MOBILE DRAWER WITH BODY SCROLL LOCK */
function initNavigation() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = navLinks.classList.toggle('active');
      document.body.classList.toggle('scroll-lock', isActive);
      mobileToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    // Close mobile drawer on link tap
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close when clicking outside navbar
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }
}

function closeMobileMenu() {
  const navLinks = document.getElementById('navLinks');
  const mobileToggle = document.getElementById('mobileToggle');
  if (navLinks && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    document.body.classList.remove('scroll-lock');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
  }
}

/* 3. PROJECT TABS & DEMO SWITCHING */
function initProjectTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

/* DEMO 1: ERP INTERACTIVE SIMULATOR */
function simulateErpAddEmployee() {
  const tableBody = document.getElementById('erpTableBody');
  const alertBox = document.getElementById('erpAlert');

  const names = ['Sneha Kulkarni', 'Amitabh Verma', 'Karan Patel', 'Deepa Roy'];
  const roles = ['Frontend Dev', 'QA Engineer', 'Product Lead', 'Accountant'];
  const depts = ['Engineering', 'Quality', 'Product', 'Finance'];

  const randIdx = Math.floor(Math.random() * names.length);
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${names[randIdx]}</td>
    <td>${roles[randIdx]}</td>
    <td>${depts[randIdx]}</td>
    <td><span class="status-chip active">Active</span></td>
  `;

  if (tableBody) tableBody.appendChild(newRow);

  if (alertBox) {
    alertBox.style.display = 'block';
    alertBox.innerHTML = `✅ Added <strong>${names[randIdx]}</strong> to database! Headcount updated.`;
    setTimeout(() => { alertBox.style.display = 'none'; }, 4000);
  }
}

function simulateErpExport() {
  const alertBox = document.getElementById('erpAlert');
  if (alertBox) {
    alertBox.style.display = 'block';
    alertBox.innerHTML = `📄 Generating & downloading Monthly ERP Attendance & Payroll PDF...`;
    setTimeout(() => { alertBox.style.display = 'none'; }, 3500);
  }
}

/* DEMO 2: SPA BOOKING SIMULATOR */
function openSpaBookingModal() {
  const slot = document.getElementById('spaSlotInteractive');
  const msg = document.getElementById('spaStatusMsg');

  if (slot) {
    slot.className = 'spa-slot booked';
    slot.innerHTML = `
      <span>02:00 PM</span>
      <strong>Hydrating Facial Treatment</strong>
      <small>Client: Harshit Gorad (Booked via Web)</small>
    `;
  }

  if (msg) {
    msg.style.display = 'block';
    msg.innerHTML = `🎉 Appointment confirmed for 02:00 PM! SMS & WhatsApp alerts sent.`;
  }
}

/* DEMO 3: MEDICINAL PLANT AI IDENTIFIER SIMULATOR */
function simulatePlantAi(plantName) {
  const previewArea = document.getElementById('plantPreviewArea');
  const resultsBox = document.getElementById('plantResults');

  let plantData = {
    Neem: {
      scientific: 'Azadirachta indica',
      confidence: '98.6%',
      uses: 'Antibacterial, blood purifier, skincare, agricultural pest repellent.',
      color: '#10b981'
    },
    Tulsi: {
      scientific: 'Ocimum sanctum',
      confidence: '99.1%',
      uses: 'Immunity booster, relieves cough & cold, antioxidant, stress relief.',
      color: '#3b82f6'
    }
  };

  const data = plantData[plantName];
  if (!data) return;

  if (previewArea) {
    previewArea.innerHTML = `
      <div style="font-size:2rem;margin-bottom:4px;">🌿</div>
      <strong style="color:${data.color}">${plantName} Leaf Sample</strong>
    `;
  }

  if (resultsBox) {
    resultsBox.innerHTML = `
      <div class="res-card">
        <h4>Identified: ${plantName} (${data.scientific})</h4>
        <p><strong>AI Confidence Score:</strong> ${data.confidence}</p>
        <p><strong>Medicinal Properties:</strong> ${data.uses}</p>
      </div>
    `;
  }
}

/* DEMO 4: HOUSE PRICE ML PREDICTOR SIMULATOR */
function updateMlPrediction() {
  const sqft = parseInt(document.getElementById('sqftInput').value) || 1200;
  const bhk = parseInt(document.getElementById('bhkInput').value) || 2;
  const locMultiplier = parseFloat(document.getElementById('locInput').value) || 0.75;

  const sqftValEl = document.getElementById('sqftVal');
  if (sqftValEl) sqftValEl.textContent = sqft;

  const basePrice = (sqft * 4800 + bhk * 450000) * locMultiplier;
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(basePrice);

  const priceEl = document.getElementById('mlOutputPrice');
  if (priceEl) priceEl.textContent = formattedPrice;
}

/* DEMO 5: RESTAURANT DEMO SIMULATOR */
function simulateRestOrder() {
  const whatsappUrl = `https://wa.me/919699188414?text=${encodeURIComponent(
    'Hi Spice Haven Restaurant, I would like to order: 1x Paneer Butter Masala (₹280) & 1x Biryani Combo (₹340).'
  )}`;
  window.open(whatsappUrl, '_blank');
}

function simulateRestReserve() {
  const name = document.getElementById('restName').value || 'Guest';
  const guests = document.getElementById('restGuests').value || '2';
  alert(`Table Reserved for ${name} (${guests} Guests) tonight at 8:00 PM! Confirmation code sent.`);
}

/* 4. INTERACTIVE PRICING CALCULATOR */
function initCalculator() {
  const radios = document.querySelectorAll('input[name="basePackage"]');
  const checkboxes = document.querySelectorAll('.addon');
  const btnGenEstimate = document.getElementById('btnGenEstimate');

  radios.forEach(r => r.addEventListener('change', calculateTotal));
  checkboxes.forEach(c => c.addEventListener('change', calculateTotal));

  if (btnGenEstimate) {
    btnGenEstimate.addEventListener('click', sendEstimateToWhatsApp);
  }

  calculateTotal();
}

function calculateTotal() {
  const selectedBase = document.querySelector('input[name="basePackage"]:checked');
  const baseVal = selectedBase ? parseInt(selectedBase.value) : 4999;

  let addonVal = 0;
  let selectedAddonNames = [];
  document.querySelectorAll('.addon:checked').forEach(c => {
    addonVal += parseInt(c.value);
    selectedAddonNames.push(c.parentElement.textContent.trim());
  });

  const total = baseVal + addonVal;

  const fmtBase = '₹' + baseVal.toLocaleString('en-IN');
  const fmtAddon = '₹' + addonVal.toLocaleString('en-IN');
  const fmtTotal = '₹' + total.toLocaleString('en-IN');

  const baseEl = document.getElementById('summaryBaseVal');
  const addonEl = document.getElementById('summaryAddonVal');
  const totalEl = document.getElementById('calcTotalPrice');

  if (baseEl) baseEl.textContent = fmtBase;
  if (addonEl) addonEl.textContent = fmtAddon;
  if (totalEl) totalEl.textContent = fmtTotal;

  let delivery = '3-5 Days';
  if (baseVal >= 24999) delivery = '10-14 Days';
  else if (baseVal >= 14999) delivery = '7 Days';
  else if (baseVal >= 9999) delivery = '5-7 Days';

  const delivEl = document.getElementById('calcDelivery');
  if (delivEl) delivEl.textContent = delivery;
}

function sendEstimateToWhatsApp() {
  const selectedBase = document.querySelector('input[name="basePackage"]:checked');
  const baseText = selectedBase ? selectedBase.parentElement.textContent.trim() : 'Landing Page';
  const total = document.getElementById('calcTotalPrice').textContent;

  let addons = [];
  document.querySelectorAll('.addon:checked').forEach(c => {
    addons.push(c.parentElement.textContent.trim());
  });

  const msg = `Hi HG, I built a custom project estimate on your website:\n\n` +
              `📦 Base Package: ${baseText}\n` +
              `➕ Add-ons: ${addons.length > 0 ? addons.join(', ') : 'None'}\n` +
              `💰 Estimated Price: ${total}\n\n` +
              `Can we discuss and get started?`;

  const url = `https://wa.me/919699188414?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

/* 5. AI CHATBOT LOGIC */
function initChatbot() {
  const widget = document.getElementById('chatbotWidget');
  const trigger = document.getElementById('chatbotTrigger');

  if (trigger && widget) {
    trigger.addEventListener('click', () => {
      widget.classList.toggle('active');
    });
  }
}

function handleChatKeyDown(e) {
  if (e.key === 'Enter') {
    submitChatMessage();
  }
}

function sendQuickQuestion(questionText) {
  const input = document.getElementById('chatbotInput');
  if (input) {
    input.value = questionText;
    submitChatMessage();
  }
}

function submitChatMessage() {
  const input = document.getElementById('chatbotInput');
  const chatContainer = document.getElementById('chatbotMessages');
  if (!input || !chatContainer) return;

  const userText = input.value.trim();
  if (!userText) return;

  appendChatMessage(userText, 'user');
  input.value = '';

  setTimeout(() => {
    const botReply = generateAiBotReply(userText);
    appendChatMessage(botReply, 'bot');
  }, 500);
}

function appendChatMessage(text, sender) {
  const chatContainer = document.getElementById('chatbotMessages');
  if (!chatContainer) return;
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-msg ${sender}`;
  msgDiv.innerHTML = text;
  chatContainer.appendChild(msgDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function generateAiBotReply(userMsg) {
  const lower = userMsg.toLowerCase();

  if (lower.includes('price') || lower.includes('cost') || lower.includes('rate') || lower.includes('packages')) {
    return `Our packages start at <strong>₹4,999</strong> for Landing Pages, <strong>₹9,999</strong> for complete 5-Page Business Websites, <strong>₹14,999</strong> for AI Business Websites with Chatbots, and <strong>₹24,999+</strong> for custom ERP Dashboards!`;
  }
  if (lower.includes('delivery') || lower.includes('time') || lower.includes('days') || lower.includes('fast')) {
    return `⚡ Most websites and landing pages are delivered in <strong>5 to 7 days</strong>! Express 3-day delivery is also available.`;
  }
  if (lower.includes('ai') || lower.includes('bot') || lower.includes('chatbot') || lower.includes('automation')) {
    return `🤖 Our AI Chatbots operate 24/7 on your website to answer visitor questions, capture leads, and notify you instantly on WhatsApp & Email!`;
  }
  if (lower.includes('consultation') || lower.includes('call') || lower.includes('contact') || lower.includes('talk')) {
    return `📞 You can book a Free 15-Minute Consultation right now by messaging HG on <a href="https://wa.me/919699188414" target="_blank" style="color:#10b981;font-weight:bold;">WhatsApp here</a>!`;
  }
  if (lower.includes('erp') || lower.includes('dashboard') || lower.includes('system')) {
    return `💼 Our ERP dashboards include Login System, Employee Tracking, Attendance, Admin Controls, and Automated Reports tailored to your business!`;
  }

  return `Thanks for reaching out! HG Digital Solutions helps businesses grow with fast websites and AI automation. Would you like to chat with HG directly on WhatsApp for your custom project? <a href="https://wa.me/919699188414" target="_blank" style="color:#10b981;font-weight:bold;">Click here to connect!</a>`;
}

/* 6. FAQ ACCORDION */
function initAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        items.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* 7. CONTACT FORM SETUP */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value.trim();
      const phone = document.getElementById('contactPhone').value.trim();
      const service = document.getElementById('contactService').value;
      const msg = document.getElementById('contactMsg').value.trim();

      const waText = `Hi HG, I am submitting an inquiry from your website:\n\n` +
                     `👤 Name: ${name}\n` +
                     `📞 Phone: ${phone}\n` +
                     `🎯 Service: ${service}\n` +
                     `💬 Message: ${msg || 'Interested in discussing a project.'}`;

      window.open(`https://wa.me/919699188414?text=${encodeURIComponent(waText)}`, '_blank');
    });
  }
}

/* 8. BUSINESS DOCUMENTS MODALS & PDF PRINT */
function openPdfModal() {
  window.print();
}

function openDocModal(docType) {
  const overlay = document.getElementById('docModalOverlay');
  const modalContent = document.getElementById('modalContent');
  if (!overlay || !modalContent) return;

  let contentHtml = '';

  if (docType === 'proposal') {
    contentHtml = `
      <h2 style="color:var(--primary-blue);margin-bottom:16px;">📁 Ready Client Proposal Template</h2>
      <p style="margin-bottom:12px;color:var(--text-secondary);">Copy this high-converting client proposal draft when pitching business prospects.</p>
      <div style="background:var(--bg-primary);padding:20px;border-radius:8px;border:1px solid var(--border-color);font-family:monospace;font-size:0.85rem;white-space:pre-wrap;color:var(--text-primary);max-height:400px;overflow-y:auto;">
<strong>PROJECT PROPOSAL: BUSINESS WEBSITE & AI AUTOMATION SYSTEM</strong>
-------------------------------------------------------------------
Prepared For: [Client Business Name]
Prepared By: HG Digital Solutions (Harshit Gorad)
Date: ${new Date().toLocaleDateString()}

<strong>1. EXECUTIVE SUMMARY</strong>
We propose building a high-converting, mobile-responsive business website integrated with custom WhatsApp lead triggers and an AI Chatbot Assistant.

<strong>2. SCOPE OF DELIVERABLES</strong>
• 5-Page Responsive Business Website
• 24/7 Automated AI FAQ Chatbot Widget
• WhatsApp Instant Lead Capture Button
• Google Maps & Contact Form Integration
• Search Engine Optimization (SEO)

<strong>3. TIMELINE & PRICING SHEET</strong>
• Investment: ₹14,999 (One-Time)
• Express Delivery: 5 - 7 Business Days

<strong>4. ACCEPTANCE & NEXT STEPS</strong>
To confirm this proposal, reply with "APPROVED" or reach out via WhatsApp at +91 9699188414.
      </div>
      <div style="margin-top:20px;text-align:right;">
        <a href="https://wa.me/919699188414?text=Hi%20HG%2C%20I%20want%20to%20send%20this%20Proposal%20to%20a%20client." target="_blank" class="btn btn-primary sm">
          Send via WhatsApp
        </a>
      </div>
    `;
  } else if (docType === 'agreement') {
    contentHtml = `
      <h2 style="color:var(--accent-green);margin-bottom:16px;">📜 Service Agreement & Quotation Template</h2>
      <div style="background:var(--bg-primary);padding:20px;border-radius:8px;border:1px solid var(--border-color);font-family:monospace;font-size:0.85rem;white-space:pre-wrap;color:var(--text-primary);max-height:400px;overflow-y:auto;">
<strong>FREELANCE SERVICE AGREEMENT</strong>
----------------------------
Provider: HG Digital Solutions
Client: [Client Name / Company]

<strong>TERMS & PAYMENT STAGES:</strong>
1. 50% Upfront Advance upon project signup.
2. 50% Final Balance upon completion and client review prior to live domain release.

<strong>REVISION & SUPPORT:</strong>
• Up to 3 rounds of design/content revisions included.
• Free post-launch technical support for 30 days.
      </div>
    `;
  } else if (docType === 'github') {
    contentHtml = `
      <h2 style="color:var(--primary-blue);margin-bottom:16px;">🐙 GitHub Repository & LinkedIn Specs</h2>
      <div style="background:var(--bg-primary);padding:20px;border-radius:8px;border:1px solid var(--border-color);font-family:monospace;font-size:0.85rem;white-space:pre-wrap;color:var(--text-primary);max-height:400px;overflow-y:auto;">
<strong>LINKEDIN HEADLINE SPEC:</strong>
AI Web Developer | React | Node.js | Business Websites | ERP Systems | AI Automation

<strong>PINNED GITHUB REPOSITORIES:</strong>
1. ERP Management System (React, Node, MongoDB)
2. Spa Management System (React, Firebase)
3. Medicinal Plant AI Identifier (Python, TensorFlow)
4. House Price Prediction Engine (Python, Flask, ML)
5. HG Digital Portfolio Agency Site (HTML, CSS, JS)
      </div>
    `;
  }

  modalContent.innerHTML = contentHtml;
  overlay.classList.add('active');
  document.body.classList.add('scroll-lock');
  initLucideIcons();
}

function closeDocModal() {
  const overlay = document.getElementById('docModalOverlay');
  if (overlay && overlay.classList.contains('active')) {
    overlay.classList.remove('active');
    document.body.classList.remove('scroll-lock');
  }
}
