const SUPABASE_URL = 'https://rmnbacowyniqtmvamfpk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtbmJhY293eW5pcXRtdmFtZnBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3OTk1NzIsImV4cCI6MjA4MDM3NTU3Mn0.En9izJDaofMMR1Hf00ODuHWArcDh3k5DT5gHc1QdoJY';
const SUPABASE_TABLE_NAME = 'leads';


async function captureFormData() {
    
    
    const userName = document.getElementById('name').value.trim();
    const userEmail = document.getElementById('email').value.trim();
    const userMessage = document.getElementById('message').value.trim();
    
// Status Feedback
    const statusMessage = document.getElementById('submissionStatus');

// No empty fieldds allowed
    if (userEmail === '' || userMessage === '') {
        statusMessage.textContent = 'Error: Email and Message fields are required';
        statusMessage.style.color = 'red';
        return; 
    }

    const contactData = {
        submitter_name: userName,
        submitter_email: userEmail,
        message_content: userMessage,
        submission_time: new Date().toISOString() // timestamp
    };

        const requestUrl = `${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE_NAME}`;

 const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Prefer': 'return=representation'
        },
        body: JSON.stringify(contactData)
    };

    try {
        statusMessage.textContent = 'Submitting your message...';
        statusMessage.style.color = 'orange';

        const response = await fetch(requestUrl, requestOptions);

        if (response.ok) {
            console.log("Submission Successful", contactData);
            statusMessage.textContent = 'Thank you! Your message has been sent.';
            statusMessage.style.color = 'green';

                //reset form
                document.getElementById('contactForm').reset();
        } else{
            const errorData = await response.json();
            console.error('Submission Error:', errorData);
            statusMessage.textContent = `Error: Submission failed (Status ${response.status}). Please Try Again.`; 
            statusMessage.style.color = 'red';

        }

    } catch (error) {
        console.error('Network Error:', error);
        statusMessage.textContent = 'Network error occurred. Please try again later.';
        statusMessage.style.color = 'red';
    }
        

}