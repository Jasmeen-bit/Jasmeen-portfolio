
"use strict";

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Scroll progress bar
const progressBar = document.getElementById("scrollProgress");

function updateProgress() {
  const scrollable =
    document.documentElement.scrollHeight - window.innerHeight;

  const percent = scrollable > 0
    ? (window.scrollY / scrollable) * 100
    : 0;

  progressBar.style.width = `${percent}%`;
}

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

// Reveal elements when they enter the screen
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Offline portfolio assistant
const chatLauncher = document.getElementById("chatLauncher");
const chatPanel = document.getElementById("chatPanel");
const chatClose = document.getElementById("chatClose");
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");

function openChat() {
  chatPanel.classList.add("open");
  chatPanel.setAttribute("aria-hidden", "false");
  chatInput.focus();
}

function closeChat() {
  chatPanel.classList.remove("open");
  chatPanel.setAttribute("aria-hidden", "true");
}

chatLauncher.addEventListener("click", () => {
  if (chatPanel.classList.contains("open")) {
    closeChat();
  } else {
    openChat();
  }
});

chatClose.addEventListener("click", closeChat);

// Create messages safely using textContent
function addMessage(text, type) {
  const message = document.createElement("div");
  message.className = `chat-message ${
    type === "user" ? "user-message" : "bot-message"
  }`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Keep responses limited to information documented in the portfolio.
// This is keyword matching, not a generative AI model.
function answerQuestion(question) {
  const q = question.toLowerCase().replace(/[’']/g, "");

  const contains = (...terms) => terms.some((term) => q.includes(term));

  // Unknown or unrelated topics should not receive invented answers.
  const jasmeenContext = contains(
    "jasmeen", "her", "she", "hers", "resume", "cv",
    "portfolio", "analyst", "experience", "work", "job",
    "career", "skill", "tool", "project", "education",
    "degree", "college", "university", "certification",
    "certificate", "power bi", "tableau", "python", "sql",
    "excel", "dashboard", "data", "contact", "email",
    "hire", "strength", "achievement", "intern", "company",
    "instagram", "medical cost", "pizza sales", "cgpa",
    "qualification", "business intelligence", "dax", "pandas",
    "numpy", "power query", "marketing", "records", "records",
    "download", "pdf", "report", "kpi", "about"
  );

  if (!jasmeenContext) {
    return "I'm Jasmeen's portfolio assistant, so I can answer questions only about her professional profile, work experience, skills, projects, education, resume, and contact information. Try asking about one of those topics.";
  }

  if (contains("hello", "hi ", "hey", "good morning", "good evening")) {
    return "Hello! 👋 I'm Jasmeen's portfolio assistant. You can ask me about her Data Analyst experience, skills, projects, education, or resume.";
  }

  if (contains("contact", "email", "reach", "get in touch")) {
    return "You can contact Jasmeen at jasmeenmittal91000@gmail.com. Use the email button in the Contact section to write to her.";
  }

  if (contains("download", "view resume", "resume", " cv", "pdf")) {
    return "Jasmeen's resume section has View Resume and Download PDF buttons. To make them work, place her actual resume PDF in the website folder and name it resume.pdf. The file must be included when you publish the website.";
  }

  if (contains("hire", "why should", "why hire", "strength", "suitable", "good fit")) {
    return "Jasmeen brings hands-on experience in data analytics, business intelligence, dashboard development, SQL, Python, Excel and Power BI. Her portfolio lists experience analyzing large datasets, building dashboards, improving data quality and supporting KPI reporting. For specific roles, evaluate her fit against the job requirements and discuss her work directly with her.";
  }

  if (contains("experience", "employment", "companies", "company", "work history", "worked", "job")) {
    return "Jasmeen's listed experience includes:\n\n• WEChartered Consultancy — Associate Data Analyst, January 2026–present.\n• BEOM Ecommerce — Associate Data Analyst, May–November 2025.\n• Trainity — Data Analyst Intern, February–April 2025.\n\nHer work includes dashboards, SQL analysis, data cleaning, reporting and business insights. Scroll to the Experience section for details.";
  }

  if (contains("wechartered", "chartered")) {
    return "At WEChartered Consultancy, Jasmeen's portfolio lists her as an Associate Data Analyst from January 2026. Her stated work includes building 20+ Power BI dashboards, analyzing 200K+ records with SQL, Python, Excel and Power Query, cleaning data, performing exploratory analysis, and supporting KPI reporting.";
  }

  if (contains("beom", "ecommerce", "e-commerce", "myntra", "meta campaign")) {
    return "At BEOM Ecommerce, Jasmeen's portfolio lists her as an Associate Data Analyst from May to November 2025. Her stated work includes analyzing 200K+ sales and customer records, identifying performance trends, analyzing marketing campaigns, and helping improve data accuracy and marketing-spend decisions.";
  }

  if (contains("trainity", "internship", "intern")) {
    return "At Trainity, Jasmeen worked as a Data Analyst Intern from February to April 2025. Her listed achievements include analyzing 50K+ records, reducing SQL retrieval and aggregation time by 35%, and improving reporting efficiency by 20% through Excel automation.";
  }

  if (contains("project", "portfolio work", "case stud", "instagram", "medical cost", "pizza")) {
    return "Jasmeen's listed projects are:\n\n1. Instagram User Analytics — SQL analysis of 150K+ activity records, focusing on engagement, content and user behaviour.\n\n2. Medical Cost Analysis — Excel analysis of 1K+ healthcare records, exploring age, BMI, smoking and regional cost patterns.\n\n3. Pizza Sales Insights — Power BI analysis of 60K+ transactions, covering revenue, orders, products and customer behaviour.\n\nThe dashboard artwork is illustrative. Ask for the original project files if you want to inspect the underlying work.";
  }

  if (contains("skill", "technology", "technical", "tool", "programming", "tech stack")) {
    return "Jasmeen's listed skills include:\n\n• Query and programming: SQL, Python.\n• BI and visualization: Power BI, Tableau, DAX.\n• Data work: Excel, Power Query, Pandas, NumPy, data cleaning, ETL, data modeling and exploratory data analysis.\n• Business work: dashboard development, KPI tracking, reporting and data visualization.";
  }

  if (contains("power bi", "dashboard", "dax")) {
    return "Jasmeen lists Power BI, dashboard development and DAX among her skills. Her WEChartered experience lists 20+ Power BI dashboards. Her Pizza Sales Insights project uses Power BI to examine 60K+ transactions.";
  }

  if (contains("python", "pandas", "numpy", "sql", "excel", "tableau", "power query")) {
    return "Jasmeen lists SQL, Python, Excel, Power BI, Tableau, Power Query, DAX, Pandas and NumPy among her technical skills. Her experience includes data analysis, cleaning, reporting, dashboards and KPI tracking.";
  }

  if (contains("education", "degree", "college", "university", "study", "studied", "cgpa", "qualification")) {
    return "Jasmeen completed a BBA in Business Analytics at Chitkara University (EY Partnership), from 2021 to 2024, with a listed CGPA of 9.6.";
  }

  if (contains("certification", "certificate", "cloudyml", "tcs ion", "leadership")) {
    return "Her listed certifications and training are:\n\n• Data Analytics — CloudyML.\n• UXL: Leadership and Excellence Training.\n• TCS iON Career Edge — Young Professional.";
  }

  if (contains("about", "who is", "introduce", "tell me", "jasmeen")) {
    return "Jasmeen Mittal is a Data Analyst with hands-on experience in data analytics, business intelligence, dashboards and reporting. Her portfolio highlights SQL, Python, Power BI, Excel, Tableau and business-focused analysis. Explore the Experience, Skills, Projects and Resume sections for more details.";
  }

  if (contains("records", "200k", "200,000", "achievement", "impact", "result", "improve", "numbers")) {
    return "Selected figures listed in Jasmeen's portfolio include 20+ Power BI dashboards, analysis of 200K+ records at WEChartered and BEOM Ecommerce, 50K+ records at Trainity, and a 35% reduction in SQL retrieval and aggregation time during her Trainity internship. These figures are taken from the supplied resume information.";
  }

  return "I don't have a verified answer for that specific question in Jasmeen's portfolio information. You can ask me about her work experience, technical skills, projects, education, certifications, resume, or contact details.";
}

// Submit a question
chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const question = chatInput.value.trim();
  if (!question) return;

  addMessage(question, "user");
  chatInput.value = "";

  const reply = answerQuestion(question);

  // A brief pause makes the conversation feel more natural.
  // It does not connect to an AI service.
  window.setTimeout(() => addMessage(reply, "bot"), 180);
});

// Suggested questions
document.querySelectorAll(".suggestion-list button").forEach((button) => {
  button.addEventListener("click", () => {
    const question = button.dataset.question;
    addMessage(question, "user");
    window.setTimeout(() => {
      addMessage(answerQuestion(question), "bot");
    }, 180);
  });
});

// Escape closes the assistant
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeChat();
  }
});
