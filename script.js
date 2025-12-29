/* ELEMENTS */
const regForm = document.getElementById("regForm");
const amountSpan = document.getElementById("amount");
const teamSize = document.getElementById("teamSize");
const payBtn = document.getElementById("payBtn");
const qrBox = document.getElementById("qrBox");
const utrInput = document.getElementById("utr");
const registerBtn = document.getElementById("registerBtn");
const msg = document.getElementById("msg");

/* INPUT FIELDS */
const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const phoneEl = document.getElementById("phone");
const collegeEl = document.getElementById("college");
const departmentEl = document.getElementById("department");
const yearEl = document.getElementById("year");
const eventTypeEl = document.getElementById("eventType");
const eventNameEl = document.getElementById("eventName");

/* BACKEND URL */
const scriptURL = "https://script.google.com/macros/s/AKfycby1efuBlq45l91xlULZI9vBpE4qCDN2woswV8DsHX_blsJLEI3Vxmn9oqCGuJmpfud0/exec";

/* INITIAL STATE */
registerBtn.disabled = true;

/* AMOUNT CALCULATION */
teamSize.addEventListener("change", () => {
  amountSpan.innerText = teamSize.value * 150;
});

/* PAY BUTTON */
payBtn.addEventListener("click", () => {
  qrBox.style.display = "block";
  msg.innerHTML = "📱 Scan QR and complete payment";
});

/* UTR VALIDATION (10–20 digits only) */
utrInput.addEventListener("input", () => {
  const utr = utrInput.value.trim();
  const validUTR = /^[0-9]{10,20}$/;

  if (validUTR.test(utr)) {
    registerBtn.disabled = false;
    registerBtn.classList.add("active");
    msg.innerHTML = "";
  } else {
    registerBtn.disabled = true;
    registerBtn.classList.remove("active");
    msg.innerHTML = "❌ Invalid UTR ID (10–20 digits)";
  }
});

/* REGISTER SUBMIT */
regForm.addEventListener("submit", (e) => {
  e.preventDefault();

  msg.innerHTML = "⏳ Registering... please wait";

  const data = {
    name: nameEl.value,
    email: emailEl.value,
    phone: phoneEl.value,
    college: collegeEl.value,
    department: departmentEl.value,
    year: yearEl.value,
    eventType: eventTypeEl.value,
    eventName: eventNameEl.value,
    teamSize: teamSize.value,
    amountPaid: teamSize.value * 150,
    utr: utrInput.value
  };

  fetch(scriptURL, {
  method: "POST",
  body: JSON.stringify(data)
})

  .then(res => res.json())
  .then(res => {
    if (res.status === "exists") {
      msg.innerHTML = "✅ Already Registered Successfully";
    } 
    else if (res.status === "success") {
      window.location.href = "success.html";
    } 
    else {
      msg.innerHTML = "⚠️ Registration failed. Try again.";
    }
  })
  .catch(err => {
    console.error(err);
    msg.innerHTML = "❌ Server not reachable";
  });
});
