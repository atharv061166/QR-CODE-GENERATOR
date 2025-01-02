document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-btn');
    const clearButton = document.getElementById('clear-btn');
    const qrCodeContainer = document.getElementById('qrcode');
    const contentInput = document.getElementById('content');
    const textButton = document.getElementById('text-btn');
    const urlButton = document.getElementById('url-btn');
    const emailButton = document.getElementById('email-btn');
    const phoneButton = document.getElementById('phone-btn');
    const imageButton = document.getElementById('image-btn');

    let selectedType = ''; // Track the selected content type

    // Enable input field when a button is clicked
    function enableInput(type, placeholder) {
        contentInput.placeholder = placeholder;
        contentInput.disabled = false;
        selectedType = type;
    }

    // Content type selection
    textButton.addEventListener('click', () => enableInput('text', 'Enter your text here...'));
    urlButton.addEventListener('click', () => enableInput('url', 'Enter website URL...'));
    emailButton.addEventListener('click', () => enableInput('email', 'Enter email address...'));
    phoneButton.addEventListener('click', () => enableInput('phone', 'Enter phone number...'));
    imageButton.addEventListener('click', () => enableInput('image', 'Enter image URL...'));

    // Validate email format
    function isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    // Validate phone number format (simplified)
    function isValidPhoneNumber(phone) {
        const phonePattern = /^[0-9]{10}$/; // Example for a 10-digit phone number
        return phonePattern.test(phone);
    }

    // Validate URL format
    function isValidURL(url) {
        const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
        return urlPattern.test(url);
    }

    // Generate QR Code
    generateButton.addEventListener('click', () => {
        const content = contentInput.value.trim();

        // Clear previous QR code if any
        qrCodeContainer.innerHTML = '';

        if (!content) {
            alert('Please enter some content to generate a QR code.');
            return;
        }

        // Validate content based on selected type
        if (selectedType === 'email' && !isValidEmail(content)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (selectedType === 'phone' && !isValidPhoneNumber(content)) {
            alert('Please enter a valid phone number (10 digits).');
            return;
        }

        if (selectedType === 'url' && !isValidURL(content)) {
            alert('Please enter a valid website URL.');
            return;
        }

        // Generate QR code based on selected type
        new QRCode(qrCodeContainer, {
            text: content,
            width: 256,
            height: 256,
        });

        // Add smooth fade-in effect for QR code
        qrCodeContainer.style.opacity = 0;
        setTimeout(() => {
            qrCodeContainer.style.opacity = 1;
        }, 100);
    });

    // Clear input and QR Code
    clearButton.addEventListener('click', () => {
        contentInput.value = '';
        qrCodeContainer.innerHTML = '';
        contentInput.disabled = true;
    });
});
