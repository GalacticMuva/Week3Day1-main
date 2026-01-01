📜 The Creative Archive (A reimagining of a popular #Fanfic novel platform)

A sophisticated, creator-focused digital repository for archiving stories, fanfiction, and art. This project mimics the professional feel of platforms like Archive of Our Own (AO3), prioritizing clean typography and a seamless reading experience.

1. Project Overview ---
     Purpose: To provide a permanent, distraction-free home for digital collections;
     Target Audience: Writers, fanfiction creators, and digital archivists;
     Current State: Multi-page site with a dynamic "Collections" gallery and a specialized "Reader Mode";
   
2. Core Features ---
     Dynamic Gallery: Uses the Supabase Post REST API to fetch and render story metadata automatically;
     Reader Engine: Uses URL parameters (?id=) to pull specific content from the database and inject it into a readability-optimized container;
     Custom CSS Variables: High-contrast, accessibility-focused color palette using CSS :root variables;
     Live Archiving: A functional submission form that stores user feedback and metadata in real-time;

3. Technical Architecture
     Frontend: Built with HTML5, CSS3, and Vanilla JavaScript;
     Backend: Powered by Supabase for database hosting and API endpoints;
     Security: Implements Row Level Security (RLS) to allow public read access while protecting write operations;

4. File Structure {
     index.html --> The landing page and main collections gallery;
     reader.html --> The dedicated page for long-form reading;
     style.css --> Global styling, including the specialized #story-body rules;
     script.js --> Logic for the index page and general site interactions;
     reader.js --> Specialized logic for URL parsing and content fetching;
}

Author
Alessandra F.
