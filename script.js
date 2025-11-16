<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Hackathon Certificate Verification</title>

  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      margin: 40px;
    }
    input {
      padding: 10px;
      width: 260px;
      margin-right: 10px;
    }
    button {
      padding: 10px 20px;
      cursor: pointer;
    }
    #result {
      margin-top: 25px;
      font-size: 18px;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
      text-align: left;
    }
    p {
      margin: 6px 0;
    }
    .valid {
      color: green;
      font-weight: bold;
    }
    .invalid {
      color: red;
      font-weight: bold;
    }
  </style>
</head>

<body>

  <!-- Logo -->
  <div style="text-align:center; margin-bottom:20px;">
    <img src="logo.png" width="250" height="100" alt="Career Direction Logo">
  </div>

  <h1>Hackathon Certificate Verification</h1>
  <p>Enter your Certificate ID below.</p>

  <input type="text" id="certID" placeholder="Enter Certificate ID" />
  <button onclick="verify()">Verify</button>

  <div id="result"></div>

  <script>
    // 🔒 Your secure backend API (Cloudflare Worker)
    const WORKER_URL = "https://hackathon-verification.cd-careerdirection.workers.dev";

    async function verify() {
      const certID = document.getElementById('certID').value.trim();
      const resultDiv = document.getElementById('result');

      if (certID === "") {
        resultDiv.innerHTML = "<p class='invalid'>Please enter a Certificate ID.</p>";
        return;
      }

      resultDiv.innerHTML = "<em>Checking…</em>";

      try {
        const response = await fetch(`${WORKER_URL}/?id=${encodeURIComponent(certID)}`);
        const certData = await response.json();

        if (certData && certData.id) {
          resultDiv.innerHTML = `
            <p class="valid">✔ Certificate Verified</p>
            <p><strong>Name:</strong> ${certData.name}</p>
            <p><strong>Certificate ID:</strong> ${certData.id}</p>
            <p><strong>Hackathon:</strong> ${certData.hackathon}</p>
            <p><strong>Achievement:</strong> ${certData.achievement_level}</p>
            <p><strong>Location:</strong> ${certData.location}</p>
            <p><strong>Issuer:</strong> ${certData.issuer}</p>
            <p><strong>Status:</strong> ${certData.status}</p>
            <hr>
            <p style="font-size:20px; font-weight:bold; color:#444; text-align:center; margin-top:10px;">
              😊 All the Best for your Future!
            </p>
          `;
        } else {
          resultDiv.innerHTML = "<p class='invalid'>❌ Certificate not found or invalid.</p>";
        }

      } catch (error) {
        resultDiv.innerHTML = "<p class='invalid'>Error connecting to secure server.</p>";
      }
    }

    // Auto-fill if `?id=` is in the URL
    const preID = new URLSearchParams(window.location.search).get("id");
    if (preID) {
      document.getElementById("certID").value = preID;
      verify();
    }
  </script>

</body>
</html>
