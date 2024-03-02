function openDemoForm(course) {
  // Set the selected course in the form
  document.getElementById('course').value = course;

  // Show the form container
  document.getElementById('demoForm').style.display = 'block';
  document.getElementById("overlay").style.display = "block";
}

let formClose = document.getElementById('formClose');
formClose.addEventListener("click", ()=>{
  document.getElementById('demoForm').style.display = 'none';
  document.getElementById("overlay").style.display = "none";
})

const scriptURL = 'https://script.google.com/macros/s/AKfycbyh4_S2xCjTPKKDUqk2SbbAA4om5e_AS8Lzb46e4QR4P3qnBjkhvjKSRR_R8stkAJAI/exec';

const form = document.forms['contact-form'];
const phoneInput = document.getElementById('phoneInput');
const emailInput = document.getElementById('emailInput');
const contactError = document.getElementById('contactError');
const mailError = document.getElementById('mailError');

const loadingSpinner = document.getElementById('loadingSpinner');

form.addEventListener('submit', e => {
  e.preventDefault()

  if (!isValidPhone(phoneInput.value)) {
    contactError.style.display = 'block';
    return;
  } else {
    contactError.style.display = 'none';
  }

  if (!isValidEmail(emailInput.value)) {
    mailError.style.display = 'block';
    return;
  } else {
    mailError.style.display = 'none';
  }


  // Show loading spinner during form submission
  document.getElementById('demoForm').style.display = "none";
  loadingSpinner.style.display = 'block';

  

  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => {
    loadingSpinner.style.display = 'none';
    alert("Your form is submitted successfuly")
  })
  .then(() => { window.location.reload(); })
  .catch(error => {
    loadingSpinner.style.display = 'none';
    console.error('Error!', error.message)
  })
})


function isValidPhone(phone) {
  // Basic 10-digit phone number validation
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
}

function isValidEmail(email) {
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}