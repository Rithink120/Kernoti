/* ========== UTILITIES ========== */
function sanitize(str) {
  if (!str && str !== "") return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* ========== ELEMENTS ========== */
const stateList = document.getElementById("stateList");
const stateDetails = document.getElementById("stateDetails");
const linksContainer = document.getElementById("linksContainer");
const stateName = document.getElementById("stateName");
const stateSearch = document.getElementById("stateSearch");

const feedbackForm = document.getElementById("feedbackForm");
const feedbackList = document.getElementById("feedbackList");

const themePicker = document.getElementById("themePicker");
const darkModeToggle = document.getElementById("darkModeToggle");
const langPicker = document.getElementById("langPicker");

const chatToggle = document.getElementById("chat-toggle");
const chatMessages = document.getElementById("chat-messages");
const chatInputWrap = document.getElementById("chat-input");
const sendBtn = document.getElementById("sendBtn");
const userInputEl = document.getElementById("userInput");
const voiceBtn = document.getElementById("voiceBtn");
const chatbotRoot = document.getElementById("chatbot");

/* ========== DATA ========== */
const states = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand",
  "Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
  "Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
  "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
  "Uttar Pradesh","Uttarakhand","West Bengal"
];

const stateTranslations = {
  en: [...states],
  ml: [
    "ആന്ധ്രാപ്രദേശ്","അരുണാചൽ പ്രദേശ്","അസ്സാം","ബീഹാർ","ഛത്തീസ്ഗഡ്",
    "ഗോവ","ഗുജറാത്ത്","ഹരിയാന","ഹിമാചൽ പ്രദേശ്","ഝാർഖണ്ഡ്",
    "കർണാടക","കേരളം","മധ്യപ്രദേശ്","മഹാരാഷ്ട്ര","മണിപ്പൂർ",
    "മേഘാലയ","മിസോറം","നാഗാലാൻഡ്","ഒഡീഷ","പഞ്ചാബ്",
    "രാജസ്ഥാൻ","സിക്കിം","തമിഴ്‌നാട്","తెలంగాణ","ത്രിപുര",
    "ഉത്തർപ്രദേശ്","ഉത്തരാഖണ്ഡ്","പശ്ചിമ ബംഗാൾ"
  ],
  hi: [
    "आंध्र प्रदेश","अरुणाचल प्रदेश","असम","बिहार","छत्तीसगढ़",
    "गोवा","गुजरात","हरियाणा","हिमाचल प्रदेश","झारखंड",
    "कर्नाटक","केरल","मध्य प्रदेश","महाराष्ट्र","मणिपुर",
    "मेघालय","मिज़ोरम","नागालैंड","ओडिशा","पंजाब",
    "राजस्थान","सिक्किम","तमिलनाडु","तेलंगाना","त्रिपुरा",
    "उत्तर प्रदेश","उत्तराखंड","पश्चिम बंगाल"
  ]
};

const commonLinks = {
  "Government Services":[ {name:"India Portal",url:"https://www.india.gov.in"}, {name:"MyGov",url:"https://www.mygov.in"} ],
  "Aadhaar":[{name:"UIDAI Website",url:"https://uidai.gov.in"}],
  "PAN Card":[{name:"Apply for PAN",url:"https://www.incometax.gov.in/iec/foportal"}],
  "Exams":[{name:"UPSC",url:"https://upsc.gov.in"},{name:"SSC",url:"https://ssc.nic.in"}],
  "Scholarships":[{name:"National Scholarship Portal",url:"https://scholarships.gov.in"},{name:"AICTE Schemes",url:"https://aicte-india.org/schemes"}],
  "School & College Updates":[{name:"CBSE",url:"https://cbse.gov.in"}],
  "Notifications":[{name:"Employment News",url:"https://employmentnews.gov.in"}]
};

const keralaLinks = {
  "Kerala PSC":[{name:"Kerala PSC Official",url:"https://www.keralapsc.gov.in"}],
  "KTU (APJ Abdul Kalam Technological University)":[{name:"KTU Portal",url:"https://ktu.edu.in"}],
  "Police & Safety":[{name:"Kerala Police",url:"https://keralapolice.gov.in"}],
  "Tourism & Culture":[{name:"Kerala Tourism - Official Site",url:"https://www.keralatourism.org"}]
};

const translations = {
  en: {
    title:"Kernoti",
    subtitle:"Your gateway to Indian state services and student resources",
    feedbackTitle:"Give Us Feedback",
    backBtn:"← Back",
    searchPlaceholder:"Search for a state..."
  },
  ml: {
    title:"കർണോറ്റി",
    subtitle:"ഇന്ത്യൻ സംസ്ഥാന സേവനങ്ങളും വിദ്യാർത്ഥി സ്രോതസ്സുകളും",
    feedbackTitle:"ഞങ്ങൾക്ക് അഭിപ്രായം നൽകുക",
    backBtn:"← തിരികെ",
    searchPlaceholder:"സംസ്ഥാനം തിരയൂ..."
  },
  hi: {
    title:"केरनोटी",
    subtitle:"भारतीय राज्य सेवाओं और छात्र संसाधनों का द्वार",
    feedbackTitle:"हमें अपनी राय दें",
    backBtn:"← वापस",
    searchPlaceholder:"राज्य खोजें..."
  }
};

/* ========== RENDER STATES ========== */
function renderStates(lang = "en") {
  if (!stateList) return;
  stateList.innerHTML = "";
  stateTranslations[lang].forEach((stateLabel, idx) => {
    const btn = document.createElement("button");
    btn.textContent = stateLabel;
    btn.style.background = getComputedStyle(document.documentElement).getPropertyValue("--primary-color");
    btn.onclick = () => showLinks(states[idx], stateLabel);
    stateList.appendChild(btn);
  });
}

/* ========== SEARCH ========== */
if (stateSearch) {
  stateSearch.addEventListener("input", () => {
    const q = stateSearch.value.trim().toLowerCase();
    Array.from(stateList.getElementsByTagName("button")).forEach(btn => {
      btn.style.display = btn.textContent.toLowerCase().includes(q) ? "block" : "none";
    });
  });
}

/* ========== SHOW LINKS ========== */
function showLinks(stateEnglish, stateLabel) {
  stateList.classList.add("hidden");
  stateDetails.classList.remove("hidden");
  stateDetails.setAttribute("aria-hidden", "false");
  stateName.textContent = stateLabel;
  linksContainer.innerHTML = "";

  const allLinks = Object.assign({}, commonLinks);
  if (stateEnglish === "Kerala") Object.assign(allLinks, keralaLinks);

  for (const category in allLinks) {
    const box = document.createElement("div");
    box.className = "category-box";
    const title = document.createElement("h3");
    title.textContent = category;
    title.onclick = () => box.classList.toggle("open");
    box.appendChild(title);

    const ul = document.createElement("ul");
    allLinks[category].forEach(link => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = link.url;
      a.textContent = link.name;
      a.target = "_blank";
      li.appendChild(a);
      ul.appendChild(li);
    });
    box.appendChild(ul);
    linksContainer.appendChild(box);
  }
}

function goBack() {
  stateDetails.classList.add("hidden");
  stateDetails.setAttribute("aria-hidden", "true");
  stateList.classList.remove("hidden");
}

/* ========== LANGUAGE ========== */
function applyLanguage(lang) {
  const t = translations[lang] || translations.en;
  const heroTitle = document.getElementById("heroTitle");
  const heroSubtitle = document.getElementById("heroSubtitle");
  const feedbackHeading = document.getElementById("feedbackHeading");
  const backBtn = document.querySelector(".back-btn");

  if (heroTitle) heroTitle.textContent = t.title === undefined ? "All-In-One Platform For Government Exams" : "All-In-One Platform For Government Exams";
  if (heroSubtitle) heroSubtitle.textContent = t.subtitle === undefined ? "Explore state portals, upcoming exams, scholarships & more. Get instant help with our AI chatbot." : t.subtitle;
  if (feedbackHeading) feedbackHeading.textContent = t.feedbackTitle;
  if (backBtn) backBtn.textContent = t.backBtn;
  if (stateSearch) stateSearch.placeholder = t.searchPlaceholder;
}

/* ========== FEEDBACK ========== */
function renderFeedback(name, msg) {
  const div = document.createElement("div");
  div.className = "feedback-item";
  div.innerHTML = `<strong>${sanitize(name)}:</strong><br>${sanitize(msg)}`;
  feedbackList.appendChild(div);
}

feedbackForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const msg = document.getElementById("message").value.trim();
  if (!name || !msg) return;

  renderFeedback(name, msg);
  const saved = JSON.parse(localStorage.getItem("feedbacks") || "[]");
  saved.push({ name, msg });
  localStorage.setItem("feedbacks", JSON.stringify(saved));

  // confirmation
  const note = document.createElement("p");
  note.className = "feedback-confirmation";
  note.textContent = "✅ Thanks for your feedback!";
  feedbackForm.appendChild(note);
  setTimeout(() => note.remove(), 2200);

  feedbackForm.reset();
});

/* ========== CHATBOT (frontend) ========== */
let chatHistory = JSON.parse(localStorage.getItem("chatHistory") || "[]");

function appendMessage(sender, text) {
  const el = document.createElement("div");
  el.className = `message ${sender === "user" ? "user" : "bot"}`;
  el.innerHTML = sanitize(text);
  chatMessages.appendChild(el);
  el.scrollIntoView({ behavior: "smooth", block: "end" });
  return el;
}

async function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;
  appendMessage("user", text);
  input.value = "";

  // show thinking bubble
  const thinkingEl = appendMessage("bot", "Thinking...");

  try {
    const res = await fetch("https://kernoti-backend.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, history: chatHistory })
    });

    if (!res.ok) throw new Error("Network error");
    const data = await res.json();
    const reply = data.reply || "Sorry, I couldn't respond.";
    thinkingEl.textContent = reply;

    // speak
    speak(reply);

    // update history & persist
    chatHistory.push({ role: "user", content: text });
    chatHistory.push({ role: "assistant", content: reply });
    if (chatHistory.length > 28) chatHistory = chatHistory.slice(-28);
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  } catch (err) {
    thinkingEl.textContent = "Error connecting to AI.";
    console.error(err);
  }
}

/* send button & enter handling */
if (sendBtn) sendBtn.addEventListener("click", sendMessage);
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && document.activeElement === userInputEl) {
    e.preventDefault();
    sendMessage();
  }
});

/* restore chat history */
window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("feedbacks") || "[]");
  saved.forEach(fb => renderFeedback(fb.name, fb.msg || fb.message || fb.feedback || ""));

  // theme restore
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    darkModeToggle.textContent = "☀️";
    darkModeToggle.setAttribute("aria-pressed", "true");
  }

  const savedColor = localStorage.getItem("themeColor");
  if (savedColor) {
    document.documentElement.style.setProperty("--primary-color", savedColor);
    if (themePicker) themePicker.value = savedColor;
  }

  const savedLang = localStorage.getItem("language") || "en";
  if (langPicker) langPicker.value = savedLang;
  applyLanguage(savedLang);
  renderStates(savedLang);

  // restore chat messages visually
  const savedChat = JSON.parse(localStorage.getItem("chatHistory") || "[]");
  chatHistory = savedChat;
  savedChat.forEach(item => {
    appendMessage(item.role === "user" ? "user" : "bot", item.content);
  });
});

/* ========== THEME PICKER & DARK MODE ========== */
if (themePicker) {
  themePicker.addEventListener("change", () => {
    const color = themePicker.value;
    document.documentElement.style.setProperty("--primary-color", color);
    localStorage.setItem("themeColor", color);
    renderStates(langPicker.value);
  });
}
if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    darkModeToggle.textContent = isDark ? "☀️" : "🌙";
    darkModeToggle.setAttribute("aria-pressed", isDark ? "true" : "false");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

/* ========== LANGUAGE PICKER ========== */
if (langPicker) {
  langPicker.addEventListener("change", () => {
    const lang = langPicker.value;
    localStorage.setItem("language", lang);
    applyLanguage(lang);
    renderStates(lang);
  });
}

/* ========== NAV HELPERS ========== */
function scrollToStates() {
  document.getElementById("states").scrollIntoView({ behavior: "smooth" });
}

/* ========== CHATBOT TOGGLE & MINIMIZE ========== */
let minimized = false;
if (chatToggle) {
  chatToggle.addEventListener("click", () => {
    minimized = !minimized;
    chatMessages.style.display = minimized ? "none" : "block";
    chatInputWrap.style.display = minimized ? "none" : "flex";
    chatToggle.textContent = minimized ? "⬆" : "_";
  });
}
function toggleChatbot() {
  chatbotRoot.classList.toggle("hidden");
}

/* ========== VOICE INPUT & TTS ========== */
let recognition;
if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  voiceBtn.addEventListener("click", () => {
    try {
      recognition.start();
      voiceBtn.textContent = "🎙️...";
    } catch (err) {
      // some browsers throw if started repeatedly
      console.warn(err);
    }
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    userInputEl.value = transcript;
    voiceBtn.textContent = "🎤";
  };

  recognition.onerror = () => {
    voiceBtn.textContent = "🎤";
  };
} else {
  // fallback: clicking voice shows a short hint
  voiceBtn.addEventListener("click", () => {
    const hint = document.createElement("div");
    hint.className = "message bot";
    hint.textContent = "Voice input not supported in this browser.";
    chatMessages.appendChild(hint);
    setTimeout(() => hint.remove(), 2200);
  });
}

function speak(text) {
  if (!window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}
