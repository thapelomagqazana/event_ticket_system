document.addEventListener('DOMContentLoaded', function () {
  // Function to handle login form submission
  document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    handleLoginFormSubmit();
  });

  // Function to handle registration form submission
  document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();
    handleRegistrationFormSubmit();
  });

  // Function to handle login form submission
  function handleLoginFormSubmit() {
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;

    // Validate and send data to the backend
    sendFormData('/auth/login', { username: loginUsername, password: loginPassword });
  }

  // Function to handle registration form submission
  function handleRegistrationFormSubmit() {
    const registrationUsername = document.getElementById('registrationUsername').value;
    const registrationPassword = document.getElementById('registrationPassword').value;

    // Validate and send data to the backend
    sendFormData('/auth/register', { username: registrationUsername, password: registrationPassword });
  }

  // Function to send form data to the backend
  function sendFormData(endpoint, formData) {
    fetch(`http://localhost:3000${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the backend
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
});