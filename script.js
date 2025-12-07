const doctors = [
  {
    name: "Dr. Vinita Das",
    specialty: "Gynecology",
    years: "45+ Years",
    hospital: "Apollo Hospitals",
    city: "Delhi",
    fee: "500",
    ratingTag: "TOP RATED",
    slot: "11:00 AM - 03:00 PM",
    image: "https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg",
    whatsapp: "919999999999"
  },
  {
    name: "Dr. Rahul Sharma",
    specialty: "Cardiology",
    years: "20+ Years",
    hospital: "Max Hospital",
    city: "Lucknow",
    fee: "700",
    ratingTag: "MOST BOOKED",
    slot: "05:00 PM - 08:00 PM",
    image: "https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg",
    whatsapp: "919888888888"
  }
];

const doctorList = document.getElementById("doctorList");

function renderDoctors(list) {
  doctorList.innerHTML = "";

  if (list.length === 0) {
    doctorList.innerHTML = `<p style="padding:20px">No doctors found. Try another name, specialty or city.</p>`;
    return;
  }

  list.forEach((doc) => {
    const card = document.createElement("div");
    card.className = "doctor-card";

    card.innerHTML = `
      <img src="${doc.image}" class="doctor-img"/>
      <h2>${doc.name}</h2>
      <p>${doc.specialty}</p>
      <p>${doc.years}</p>
      <p>${doc.hospital}</p>
      <p>₹${doc.fee} Consultation Fee</p>
      <p>${doc.slot}</p>
      <button onclick="bookNow('${doc.whatsapp}')">Book Visit</button>
    `;

    doctorList.appendChild(card);
  });
}

function searchDoctor() {
  const val = document.getElementById("searchBox").value.toLowerCase();

  const filtered = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(val) ||
    doc.specialty.toLowerCase().includes(val) ||
    doc.city.toLowerCase().includes(val)
  );

  renderDoctors(filtered);
}

function bookNow(number) {
  const url = `https://wa.me/${number}`;
  window.open(url, "_blank");
}

renderDoctors(doctors);
