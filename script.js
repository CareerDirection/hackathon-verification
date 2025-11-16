// Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjgRuyO6S--alDv0f_2qG6Ev9jur2eieo",
  authDomain: "hackathon-verification.firebaseapp.com",
  databaseURL: "https://hackathon-verification-default-rtdb.firebaseio.com",
  projectId: "hackathon-verification",
  storageBucket: "hackathon-verification.firebasestorage.app",
  messagingSenderId: "823847050976",
  appId: "1:823847050976:web:05ac6045f345f5ab057a85"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Verification Function
function verify() {
  const certID = document.getElementById("certID").value.trim();
  const resultDiv = document.getElementById("result");

  if (!certID) {
    resultDiv.innerHTML = "<p>Please enter a Certificate ID.</p>";
    return;
  }

  db.ref("certificates/" + certID).once("value", (snapshot) => {
    if (snapshot.exists()) {
      const cert = snapshot.val();

      resultDiv.innerHTML = `
        <p><strong>Name:</strong> ${cert.name}</p>
        <p><strong>Certificate ID:</strong> ${cert.id}</p>
        <p><strong>Hackathon:</strong> ${cert.hackathon}</p>
        <p><strong>Achievement Level:</strong> ${cert.achievement_level}</p>
        <p><strong>Location:</strong> ${cert.location}</p>
        <p><strong>Issuer:</strong> ${cert.issuer}</p>
        <p><strong>Status:</strong> ${cert.status}</p>
      `;
    } else {
      resultDiv.innerHTML = "<p style='color:red;'>Certificate not found or invalid.</p>";
    }
  });
}
