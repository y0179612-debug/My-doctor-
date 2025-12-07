const doctors = [
  { name: "Dr. Rahul Sharma", city: "Delhi", specialty: "Cardiologist" },
  { name: "Dr. Neha Singh", city: "Lucknow", specialty: "Dentist" },
  { name: "Dr. Aman Verma", city: "Kanpur", specialty: "Orthopedic" },
  { name: "Dr. Pooja Yadav", city: "Varanasi", specialty: "Gynecologist" },
  { name: "Dr. Suresh Kumar", city: "Patna", specialty: "Neurologist" }
];

const doctorList = document.getElementById("doctorList");

function showDoctors(list) {
  doctorList.innerHTML = "";
  list.forEach(doc => {
    const div = document.createElement("div");
    div.className = "doctor-card";
    div.innerHTML = `
      <h3>${doc.name}</h3>
      <p>${doc.specialty}</p>
      <p>${doc.city}</p>
      <button>Book Now</button>
    `;
    doctorList.appendChild(div);
  });
}

showDoctors(doctors);

function searchDoctor() {
  const value = document.getElementById("searchBox").value.toLowerCase();
  const filtered = doctors.filter(doc =>
    doc.name.toLowerCase().includes(value) ||
    doc.city.toLowerCase().includes(value) ||
    doc.specialty.toLowerCase().includes(value)
  );
  showDoctors(filtered);
}
