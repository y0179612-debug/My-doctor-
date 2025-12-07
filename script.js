// Dummy doctors data with images
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
  }
];

const doctorList = document.getElementById("doctorList");

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

    const bookBtn = card.querySelector(".book-btn");
    bookBtn.addEventListener("click", () => {
      alert(`Demo booking created for ${doc.name}. (Frontend only)`);
    });

    doctorList.appendChild(card);
  });
}

renderDoctors(doctors);

// Search function (called from HTML button)
function searchDoctor() {
  const value = document.getElementById("searchBox").value.toLowerCase();

  const filtered = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(value) ||
    doc.city.toLowerCase().includes(value) ||
    doc.specialty.toLowerCase().includes(value) ||
    doc.hospital.toLowerCase().includes(value)
  );

  renderDoctors(filtered);
}

// Login button actions
const loginBtnTop = document.getElementById("loginBtn");
const bottomBar = document.getElementById("bottomLoginBar");
const bottomBtn = bottomBar.querySelector(".bottom-login-btn");

function showLoginAlert() {
  alert("Login / Sign Up feature will be added later. This is a UI demo for now.");
}

if (loginBtnTop) loginBtnTop.addEventListener("click", showLoginAlert);
if (bottomBtn) bottomBtn.addEventListener("click", showLoginAlert);
