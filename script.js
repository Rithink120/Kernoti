// ===================== STATE LIST & LINKS =====================
const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const commonLinks = {
  "Government Services": [
    { name: "India Portal", url: "https://www.india.gov.in" },
    { name: "MyGov", url: "https://www.mygov.in" }
  ],
  "Aadhaar": [
    { name: "UIDAI Website", url: "https://uidai.gov.in" }
  ],
  "PAN Card": [
    { name: "Apply for PAN", url: "https://www.incometax.gov.in/iec/foportal" }
  ],
  "Exams": [
    { name: "UPSC", url: "https://upsc.gov.in" },
    { name: "SSC", url: "https://ssc.nic.in" }
  ],
  "Scholarships": [
    { name: "National Scholarship Portal", url: "https://scholarships.gov.in" },
    { name: "AICTE Schemes", url: "https://aicte-india.org/schemes" }
  ],
  "School & College Updates": [
    { name: "CBSE", url: "https://cbse.gov.in" }
  ],
  "Notifications": [
    { name: "Employment News", url: "https://employmentnews.gov.in" }
  ]
};

const keralaLinks = {
  "Kerala PSC": [
    { name: "Kerala PSC Official", url: "https://www.keralapsc.gov.in" }
  ],
  "KTU (APJ Abdul Kalam Technological University)": [
    { name: "KTU Portal", url: "https://ktu.edu.in" }
  ],
  "UPSC": [
    { name: "UPSC Official", url: "https://upsc.gov.in" }
  ],
  "SSC": [
    { name: "SSC Portal", url: "https://ssc.nic.in" }
  ],
  "Job Portals": [
    { name: "NCS Portal", url: "https://www.ncs.gov.in" }
  ],
  "News & Awareness": [
    { name: "PIB Kerala", url: "https://pib.gov.in/indexd.aspx?relid=15" },
    { name: "Doordarshan News", url: "https://ddnews.gov.in" }
  ],
  "Police & Safety": [
    { name: "Kerala Police", url: "https://keralapolice.gov.in" }
  ],
  "Higher Secondary Education": [
    { name: "DHSE Kerala", url: "https://www.dhsekerala.gov.in" }
  ],
  "High School Education": [
    { name: "General Education Dept", url: "https://education.kerala.gov.in" }
  ],
  "Minister's Related": [
    { name: "Office of the Chief Minister", url: "https://www.cm.kerala.gov.in" }
  ],
  "Local Self-Government (Panchayats, Municipalities)": [
    { name: "LSG Websites & E-Services", url: "https://lsgkerala.gov.in/en" }
  ],
  "Boards & Development Authorities": [
    { name: "Kerala State Pollution Control Board", url: "https://kspcb.kerala.gov.in/" },
    { name: "Vigilance & Anti-Corruption Bureau", url: "https://vigilance.kerala.gov.in/" },
    { name: "Kerala State Housing Board", url: "http://www.kshb.kerala.gov.in" }
  ],
  "Tourism & Culture": [
    { name: "Kerala Tourism - Official Site", url: "https://www.keralatourism.org" }
  ],
  "e-Governance & Core Portals": [
    { name: "RTI Portal (Kerala)", url: "https://rtiportal.kerala.gov.in" },
    { name: "Kerala Civil Supplies e-Citizen Portal", url: "https://ecitizen.civilsupplieskerala.gov.in" },
    { name: "LMOMS - Legal Metrology Licensing System", url: "https://lmoms.kerala.gov.in" },
    { name: "Directorate of Prosecution Kerala", url: "https://prosecution.kerala.gov.in" }
  ],
  "Public Utilities & Facilities": [
    { name: "Kerala Water Authority", url: "http://www.kwa.kerala.gov.in" },
    { name: "Kerala State Lotteries", url: "http://statelottery.kerala.gov.in" }
  ],
  "Infrastructure & Social Welfare": [
    { name: "Kerala State Housing Board", url: "http://www.kshb.kerala.gov.in" },
    { name: "Kerala Prisons & Correctional Services", url: "https://keralaprisons.gov.in" }
  ],
  "e-Services Dashboard / LSG Department": [
    { name: "e-Application Portals Dashboard (IKM)", url: "https://dashboard.kerala.gov.in/e-services/websites.php" },
    { name: "LSGD e-Governance Portal", url: "https://lsgkerala.gov.in/en/e-governance" }
  ]
};

const stateList = document.getElementById("stateList");
const stateDetails = document.getElementById("stateDetails");
const linksContainer = document.getElementById("linksContainer");
const stateName = document.getElementById("stateName");

// Populate state buttons
states.forEach(state => {
  const btn = document.createElement("button");
  btn.textContent = state;
  btn.onclick = () => showLinks(state);
  stateList.appendChild(btn);
});

function showLinks(state) {
  stateList.classList.add("hidden");
  stateDetails.classList.remove("hidden");
  stateName.textContent = state;
  linksContainer.innerHTML = "";

  const allLinks = { ...commonLinks };
  if (state === "Kerala") {
    Object.assign(allLinks, keralaLinks);
  }

  for (const category in allLinks) {
    const box = document.createElement("div");
    box.className = "category-box";

    const title = document.createElement("h3");
    title.textContent = category;
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

// ===================== FEEDBACK HANDLING =====================
const feedbackForm = document.getElementById("feedbackForm");
const feedbackList = document.getElementById("feedbackList");

feedbackForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const msg = document.getElementById("message").value;

  const feedbackItem = document.createElement("div");
  feedbackItem.className = "feedback-item";
  feedbackItem.innerHTML = `<strong>${name}:</strong><br>${msg}`;
  feedbackList.appendChild(feedbackItem);

  feedbackForm.reset();
});

// ===================== CHATBOT FRONTEND LOGIC =====================
let chatHistory = []; // store minimal history on client to keep context

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


    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    const reply = data.reply || "Sorry, I couldn’t respond.";
    thinkingEl.textContent = reply;

    // Update client-side chat history (trim to keep it light)
    chatHistory.push({ role: "user", content: text });
    chatHistory.push({ role: "assistant", content: reply });
    if (chatHistory.length > 14) {
      chatHistory = chatHistory.slice(-14);
    }
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

// Optional: send on Enter
document.addEventListener("keydown", (e) => {
  const input = document.getElementById("userInput");
  if (document.activeElement === input && e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

