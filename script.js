// Get references to DOM elements
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.nav-links');

// Function to set the active navigation link based on current section
function setActiveLink() {
    let currentSectionId = 'home'; // Default to home

    // Iterate over each section to check if it's in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop - header.offsetHeight; // Adjust for sticky header
        const sectionHeight = section.clientHeight;

        // Check if the current scroll position is within the section
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSectionId = section.id;
        }
    });

    // Remove 'active' class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Add 'active' class to the link corresponding to the current section
    const activeLink = document.querySelector(`.nav-links a[href="#${currentSectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// --- Smooth Scrolling for Navigation Links ---
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor link behavior

        // Close mobile menu if open
        if (mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            menuToggle.classList.remove('active');
        }

        const targetId = this.getAttribute('href').substring(1); // Get target section ID
        const targetSection = document.getElementById(targetId); // Get the target section element
        const headerOffset = document.querySelector('header').offsetHeight; // Get header height for offset

        // Scroll to the target section with an offset for the sticky header
        window.scrollTo({
            top: targetSection.offsetTop - headerOffset,
            behavior: 'smooth' // Smooth scroll effect
        });

        // Update active link immediately on click
        navLinks.forEach(item => item.classList.remove('active'));
        this.classList.add('active');
    });
});

// --- Intersection Observer for Scroll Animations ---
// This makes sections fade in as they come into view.
const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the section is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // If the section is intersecting the viewport, add 'visible' class
            entry.target.classList.add('visible');
            // Stop observing once it's visible (optional, prevents re-triggering)
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe each section
sections.forEach(section => {
    observer.observe(section);
});

// --- Mobile Navigation Toggle ---
menuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');   // Toggle active class on nav links
    menuToggle.classList.toggle('active'); // Toggle active class on menu icon (for animation)
});

// Update active link on scroll
const header = document.querySelector('header');
window.addEventListener('scroll', setActiveLink);
// Set active link on page load
window.addEventListener('load', setActiveLink);
// Handle form submission (optional: prevent default and show message)
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission
    alert('Thank you for your message! I will get back to you soon.'); // Simple alert
    this.reset(); // Clear the form
});