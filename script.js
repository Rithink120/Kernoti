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

// Feedback handling
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
