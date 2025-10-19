document.addEventListener("DOMContentLoaded", function () {
    // Accordion-style toggle: Only one <details> open at a time
    const allDetails = document.querySelectorAll("details");
    allDetails.forEach((detail) => {
        detail.addEventListener("toggle", function () {
            if (detail.open) {
                allDetails.forEach((otherDetail) => {
                    if (otherDetail !== detail) {
                        otherDetail.open = false;
                    }
                });
            }
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to navigation links based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id], div[id]');
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Create mailto link with form data
            const subject = `Contact from ${name} - Personal Website`;
            const mailtoLink = `mailto:DanielTHuyn@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showFormMessage('Thank you! Your email client should open with the message ready to send.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Function to show form messages
    function showFormMessage(message, type) {
        // Remove any existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            padding: 15px;
            margin: 20px 0;
            border-radius: 8px;
            text-align: center;
            font-weight: 500;
            background: ${type === 'success' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)'};
            border: 1px solid ${type === 'success' ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)'};
            color: ${type === 'success' ? '#4CAF50' : '#f44336'};
        `;
        
        // Insert message after the form
        contactForm.parentNode.insertBefore(messageDiv, contactForm.nextSibling);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
});
