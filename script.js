// ←←← yaha apna WhatsApp number daalo, 91 ke sath
const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // example: 917309802544

// Doctors data (zyada doctors => lamba page)
const doctors = [
  {
    name: "Dr. Vinita Das",
    specialty: "Gynecology",
    years: "45+ Years",
    hospital: "Apollo Hospitals",
    city: "Delhi",
    fee: "₹500 Consultation Fee",
    slot: "11:00 AM – 03:00 PM",
    ratingTag: "TOP RATED",
    image: "https://images.pexels.com/photos/3714743/pexels-photo-3714743.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Dr. Rahul Sharma",
    specialty: "Cardiology",
    years: "20+ Years",
    hospital: "Max Hospital",
    city: "Lucknow",
    fee: "₹700 Consultation Fee",
    slot: "05:00 PM – 08:00 PM",
    ratingTag: "MOST BOOKED",
    image: "https://images.pexels.com/photos/6231674/pexels-photo-6231674.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Dr. Neha Singh",
    specialty: "Dermatology",
    years: "10+ Years",
    hospital: "Fortis Hospital",
    city: "Kanpur",
    fee: "₹400 Consultation Fee",
    slot: "10:00 AM – 01:00 PM",
    ratingTag: "POPULAR",
    image: "https://images.pexels.com/photos/8413295/pexels-photo-8413295.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Dr. Aman Verma",
    specialty: "Orthopedics",
    years: "12+ Years",
    hospital: "AIIMS",
    city: "Varanasi",
    fee: "₹600 Consultation Fee",
    slot: "02:00 PM – 06:00 PM",
    ratingTag: "TOP RATED",
    image: "https://images.pexels.com/photos/3825529/pexels-photo-3825529.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Dr. Pooja Yadav",
    specialty: "Pediatrics",
    years: "8+ Years",
    hospital: "City Care Hospital",
    city: "Patna",
    fee: "₹350 Consultation Fee",
    slot: "09:00 AM – 12:00 PM",
    ratingTag: "KIDS SPECIALIST",
    image: "https://images.pexels.com/photos/6129682/pexels-photo-6129682.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Dr. Sameer Khan",
    specialty: "Neurology",
    years: "18+ Years",
    hospital: "Neuro Plus",
    city: "Noida",
    fee: "₹900 Consultation Fee",
    slot: "06:00 PM – 09:00 PM",
    ratingTag: "PREMIUM",
    image: "https://images.pexels.com/photos/8460120/pexels-photo-8460120.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Dr. Rita Sharma",
    specialty: "ENT",
    years: "9+ Years",
    hospital: "Sharda Hospital",
    city: "Ghaziabad",
    fee: "₹450 Consultation Fee",
    slot: "03:00 PM – 07:00 PM",
    ratingTag: "POPULAR",
    image: "https://images.pexels.com/photos/8376234/pexels-photo-8376234.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Dr. Manish Gupta",
    specialty: "General Physician",
    years: "15+ Years",
    hospital: "Family Health Clinic",
    city: "Gurugram",
    fee: "₹300 Consultation Fee",
    slot: "08:00 AM – 11:00 AM",
    ratingTag: "FAMILY DOCTOR",
    image: "https://images.pexels.com/photos/4269366/pexels-photo-4269366.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

const doctorList = document.getElementById("doctorList");

// WhatsApp booking link
function getWhatsAppLink(doc) {
  const msg = `Hello, I want to book an appointment with ${doc.name} (${doc.specialty}) at ${doc.hospital}, ${doc.city}. Fee: ${doc.fee}. Time slot: ${doc.slot}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// Normalize text for better search
function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/\s+/g, "");
}

// Card render
function renderDoctors(list) {
  doctorList.innerHTML = "";

  if (!list.length) {
    doctorList.innerHTML = "<p>No doctors found. Try another name, specialty or city.</p>";
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

    // ✅ POORI CARD CLICK → DETAILS POPUP
    card.addEventListener("click", () => {
      alert(
        `${doc.name}\n` +
        `${doc.specialty}\n` +
        `Experience: ${doc.years}\n` +
        `${doc.hospital}, ${doc.city}\n` +
        `Fee: ${doc.fee}\n` +
        `Time: ${doc.slot}`
      );
    });

    // ✅ SIRF BOOK BUTTON → WHATSAPP
    const bookBtn = card.querySelector(".book-btn");
    bookBtn.addEventListener("click", (event) => {
      event.stopPropagation(); // alert ko roke
      const url = getWhatsAppLink(doc);
      window.location.href = url;
    });

    doctorList.appendChild(card);
  });
}
}

// initial load
renderDoctors(doctors);

// Search function
function searchDoctor() {
  const raw = document.getElementById("searchBox").value || "";
  const value = normalizeText(raw);

  if (!value) {
    renderDoctors(doctors);
    return;
  }

  const filtered = doctors.filter((doc) => {
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
}

// Login buttons (sirf alert)
const loginBtnTop = document.getElementById("loginBtn");
const bottomBar = document.getElementById("bottomLoginBar");
const bottomBtn = bottomBar ? bottomBar.querySelector(".bottom-login-btn") : null;

function showLoginAlert() {
  alert("Login / Sign Up abhi demo hai. Baad me real backend se connect karenge.");
}

if (loginBtnTop) loginBtnTop.addEventListener("click", showLoginAlert);
if (bottomBtn) bottomBtn.addEventListener("click", showLoginAlert);
