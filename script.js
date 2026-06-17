document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // MOBILE MENU TOGGLE
    // ==========================================================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // ==========================================================================
    // TYPEWRITER ANIMATION (HERO SECTION)
    // ==========================================================================
    const typewriterText = document.getElementById('typewriter-text');
    const roles = [
        'Senior Software Engineer.',
        'Full-Stack Developer (React/Next.js/Node.js).',
        'Redis Caching Specialist.',
        'Generative AI & LLM Integrator.',
        'System Architect & API Optimizer.'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        if (!typewriterText) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typewriterText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Speed up when deleting
        } else {
            typewriterText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        // Handle states
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 1800; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400; // Pause before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typewriter
    typeEffect();

    // ==========================================================================
    // SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.scroll-reveal');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    // Once visible, we don't need to observe it anymore
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px' // Trigger slightly before it enters screen fully
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // ==========================================================================
    // ACTIVE NAVIGATION LINKS HIGHLIGHT & SCROLLED HEADER
    // ==========================================================================
    const mainHeader = document.getElementById('main-header');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Header shrink
        if (mainHeader) {
            if (window.scrollY > 50) {
                mainHeader.classList.add('scrolled');
            } else {
                mainHeader.classList.remove('scrolled');
            }
        }

        // Active Link Highlight
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // Offset for navbar height
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================================================
    // BACK TO TOP BUTTON
    // ==========================================================================
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================================================
    // SKILLS FILTERING
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterCategory = button.getAttribute('data-filter');

            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterCategory === 'all' || cardCategory === filterCategory) {
                    card.classList.remove('hidden');
                    // Reset animation sequence
                    card.style.animation = 'none';
                    card.offsetHeight; // Trigger reflow to restart animation if any
                    card.style.animation = null;
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ==========================================================================
    // PROJECT SPECIFICATIONS ACCORDION (EXPAND DETAILS)
    // ==========================================================================
    const detailsTriggers = document.querySelectorAll('.details-trigger');

    detailsTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const targetId = trigger.getAttribute('data-target');
            const detailsElement = document.getElementById(targetId);

            if (detailsElement) {
                const isExpanded = detailsElement.classList.contains('expanded');

                // Toggle details element height/opacity
                if (isExpanded) {
                    detailsElement.classList.remove('expanded');
                    trigger.innerHTML = 'System Details <i class="fa-solid fa-chevron-down"></i>';
                } else {
                    detailsElement.classList.add('expanded');
                    trigger.innerHTML = 'Close Details <i class="fa-solid fa-chevron-up"></i>';
                }
            }
        });
    });

    // ==========================================================================
    // PORTFOLIO CONTACT FORM INTERACTION
    // ==========================================================================
    const contactForm = document.getElementById('portfolio-contact-form');
    const formFeedback = document.getElementById('form-feedback-message');
    const submitBtn = document.getElementById('form-submit-btn');

    // Replace this with your Web3Forms Access Key from your email!
    const WEB3FORMS_ACCESS_KEY = "4e8cabd6-1c53-4455-8cd3-847f6aec70b2";

    if (contactForm && formFeedback && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Disable button and show loading state
            submitBtn.disabled = true;
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="btn-text">Sending...</span><span class="btn-icon"><i class="fa-solid fa-circle-notch fa-spin"></i></span>';

            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const subject = document.getElementById('form-subject').value;
            const message = document.getElementById('form-message').value;

            // Submit using Web3Forms API endpoint to route to sharmal.codex@gmail.com
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    name: name,
                    email: email,
                    subject: `Portfolio Contact: ${subject}`,
                    message: message
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.success === 'true' || data.success === true) {
                        // Display success messaging
                        formFeedback.textContent = `Thank you, ${name}! Your message has been sent successfully. I will get in touch with you soon.`;
                        formFeedback.className = 'form-feedback success';
                        formFeedback.style.display = 'block';

                        // Reset form fields
                        contactForm.reset();
                    } else {
                        throw new Error(data.message || 'Web3Forms responded with error status');
                    }
                })
                .catch(error => {
                    console.error('Contact submission error:', error);
                    // Display error messaging
                    formFeedback.textContent = 'Oops! There was a problem sending your message. Please try again or email me directly.';
                    formFeedback.className = 'form-feedback error';
                    formFeedback.style.display = 'block';
                })
                .finally(() => {
                    // Restore button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;

                    // Hide feedback after 8 seconds
                    setTimeout(() => {
                        formFeedback.style.display = 'none';
                    }, 8000);
                });
        });
    }
});
