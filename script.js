const SUPABASE_URL = 'https://rmnbacowyniqtmvamfpk.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtbmJhY293eW5pcXRtdmFtZnBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3OTk1NzIsImV4cCI6MjA4MDM3NTU3Mn0.En9izJDaofMMR1Hf00ODuHWArcDh3k5DT5gHc1QdoJY';
const LEADS_TABLE_NAME = 'leads';
const PRODUCTS_TABLE_NAME = 'products';
const REST_ENDPOINT_PRODUCTS = `${SUPABASE_URL}/rest/v1/${PRODUCTS_TABLE_NAME}`;
const REST_ENDPOINT_LEADS = `${SUPABASE_URL}/rest/v1/${LEADS_TABLE_NAME}`;

async function getProducts() {
    
    const container = document.getElementById('products-list');
    
    try {
        console.log("Attempting to fetch product catalog from Supabase...");
        
        const headers = {
            'apikey': ANON_KEY,
            'Authorization': `Bearer ${ANON_KEY}`
        };

        const response = await fetch(REST_ENDPOINT_PRODUCTS, { headers });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`ERROR: Failed to fetch products (Status: ${response.status}). Details:`, errorText);
            
            container.innerHTML = '<p style="color: red;">Error: Failed to load catalog data. Check console (F12) for details.</p>';
            return;
        }

        const products = await response.json();
        console.log("Successfully retrieved products:", products);

        if (products.length === 0) {
            container.innerHTML = '<p>No products or categories found in the archive.</p>';
            return;
        }

        // Render the Product List
        products.forEach(product => {
            const card = document.createElement('article');
            card.className = 'card product-card';
            
            card.innerHTML = `
                <div class="product-image-container">
                    <img 
                        src="${product.image_url}" 
                        alt="${product.name}" 
                        onerror="this.onerror=null; this.src='https://placehold.co/200x150/555/white?text=Image+Missing'"
                    />
                </div>
                <h3>${product.name}</h3>
                <p class="product-price">$${(product.price || 0).toFixed(2)}</p>
                <p class="product-description">${product.description}</p>
                <a href="#" class="cta-button">Read More</a>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("CRITICAL NETWORK ERROR: Could not complete fetch operation.", error);
        container.innerHTML = '<p style="color: red;">Network Connection Error. Please check your internet connection.</p>';
    }
}



// --------------------------------------------------------
// --- CONTACT FORM LOGIC (POST Lead Creation) ---
// --------------------------------------------------------
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
        submissionTime: new Date().toISOString() // timestamp
    };

        const requestUrl = `${SUPABASE_URL}/rest/v1/${LEADS_TABLE_NAME}`;

 const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': ANON_KEY,
            'Authorization': `Bearer ${ANON_KEY}`,
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

window.onload = getProducts;