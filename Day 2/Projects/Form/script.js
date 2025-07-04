document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Clear all errors first
    document.querySelectorAll('.error').forEach(el => el.innerText = '');
    document.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));

    let isValid = true;

    const fullName = document.getElementById('fullName');
    if (fullName.value.trim().length < 3) {
        showError(fullName, 'nameError', 'Full name must be at least 3 characters');
        isValid = false;
    }

    const email = document.getElementById('email');
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.value)) {
        showError(email, 'emailError', 'Invalid email format');
        isValid = false;
    }

    const password = document.getElementById('password');
    if (!/^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$/.test(password.value)) {
        showError(password, 'passwordError', 'Password must be at least 8 characters with letters and numbers');
        isValid = false;
    }

    const confirmPassword = document.getElementById('confirmPassword');
    if (confirmPassword.value !== password.value) {
        showError(confirmPassword, 'confirmPasswordError', 'Passwords do not match');
        isValid = false;
    }

    const phone = document.getElementById('phone');
    if (!/^\\d{10,}$/.test(phone.value)) {
        showError(phone, 'phoneError', 'Phone must be at least 10 digits and digits only');
        isValid = false;
    }

    const gender = document.querySelector('input[name=\"gender\"]:checked');
    if (!gender) {
        document.getElementById('genderError').innerText = 'Gender is required';
        isValid = false;
    }

    const dob = document.getElementById('dob');
    if (!dob.value || !isOver18(new Date(dob.value))) {
        showError(dob, 'dobError', 'You must be over 18 years old');
        isValid = false;
    }

    const country = document.getElementById('country');
    if (country.value === '') {
        showError(country, 'countryError', 'Country is required');
        isValid = false;
    }

    const hobbies = document.querySelectorAll('input[name=\"hobbies\"]:checked');
    if (hobbies.length === 0) {
        document.getElementById('hobbiesError').innerText = 'Please select at least one hobby';
        isValid = false;
    }

    if (isValid) {
        alert('Registration successful!');
        // this.submit(); // Uncomment if you're posting to a server
    }
});

function showError(input, errorId, message) {
    input.classList.add('invalid');
    document.getElementById(errorId).innerText = message;
}

function isOver18(date) {
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();
    return age > 18 || (age === 18 && m >= 0 && today.getDate() >= date.getDate());
}
