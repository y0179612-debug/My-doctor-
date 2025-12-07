// Doctors data
const doctors = [
  { name: "Dr. Rahul Sharma", city: "Delhi",   specialty: "Cardiologist" },
  { name: "Dr. Neha Singh",   city: "Lucknow", specialty: "Dentist" },
  { name: "Dr. Aman Verma",   city: "Kanpur",  specialty: "Orthopedic" },
  { name: "Dr. Pooja Yadav",  city: "Varanasi",specialty: "Gynecologist" },
  { name: "Dr. Suresh Kumar", city: "Patna",   specialty: "Neurologist" }
];

const doctorList = document.getElementById("doctorList");

// Doctors list dikhane ka function
function showDoctors(list) {
  doctorList.innerHTML = "";

  if (list.length === 0) {
    doctorList.innerHTML = "<p>No doctors found. Try another city or doctor name.</p>";
    return;
  }

  list.forEach(doc => {
    const div = document.createElement("div");
    div.className = "doctor-card";
    div.innerHTML = `
      <h3>${doc.name}</h3>
      <p>${doc.specialty}</p>
      <p>${doc.city}</p>
      <button onclick="bookDoctor('${doc.name}')">Book Now</button>
    `;
    doctorList.appendChild(div);
  });
}

// Pehle full list dikhado
showDoctors(doctors);

// Search button ka function (HTML me onclick="searchDoctor()" laga hua hai)
function searchDoctor() {
  const value = document.getElementById("searchBox").value.toLowerCase();

  const filtered = doctors.filter(doc =>
    doc.name.toLowerCase().includes(value) ||
    doc.city.toLowerCase().includes(value) ||
    doc.specialty.toLowerCase().includes(value)
  );

  showDoctors(filtered);
}

// Book Now pe kya hoga
function bookDoctor(doctorName) {
  alert("Demo booking: " + doctorName + " ke liye appointment request bhej di gayi (frontend demo).");
}

// Login button ko bhi active bana do
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    alert("Login feature coming soon (demo) – abhi sirf frontend hai.");
  });
}
