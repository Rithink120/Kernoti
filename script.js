// ===================== STATE LIST & LINKS =====================
const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

// State translations
const stateTranslations = {
  en: [...states],
  ml: [
    "ആന്ധ്രാപ്രദേശ്", "അരുണാചൽ പ്രദേശ്", "അസ്സാം", "ബീഹാർ", "ഛത്തീസ്ഗഡ്",
    "ഗോവ", "ഗുജറാത്ത്", "ഹരിയാന", "ഹിമാചൽ പ്രദേശ്", "ഝാർഖണ്ഡ്",
    "കർണാടക", "കേരളം", "മധ്യപ്രദേശ്", "മഹാരാഷ്ട്ര", "മണിപ്പൂർ",
    "മേഘാലയ", "മിസോറം", "നാഗാലാൻഡ്", "ഒഡീഷ", "പഞ്ചാബ്",
    "രാജസ്ഥാൻ", "സിക്കിം", "തമിഴ്‌നാട്", "తెలంగాణ", "ത്രിപുര",
    "ഉത്തർപ്രദേശ്", "ഉത്തരാഖണ്ഡ്", "പശ്ചിമ ബംഗാൾ"
  ],
  hi: [
    "आंध्र प्रदेश", "अरुणाचल प्रदेश", "असम", "बिहार", "छत्तीसगढ़",
    "गोवा", "गुजरात", "हरियाणा", "हिमाचल प्रदेश", "झारखंड",
    "कर्नाटक", "केरल", "मध्य प्रदेश", "महाराष्ट्र", "मणिपुर",
    "मेघालय", "मिज़ोरम", "नागालैंड", "ओडिशा", "पंजाब",
    "राजस्थान", "सिक्किम", "तमिलनाडु", "तेलंगाना", "त्रिपुरा",
    "उत्तर प्रदेश", "उत्तराखंड", "पश्चिम बंगाल"
  ]
};

const commonLinks = {
  "Government Services": [
    { name: "India Portal", url: "https://www.india.gov.in" },
    { name: "MyGov", url: "https://www.mygov.in" }
  ],
  "Aadhaar": [{ name: "UIDAI Website", url: "https://uidai.gov.in" }],
  "PAN Card": [{ name: "Apply for PAN", url: "https://www.incometax.gov.in/iec/foportal" }],
  "Exams": [
    { name: "UPSC", url: "https://upsc.gov.in" },
    { name: "SSC", url: "https://ssc.nic.in" }
  ],
  "Scholarships": [
    { name: "National Scholarship Portal", url: "https://scholarships.gov.in" },
    { name: "AICTE Schemes", url: "https://aicte-india.org/schemes" }
  ],
  "School & College Updates": [{ name: "CBSE", url: "https://cbse.gov.in" }],
  "Notifications": [{ name: "Employment News", url: "https://employmentnews.gov.in" }]
};

const keralaLinks = {
  "Kerala PSC": [{ name: "Kerala PSC Official", url: "https://www.keralapsc.gov.in" }],
  "KTU (APJ Abdul Kalam Technological University)": [{ name: "KTU Portal", url: "https://ktu.edu.in" }],
  "Police & Safety": [{ name: "Kerala Police", url: "https://keralapolice.gov.in" }],
  "Tourism & Culture": [{ name: "Kerala Tourism - Official Site", url: "https://www.keralatourism.org" }]
};

const stateList = document.getElementById("stateList");
const stateDetails = document.getElementById("stateDetails");
const linksContainer = document.getElementById("linksContainer");
const stateName = document.getElementById("stateName");

// ===================== RENDER STATES =====================
function renderStates(lang = "en") {
  stateList.innerHTML = "";
  stateTranslations[lang].forEach((stateLabel, idx) => {
    const btn = document.createElement("button");
    btn.textContent = stateLabel;
    btn.onclick = () => showLinks(states[idx], stateLabel); // English key, translated label
    stateList.appendChild(btn);
  });
}

// ===================== STATE SEARCH =====================
const stateSearch = document.getElementById("stateSearch");
if (stateSearch) {
  stateSearch.addEventListener("input", () => {
    const query = stateSearch.value.toLowerCase();
    const buttons = stateList.getElementsByTagName("button");
    Array.from(buttons).forEach(btn => {
      btn.style.display = btn.textContent.toLowerCase().includes(query) ? "block" : "none";
    });
  });
}

function showLinks(stateEnglish, stateLabel) {
  stateList.classList.add("hidden");
  stateDetails.classList.remove("hidden");
  stateName.textContent = stateLabel;
  linksContainer.innerHTML = "";

  const allLinks = { ...commonLinks };
  if (stateEnglish === "Kerala") {
    Object.assign(allLinks, keralaLinks);
  }

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
  stateList.classList.remove("hidden");
}

// ===================== TRANSLATIONS =====================
const translations = {
  en: {
    title: "Kernoti",
    subtitle: "Your gateway to Indian state services and student resources",
    feedbackTitle: "Give Us Feedback",
    backBtn: "← Back",
    searchPlaceholder: "Search for a state...",
  },
  ml: {
    title: "കർണോറ്റി",
    subtitle: "ഇന്ത്യൻ സംസ്ഥാന സേവനങ്ങളും വിദ്യാർത്ഥി സ്രോതസ്സുകളും",
    feedbackTitle: "ഞങ്ങൾക്ക് അഭിപ്രായം നൽകുക",
    backBtn: "← തിരികെ",
    searchPlaceholder: "സംസ്ഥാനം തിരയൂ...",
  },
  hi: {
    title: "केरनोटी",
    subtitle: "भारतीय राज्य सेवाओं और छात्र संसाधनों का द्वार",
    feedbackTitle: "हमें अपनी राय दें",
    backBtn: "← वापस",
    searchPlaceholder: "राज्य खोजें...",
  }
};

const langPicker = document.getElementById("langPicker");
langPicker.addEventListener("change", () => {
  const lang = langPicker.value;
  localStorage.setItem("language", lang);
  applyLanguage(lang);
  renderStates(lang);
});

function applyLanguage(lang) {
  const t = translations[lang] || translations.en;
  document.querySelector("header h1").textContent = t.title;
  document.querySelector("header p").textContent = t.subtitle;
  document.querySelector("#feedbackSection h2").textContent = t.feedbackTitle;
  document.querySelector(".back-btn").textContent = t.backBtn;
  document.querySelector("#stateSearch").placeholder = t.searchPlaceholder;
}

// ===================== FEEDBACK HANDLING =====================
const feedbackForm = document.getElementById("feedbackForm");
const feedbackList = document.getElementById("feedbackList");

window.addEventListener("DOMContentLoaded", () => {
  // Feedbacks
  const saved = JSON.parse(localStorage.getItem("feedbacks")) || [];
  saved.forEach(fb => renderFeedback(fb.name, fb.msg));

  // Theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    document.getElementById("darkModeToggle").textContent = "☀️ Light Mode";
  }

  // Theme color
  const savedColor = localStorage.getItem("themeColor");
  if (savedColor) {
    document.documentElement.style.setProperty("--primary-color", savedColor);
    document.getElementById("themePicker").value = savedColor;
  }

  // Language
  const savedLang = localStorage.getItem("language") || "en";
  langPicker.value = savedLang;
  applyLanguage(savedLang);
  renderStates(savedLang);
});

feedbackForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const msg = document.getElementById("message").value.trim();
  if (!name || !msg) return;

  renderFeedback(name, msg);
  const saved = JSON.parse(localStorage.getItem("feedbacks")) || [];
  saved.push({ name, msg });
  localStorage.setItem("feedbacks", JSON.stringify(saved));

  feedbackForm.reset();
});

function renderFeedback(name, msg) {
  const feedbackItem = document.createElement("div");
  feedbackItem.className = "feedback-item";
  feedbackItem.innerHTML = `<strong>${name}:</strong><br>${msg}`;
  feedbackList.appendChild(feedbackItem);
}

// ===================== CHATBOT FRONTEND LOGIC =====================
let chatHistory = [];

async function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  appendMessage("user", text);
  input.value = "";

  const thinkingEl = appendMessage("bot", "Thinking...");

  try {
    const res = await fetch("https://kernoti-backend.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, history: chatHistory })
    });

    if (!res.ok) throw new Error("Network error");

    const data = await res.json();
    const reply = data.reply || "Sorry, I couldn’t respond.";
    thinkingEl.textContent = reply;

    speak(reply);

    chatHistory.push({ role: "user", content: text });
    chatHistory.push({ role: "assistant", content: reply });
    if (chatHistory.length > 14) chatHistory = chatHistory.slice(-14);
  } catch (err) {
    thinkingEl.textContent = "Error connecting to AI.";
    console.error(err);
  }
}

function appendMessage(sender, text) {
  const msgBox = document.createElement("div");
  msgBox.className = `message ${sender}`;
  msgBox.textContent = text;
  const messagesEl = document.getElementById("chat-messages");
  messagesEl.appendChild(msgBox);
  msgBox.scrollIntoView({ behavior: "smooth", block: "end" });
  return msgBox;
}

document.addEventListener("keydown", (e) => {
  const input = document.getElementById("userInput");
  if (document.activeElement === input && e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

// ===================== CHATBOT TOGGLE =====================
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const chatToggle = document.getElementById("chat-toggle");
let minimized = false;

chatToggle.addEventListener("click", () => {
  minimized = !minimized;
  chatMessages.style.display = minimized ? "none" : "block";
  chatInput.style.display = minimized ? "none" : "flex";
  chatToggle.textContent = minimized ? "⬆" : "_";
});

// ===================== DARK MODE TOGGLE =====================
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    darkModeToggle.textContent = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    darkModeToggle.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
});

// ===================== THEME PICKER =====================
const themePicker = document.getElementById("themePicker");
themePicker.addEventListener("change", () => {
  const color = themePicker.value;
  document.documentElement.style.setProperty("--primary-color", color);
  localStorage.setItem("themeColor", color);
});

// ===================== VOICE INPUT & TTS =====================
const voiceBtn = document.getElementById("voiceBtn");
let recognition;

if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  voiceBtn.addEventListener("click", () => {
    recognition.start();
    voiceBtn.textContent = "🎙️...";
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById("userInput").value = transcript;
    voiceBtn.textContent = "🎤";
  };

  recognition.onerror = () => {
    voiceBtn.textContent = "🎤";
  };
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
}
