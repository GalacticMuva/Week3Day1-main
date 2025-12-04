function captureFormData() {
    
    
    const userName = document.getElementById('name').value.trim();
    const userEmail = document.getElementById('email').value.trim();
    const userMessage = document.getElementById('message').value.trim();
    
// Status Feedback
    const statusMessage = document.getElementById('submissionStatus');

// No empty fieldds allowed
    if (userEmail === '' || userMessage === '') {
        statusMessage.textContent = 'Error: Email and Message fields are required.';
        statusMessage.style.color = 'red';
        return; 
    }

    const contactData = {
        submitterName: userName,
        submitterEmail: userEmail,
        submissionTime: new Date().toLocaleString(), // timestamp
        messageContent: userMessage
    };

// Log the data to the console
    console.log("Contact Form Data Captured ");
    console.log(contactData); 

//Visual feedback to user
    statusMessage.textContent = 'Data saved to console! (Check F12)';
    statusMessage.style.color = 'green';

    document.getElementById('contactForm').reset();
}