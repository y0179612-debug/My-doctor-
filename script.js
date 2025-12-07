// ---- Firebase imports (CDN se) ----
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// ---- Tumhara Firebase config (jo console se mila tha) ----
const firebaseConfig = {
  apiKey: "AIzaSyCoNU8xQ2_kReXMpmTrsrYGiGsg10xEe",
  authDomain: "book-my-doctor-1342f.firebaseapp.com",
  projectId: "book-my-doctor-1342f",
  storageBucket: "book-my-doctor-1342f.appspot.com",
  messagingSenderId: "806110129864",
  appId: "1:806110129864:web:915b91c9e007e33cb7ffd"
};

// Firebase start
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ←←← yaha apna WhatsApp number daalo, 91 ke sath
const WHATSAPP_NUMBER = "91xxxxxxxxxx"; // example: 917309802544

// DOM elements
const doctorList = document.getElementById("doctorList");
const loginBtnTop = document.getElementById("loginBtn");
const bottomBar = document.getElementById("bottomLoginBar");
const bottomBtn = bottomBar ? bottomBar.querySelector(".bottom-login-btn") : null;

// Sab doctors isme store honge (Firebase se)
let allDoctors = [];

// --------------------------------------
// WhatsApp booking link
// --------------------------------------
function getWhatsAppLink(doc) {
  const msg = `Hello, I want to book an appointment with ${doc.name} (${doc.specialty}) at ${doc.hospital}, ${doc.city}. Fee: ${doc.fee}. Time slot: ${doc.slot}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// --------------------------------------
// Text normalize (search ke liye)
// --------------------------------------
function normalizeText(text) {
  if (!text) return "";
  return text.toLowerCase().replace(/\./g, "").replace(/\s+/g, "");
}

// --------------------------------------
// Doctors cards render karna
// --------------------------------------
function renderDoctors(list) {
  doctorList.innerHTML = "";

  if (!list.length) {
    doctorList.innerHTML =
      "<p>No doctors found. Try another name, specialty or city.</p>";
    return;
  }

  list.forEach((doc) => {
    const card = document.createElement("article");
    card.className = "doctor-card";
    card.innerHTML = `
      <div class="card-image-wrapper">
        <img src="${doc.image}" alt="${doc.name}">
      </div>
      <div class="card-body">
        <h2 class="doc-name">${doc.name}</h2>
        <p class="doc-specialty">${doc.specialty}</p>
        <p class="doc-experience">${doc.years}</p>

        <div class="row-between">
          <span class="hospital">🏥 ${doc.hospital}</span>
          <span class="fee">${doc.fee}</span>
        </div>

        <div class="tags-row">
          <span class="tag-pill success">✔ ${doc.ratingTag}</span>
          <span class="tag-pill">${doc.city}</span>
        </div>

        <div class="time-slot">⏰ ${doc.slot}</div>

        <button class="book-btn">Book Visit</button>
      </div>
    `;

    const bookBtn = card.querySelector(".book-btn");
    bookBtn.addEventListener("click", () => {
      const url = getWhatsAppLink(doc);
      window.location.href = url; // WhatsApp open
    });

    doctorList.appendChild(card);
  });
}

// --------------------------------------
// Firebase se doctors load karna
// --------------------------------------
async function loadDoctors() {
  try {
    const snap = await getDocs(collection(db, "doctors"));
    allDoctors = [];
    snap.forEach((d) => {
      allDoctors.push(d.data());
    });

    renderDoctors(allDoctors);
  } catch (err) {
    console.error(err);
    doctorList.innerHTML =
      "<p>Failed to load doctors from server. Please try again later.</p>";
  }
}

// Page load hote hi doctors lao
loadDoctors();

// --------------------------------------
// Search function (button se call hota hai)
// --------------------------------------
window.searchDoctor = function () {
  const raw = document.getElementById("searchBox").value || "";
  const value = normalizeText(raw);

  if (!value) {
    renderDoctors(allDoctors);
    return;
  }

  const filtered = allDoctors.filter((doc) => {
    const name = normalizeText(doc.name);
    const city = normalizeText(doc.city);
    const spec = normalizeText(doc.specialty);
    const hosp = normalizeText(doc.hospital);

    return (
      name.includes(value) ||
      city.includes(value) ||
      spec.includes(value) ||
      hosp.includes(value)
    );
  });

  renderDoctors(filtered);
};

// --------------------------------------
// Login buttons (abhi dummy)
// --------------------------------------
function showLoginAlert() {
  alert("Login / Sign Up baad me add hoga. Abhi ye UI demo hai 🙂");
}

if (loginBtnTop) loginBtnTop.addEventListener("click", showLoginAlert);
if (bottomBtn) bottomBtn.addEventListener("click", showLoginAlert);
