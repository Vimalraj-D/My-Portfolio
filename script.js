document.addEventListener('DOMContentLoaded', function() {
    // Check if GSAP is available, if not, provide fallback animations
    const hasGSAP = typeof gsap !== 'undefined';
    console.log("GSAP available:", hasGSAP);

    // Initialize Email.js for contact form functionality
    initializeEmailJS();
    
    // Setup contact form
    setupContactForm();

    // Mobile detection
    const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Initialize mobile-specific elements
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const sectionIndicator = document.getElementById('section-indicator');
    const mobileScrollIndicator = document.getElementById('mobile-scroll-indicator');
    
    // Mobile-specific initializations
    if (isMobile) {
        initMobileEnhancements();
    }
    
    // Handle scroll to top button
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Show/hide scroll to top button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
    }
    
    // Update section indicator on scroll
    if (sectionIndicator) {
        window.addEventListener('scroll', updateSectionIndicator);
    }
    
    // Hide mobile scroll indicator after scrolling
    if (mobileScrollIndicator) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                mobileScrollIndicator.classList.add('hidden');
                
                // Remove it from DOM after animation completes
                setTimeout(() => {
                    mobileScrollIndicator.style.display = 'none';
                }, 500);
            }
        });
    }
    
    // About section tab functionality
    document.querySelectorAll('.about-nav-item').forEach(tab => {
        tab.addEventListener('click', () => {
            console.log("About tab clicked:", tab.getAttribute('data-tab'));
            
            // Remove active class from all tabs and content panels
            document.querySelectorAll('.about-nav-item').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.about-content-panel').forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content panel
            const tabId = tab.getAttribute('data-tab');
            const contentPanel = document.querySelector(`.about-content-panel[data-tab="${tabId}"]`);
            if (contentPanel) {
                contentPanel.classList.add('active');
            } else {
                console.error("Content panel not found for tab:", tabId);
            }
        });
    });
    
    // Skills section tab functionality
    document.querySelectorAll('.skills-category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            console.log("Skills category clicked:", btn.getAttribute('data-category'));
            
            // Remove active class from all buttons and content panels
            document.querySelectorAll('.skills-category-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.skills-category-content').forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show corresponding content panel
            const categoryId = btn.getAttribute('data-category');
            const categoryContent = document.querySelector(`.skills-category-content[data-category="${categoryId}"]`);
            if (categoryContent) {
                categoryContent.classList.add('active');
                
                // Animate skill bars
                setTimeout(() => {
                    categoryContent.querySelectorAll('.skill-level').forEach(bar => {
                        const width = bar.style.width;
                        bar.style.transform = 'scaleX(0)';
                        
                        setTimeout(() => {
                            bar.style.transform = `scaleX(${parseInt(width) / 100})`;
                        }, 100);
                    });
                }, 300);
            } else {
                console.error("Category content not found for category:", categoryId);
            }
        });
    });

    // Initialize social planets animations
    initSocialPlanets();
    
    // Enhanced skill cards interactions
    enhanceSkillsSection();
    
    // 3D hover effect for about section
    const aboutCard = document.querySelector('.about-3d-card');
    const aboutSection = document.querySelector('.about-section');
    
    if (aboutSection && aboutCard && !isMobile) {
        aboutSection.addEventListener('mousemove', function(e) {
            const rect = aboutCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            // Limit rotation to a small amount for subtlety
            const rotateY = deltaX * 5; // 5 degree max rotation
            const rotateX = -deltaY * 5; // 5 degree max rotation
            
            aboutCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        aboutSection.addEventListener('mouseleave', function() {
            aboutCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }
    
    // Initialize skill bars on page load
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    const skillLevels = entry.target.querySelectorAll('.skill-level');
                    skillLevels.forEach(level => {
                        const width = level.style.width;
                        level.style.transform = `scaleX(${parseInt(width) / 100})`;
                    });
                }, 300);
                
                // Only need to animate once
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe skill sections
    document.querySelectorAll('.skills-category-content').forEach(section => {
        observer.observe(section);
    });

    // Initialize by showing the first about tab content
    const firstAboutTab = document.querySelector('.about-nav-item');
    if (firstAboutTab) {
        const firstTabId = firstAboutTab.getAttribute('data-tab');
        const firstPanel = document.querySelector(`.about-content-panel[data-tab="${firstTabId}"]`);
        if (firstPanel) {
            firstPanel.classList.add('active');
        }
        firstAboutTab.classList.add('active');
    }
    
    // Initialize by showing the first skills category content
    const firstSkillsBtn = document.querySelector('.skills-category-btn');
    if (firstSkillsBtn) {
        const firstCategoryId = firstSkillsBtn.getAttribute('data-category');
        const firstCategory = document.querySelector(`.skills-category-content[data-category="${firstCategoryId}"]`);
        if (firstCategory) {
            firstCategory.classList.add('active');
        }
        firstSkillsBtn.classList.add('active');
    }

    // Typing Animation for Name - with fallback if GSAP not available
    const nameElement = document.getElementById('typing-name');
    const fullName = "Vimalraj D";

    function typeName() {
        if (!nameElement) {
            console.warn("Name element not found for typing animation");
            return;
        }
        
        nameElement.innerHTML = "";
        const chars = fullName.split("");
        
        if (hasGSAP) {
            // GSAP version
            chars.forEach((char, index) => {
                const span = document.createElement("span");
                span.textContent = char;
                span.style.opacity = "0";
                nameElement.appendChild(span);
                
                gsap.to(span, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.2,
                    delay: index * 0.1,
                    ease: "power2.out"
                });
            });
            
            setTimeout(() => {
                nameElement.classList.add('typing-cursor');
                setTimeout(() => nameElement.classList.remove('typing-cursor'), 1000);
            }, fullName.length * 100);
        } else {
            // Fallback animation without GSAP
            let i = 0;
            nameElement.classList.add('typing-cursor');
            
            function typeNextChar() {
                if (i < chars.length) {
                    const span = document.createElement("span");
                    span.textContent = chars[i];
                    span.style.opacity = "0";
                    nameElement.appendChild(span);
                    
                    // Simple fade-in animation
                    setTimeout(() => {
                        span.style.opacity = "1";
                    }, 50);
                    
                    i++;
                    setTimeout(typeNextChar, 100);
                } else {
                    setTimeout(() => nameElement.classList.remove('typing-cursor'), 1000);
                }
            }
            
            typeNextChar();
        }
    }

    function cycleName() {
        if (!nameElement) return;
        
        if (hasGSAP) {
            gsap.to(nameElement, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    typeName();
                    gsap.to(nameElement, { opacity: 1, duration: 0.3 });
                    setTimeout(cycleName, 4000);
                }
            });
        } else {
            // Fallback animation
            nameElement.style.transition = "opacity 0.3s";
            nameElement.style.opacity = "0";
            
            setTimeout(() => {
                typeName();
                nameElement.style.opacity = "1";
                setTimeout(cycleName, 4000);
            }, 300);
        }
    }

    // Greeting Animation
    const greetingElement = document.getElementById('welcome-greeting');
    const greetings = [
        "Initializing AI Systems...",
        "Loading Neural Networks...",
        "Optimizing ML Models...",
        "Connecting Data Pipelines...",
        "Activating Deep Learning..."
    ];
    let greetingIndex = 0;

    function typeGreeting(text) {
        if (!greetingElement) {
            console.warn("Greeting element not found");
            return;
        }
        
        greetingElement.innerHTML = "";
        const chars = text.split("");
        
        if (hasGSAP) {
            chars.forEach((char, index) => {
                const span = document.createElement("span");
                span.textContent = char;
                span.style.opacity = "0";
                greetingElement.appendChild(span);
                
                gsap.to(span, {
                    opacity: 1,
                    duration: 0.05,
                    delay: index * 0.05,
                    ease: "power2.out"
                });
            });
        } else {
            // Fallback typing animation
            let i = 0;
            
            function typeNextChar() {
                if (i < chars.length) {
                    const span = document.createElement("span");
                    span.textContent = chars[i];
                    span.style.opacity = "0";
                    greetingElement.appendChild(span);
                    
                    // Simple fade-in animation
                    setTimeout(() => {
                        span.style.opacity = "1";
                    }, 20);
                    
                    i++;
                    setTimeout(typeNextChar, 50);
                }
            }
            
            typeNextChar();
        }
    }

    function cycleGreetings() {
        if (!greetingElement) return;
        
        if (hasGSAP) {
            gsap.to(greetingElement, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    typeGreeting(greetings[greetingIndex]);
                    gsap.to(greetingElement, { opacity: 1, duration: 0.3 });
                    greetingIndex = (greetingIndex + 1) % greetings.length;
                    setTimeout(cycleGreetings, 4000);
                }
            });
        } else {
            // Fallback animation
            greetingElement.style.transition = "opacity 0.3s";
            greetingElement.style.opacity = "0";
            
            setTimeout(() => {
                typeGreeting(greetings[greetingIndex]);
                greetingElement.style.opacity = "1";
                greetingIndex = (greetingIndex + 1) % greetings.length;
                setTimeout(cycleGreetings, 4000);
            }, 300);
        }
    }

    // Initialize the typing animations
    if (greetingElement && nameElement) {
        console.log("Initializing typing animations");
        typeGreeting(greetings[0]);
        typeName();
        
        if (hasGSAP) {
            gsap.to(greetingElement, { opacity: 1, duration: 0.5, delay: 0.5 });
            gsap.to(nameElement, { opacity: 1, duration: 0.5, delay: 0.5 });
        } else {
            setTimeout(() => {
                greetingElement.style.opacity = "1";
                nameElement.style.opacity = "1";
            }, 500);
        }
        
        setTimeout(cycleGreetings, 4000);
        setTimeout(cycleName, 4000);
    } else {
        console.warn("Greeting or name elements not found in the DOM");
    }

    // MacOS Dock Interactions with improved animations
    const dockItems = document.querySelectorAll('.dock-item');
    dockItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (hasGSAP) {
                gsap.to(item, {
                    y: -15,
                    scale: 1.2,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
                
                const tooltip = item.querySelector('.tooltip');
                if (tooltip) {
                    gsap.to(tooltip, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.3,
                        ease: "back.out(1.7)"
                    });
                }
                
                // Enhanced neighboring dock items animation
                const index = Array.from(dockItems).indexOf(item);
                for (let i = 0; i < dockItems.length; i++) {
                    if (i !== index) {
                        const distance = Math.abs(i - index);
                        if (distance <= 2) {
                            const scale = 1 + (0.15 * (1 - distance / 3));
                            const y = -8 * (1 - distance / 3);
                            gsap.to(dockItems[i], {
                                y: y,
                                scale: scale,
                                duration: 0.3,
                                ease: "back.out(1.7)"
                            });
                        }
                    }
                }
            } else {
                // Fallback without GSAP
                item.style.transition = "transform 0.3s";
                item.style.transform = "translateY(-15px) scale(1.2)";
                
                const tooltip = item.querySelector('.tooltip');
                if (tooltip) {
                    tooltip.style.transition = "opacity 0.3s, transform 0.3s";
                    tooltip.style.opacity = "1";
                    tooltip.style.transform = "scale(1)";
                }
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (hasGSAP) {
                gsap.to(item, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                const tooltip = item.querySelector('.tooltip');
                if (tooltip) {
                    gsap.to(tooltip, {
                        opacity: 0,
                        scale: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
                
                dockItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        gsap.to(otherItem, {
                            y: 0,
                            scale: 1,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    }
                });
            } else {
                // Fallback without GSAP
                item.style.transform = "translateY(0) scale(1)";
                
                const tooltip = item.querySelector('.tooltip');
                if (tooltip) {
                    tooltip.style.opacity = "0";
                    tooltip.style.transform = "scale(0)";
                }
                
                dockItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.style.transform = "translateY(0) scale(1)";
                    }
                });
            }
        });
        
        item.addEventListener('click', () => {
            item.classList.add('clicked');
            
            if (hasGSAP) {
                gsap.to(item, {
                    scale: 1.3,
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut",
                    onComplete: () => item.classList.remove('clicked')
                });
            } else {
                // Fallback click animation
                item.style.transition = "transform 0.2s";
                item.style.transform = "scale(1.3)";
                
                setTimeout(() => {
                    item.style.transform = "scale(1)";
                    setTimeout(() => item.classList.remove('clicked'), 200);
                }, 200);
            }
            
            const section = item.getAttribute('data-section');
            if (section) {
                const target = document.getElementById(section);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const formModal = document.getElementById('form-modal');
    const modalClose = document.getElementById('modal-close');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log("Form submission started...");
            
            // Show loading message
            formMessage.textContent = "Sending message...";
            formMessage.style.color = "var(--color-text-muted)";
            
            // Prepare template parameters for EmailJS
            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                to_name: "Vimalraj D",
                to_email: "vimalrajnov172005@gmail.com"
            };
            
            console.log("Sending email with parameters:", JSON.stringify(templateParams));
            
            if (typeof emailjs === 'undefined') {
                console.error("EmailJS is not defined! Make sure EmailJS is properly loaded.");
                formMessage.textContent = "Error: Email service not available. Please try again later.";
                formMessage.style.color = "red";
                return;
            }
            
            // Using EmailJS to send email
            emailjs.send('service_i1edc0e', 'template_fk8djia', templateParams)
                .then(function(response) {
                    console.log("Email sent successfully!", response);
                    // Reset form
                    contactForm.reset();
                    
                    // Show success message
                    formMessage.textContent = "Message sent successfully!";
                    formMessage.style.color = "var(--color-primary)";
                    
                    // Show success modal
                    if (formModal) {
                        formModal.style.display = "flex";
                    }
                })
                .catch(function(error) {
                    console.error("Email sending failed!", error);
                    formMessage.textContent = "Failed to send message: " + (error.text || "Unknown error");
                    formMessage.style.color = "red";
                });
        });
    } else {
        console.error("Contact form not found in the DOM");
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            if (formModal) {
                if (typeof gsap !== 'undefined') {
                    gsap.to(formModal.querySelector('.modal-content'), {
                        scale: 0,
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.in',
                        onComplete: () => {
                            formModal.style.display = 'none';
                        }
                    });
                } else {
                    const modalContent = formModal.querySelector('.modal-content');
                    modalContent.style.opacity = "0";
                    modalContent.style.transform = "scale(0)";
                    setTimeout(() => {
                        formModal.style.display = 'none';
                    }, 300);
                }
            }
        });
    }

    // Try to initialize particles.js if available
    if (typeof particlesJS !== 'undefined') {
        try {
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 60,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#ff014f"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 2,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#ff014f",
                        "opacity": 0.2,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": true,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": true,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 0.5
                            }
                        },
                        "push": {
                            "particles_nb": 4
                        }
                    }
                },
                "retina_detect": true
            });
        } catch (e) {
            console.warn("Error initializing particles.js:", e);
        }
    } else {
        console.warn("particles.js not found. Please include this library.");
    }

    // Initialize any visible Elon Musk image
    try {
        createElonMuskImage();
    } catch (e) {
        console.warn("Error creating Elon Musk image:", e);
    }

    // Chatbot functionality
    initChatbot();

    // Log initialization complete
    console.log("Script initialization complete");

    // Mobile enhancements initialization
    function initMobileEnhancements() {
        // Add touch optimizations
        optimizeForTouch();
        
        // Improve form interaction on mobile
        enhanceMobileFormExperience();
        
        // Add vibration feedback for interactive elements if supported
        addVibrationFeedback();
        
        // Show the mobile scroll indicator for 5 seconds, then fade it out
        setTimeout(() => {
            if (mobileScrollIndicator && window.scrollY < 100) {
                mobileScrollIndicator.classList.add('hidden');
            }
        }, 5000);
        
        // Handle orientation changes
        window.addEventListener('orientationchange', handleOrientationChange);
    }
    
    // Update section indicator based on scroll position
    function updateSectionIndicator() {
        if (!sectionIndicator) return;
        
        // Get all sections
        const sections = document.querySelectorAll('section[id]');
        
        // Find the current section in viewport
        let currentSection = '';
        let minDistance = Infinity;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const distance = Math.abs(window.scrollY - sectionTop);
            
            if (distance < minDistance) {
                minDistance = distance;
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update the indicator text
        if (currentSection) {
            // Capitalize first letter
            const sectionName = currentSection.charAt(0).toUpperCase() + currentSection.slice(1);
            sectionIndicator.textContent = sectionName;
            
            // Add visible class
            sectionIndicator.classList.add('visible');
            
            // Hide after 2 seconds
            clearTimeout(sectionIndicator.fadeTimeout);
            sectionIndicator.fadeTimeout = setTimeout(() => {
                sectionIndicator.classList.remove('visible');
            }, 2000);
        }
    }
    
    // Optimize elements for touch interaction
    function optimizeForTouch() {
        // Make all interactive elements have proper touch area
        const touchElements = document.querySelectorAll('a, button, .social-card, .project-card');
        
        touchElements.forEach(el => {
            // Ensure minimum touch area of 44x44px
            const rect = el.getBoundingClientRect();
            if (rect.width < 44 || rect.height < 44) {
                el.style.minWidth = '44px';
                el.style.minHeight = '44px';
            }
        });
    }
    
    // Enhance form experience on mobile
    function enhanceMobileFormExperience() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Focus styling
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
                
                // Add 'filled' class if input has a value
                if (input.value.trim() !== '') {
                    input.parentElement.classList.add('filled');
                } else {
                    input.parentElement.classList.remove('filled');
                }
            });
        });
    }
    
    // Add vibration feedback for interactive elements if supported
    function addVibrationFeedback() {
        if (!('vibrate' in navigator)) return;
        
        const buttons = document.querySelectorAll('button, .dock-item, .social-card, .project-link');
        
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                navigator.vibrate(15); // Short 15ms vibration
            });
        });
    }
    
    // Handle orientation changes
    function handleOrientationChange() {
        // Adjust chatbot size based on orientation
        const chatbotPanel = document.getElementById('chatbot-panel');
        if (chatbotPanel) {
            if (window.orientation === 90 || window.orientation === -90) {
                // Landscape
                chatbotPanel.style.height = '85vh';
                chatbotPanel.style.maxHeight = '400px';
            } else {
                // Portrait
                chatbotPanel.style.height = '70vh';
                chatbotPanel.style.maxHeight = 'none';
            }
        }
    }
});

// Function to create stylized Elon Musk profile with interactive SVG
function createElonMuskImage() {
    // Get the image placeholder element
    const elonImage = document.getElementById('elon-image');
    if (!elonImage) {
        console.warn("Elon image element not found");
        return;
    }
    
    console.log("Creating Elon Musk SVG image");
    
    // Create an SVG element for Elon Musk's portrait
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", "0 0 400 400");
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.left = "0";
    
    // Create a gradient for the background
    const defs = document.createElementNS(svgNS, "defs");
    
    // Radial gradient for the face glow
    const glowGradient = document.createElementNS(svgNS, "radialGradient");
    glowGradient.setAttribute("id", "faceGlow");
    glowGradient.setAttribute("cx", "50%");
    glowGradient.setAttribute("cy", "40%");
    glowGradient.setAttribute("r", "60%");
    
    const stop1 = document.createElementNS(svgNS, "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", "rgba(255, 73, 74, 0.6)");
    
    const stop2 = document.createElementNS(svgNS, "stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("stop-color", "rgba(16, 16, 26, 0)");
    
    glowGradient.appendChild(stop1);
    glowGradient.appendChild(stop2);
    
    // Linear gradient for Tesla red
    const teslaGradient = document.createElementNS(svgNS, "linearGradient");
    teslaGradient.setAttribute("id", "teslaRed");
    teslaGradient.setAttribute("x1", "0%");
    teslaGradient.setAttribute("y1", "0%");
    teslaGradient.setAttribute("x2", "100%");
    teslaGradient.setAttribute("y2", "100%");
    
    const tStop1 = document.createElementNS(svgNS, "stop");
    tStop1.setAttribute("offset", "0%");
    tStop1.setAttribute("stop-color", "#ff014f");
    
    const tStop2 = document.createElementNS(svgNS, "stop");
    tStop2.setAttribute("offset", "100%");
    tStop2.setAttribute("stop-color", "#ff4a4a");
    
    teslaGradient.appendChild(tStop1);
    teslaGradient.appendChild(tStop2);
    
    defs.appendChild(glowGradient);
    defs.appendChild(teslaGradient);
    svg.appendChild(defs);
    
    // Add a glow background
    const glow = document.createElementNS(svgNS, "circle");
    glow.setAttribute("cx", "200");
    glow.setAttribute("cy", "160");
    glow.setAttribute("r", "150");
    glow.setAttribute("fill", "url(#faceGlow)");
    glow.setAttribute("opacity", "0.7");
    svg.appendChild(glow);
    
    // Create the face shape
    const face = document.createElementNS(svgNS, "path");
    face.setAttribute("d", "M160,120 C160,80 240,80 240,120 L240,200 C240,240 160,240 160,200 Z");
    face.setAttribute("fill", "rgba(255,255,255,0.05)");
    face.setAttribute("stroke", "rgba(255,255,255,0.2)");
    face.setAttribute("stroke-width", "1");
    svg.appendChild(face);
    
    // Create the hair
    const hair = document.createElementNS(svgNS, "path");
    hair.setAttribute("d", "M160,120 C160,80 240,80 240,120 L240,130 C200,140 200,140 160,130 Z");
    hair.setAttribute("fill", "rgba(255,255,255,0.1)");
    svg.appendChild(hair);
    
    // Create the eyes
    const leftEye = document.createElementNS(svgNS, "circle");
    leftEye.setAttribute("cx", "180");
    leftEye.setAttribute("cy", "150");
    leftEye.setAttribute("r", "8");
    leftEye.setAttribute("fill", "url(#teslaRed)");
    
    const rightEye = document.createElementNS(svgNS, "circle");
    rightEye.setAttribute("cx", "220");
    rightEye.setAttribute("cy", "150");
    rightEye.setAttribute("r", "8");
    rightEye.setAttribute("fill", "url(#teslaRed)");
    
    svg.appendChild(leftEye);
    svg.appendChild(rightEye);
    
    // Create the mouth
    const mouth = document.createElementNS(svgNS, "path");
    mouth.setAttribute("d", "M180,190 Q200,210 220,190");
    mouth.setAttribute("fill", "none");
    mouth.setAttribute("stroke", "rgba(255,255,255,0.3)");
    mouth.setAttribute("stroke-width", "2");
    svg.appendChild(mouth);
    
    // Create a body silhouette
    const body = document.createElementNS(svgNS, "path");
    body.setAttribute("d", "M160,200 L170,300 C170,330 230,330 230,300 L240,200");
    body.setAttribute("fill", "rgba(255,255,255,0.03)");
    body.setAttribute("stroke", "rgba(255,255,255,0.1)");
    body.setAttribute("stroke-width", "1");
    svg.appendChild(body);
    
    // Add Tesla symbol on chest
    const teslaLogo = document.createElementNS(svgNS, "path");
    teslaLogo.setAttribute("d", "M200,240 L215,240 L215,250 L225,250 L200,280 L175,250 L185,250 L185,240 Z");
    teslaLogo.setAttribute("fill", "url(#teslaRed)");
    teslaLogo.setAttribute("opacity", "0.7");
    svg.appendChild(teslaLogo);
    
    // Add some ambient particles
    for (let i = 0; i < 25; i++) {
      const particle = document.createElementNS(svgNS, "circle");
      const x = Math.random() * 400;
      const y = Math.random() * 400;
      const size = Math.random() * 3 + 1;
      particle.setAttribute("cx", x);
      particle.setAttribute("cy", y);
      particle.setAttribute("r", size);
      particle.setAttribute("fill", "rgba(255,255,255,0.3)");
      
      // Add animation to the particle
      const anim = document.createElementNS(svgNS, "animate");
      anim.setAttribute("attributeName", "opacity");
      anim.setAttribute("values", "0.3;0.8;0.3");
      anim.setAttribute("dur", (Math.random() * 3 + 2) + "s");
      anim.setAttribute("repeatCount", "indefinite");
      
      particle.appendChild(anim);
      svg.appendChild(particle);
    }
    
    // Add some circuit-like lines in the background
    for (let i = 0; i < 8; i++) {
      const startX = Math.random() * 400;
      const startY = Math.random() * 400;
      
      const line = document.createElementNS(svgNS, "path");
      let pathData = `M${startX},${startY} `;
      
      // Create a random path with 3-5 segments
      const segments = Math.floor(Math.random() * 3) + 3;
      for (let j = 0; j < segments; j++) {
        const angleRad = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 20;
        const endX = startX + Math.cos(angleRad) * distance * (j+1);
        const endY = startY + Math.sin(angleRad) * distance * (j+1);
        
        pathData += `L${endX},${endY} `;
      }
      
      line.setAttribute("d", pathData);
      line.setAttribute("fill", "none");
      line.setAttribute("stroke", "rgba(255,1,79,0.2)");
      line.setAttribute("stroke-width", "1");
      line.setAttribute("stroke-dasharray", "5,5");
      
      // Add animation
      const anim = document.createElementNS(svgNS, "animate");
      anim.setAttribute("attributeName", "stroke-dashoffset");
      anim.setAttribute("from", "0");
      anim.setAttribute("to", "100");
      anim.setAttribute("dur", (Math.random() * 5 + 5) + "s");
      anim.setAttribute("repeatCount", "indefinite");
      
      line.appendChild(anim);
      svg.appendChild(line);
    }
    
    // Replace the image with our SVG
    elonImage.innerHTML = '';
    elonImage.appendChild(svg);
    
    // Make sure the parent container has appropriate styles
    elonImage.style.height = '400px';
    elonImage.style.width = '100%';
    elonImage.style.display = 'block';
    elonImage.style.position = 'relative';
    elonImage.style.background = 'linear-gradient(45deg, #10101a, #191927)';
    elonImage.style.borderRadius = '10px';
    elonImage.style.overflow = 'hidden';
}

// Resume data summary for the chatbot
const resumeData = {
    name: "Vimalraj D",
    title: "ML Engineer | Deep Learning Enthusiast",
    email: "vimalrajnov172005@gmail.com",
    summary: "Motivated Machine Learning Engineer with experience in developing and deploying ML and Deep Learning models using PyTorch, OpenCV, and Scikit-Learn. Skilled in Python, NLP, RCNN, and RNN, with model deployment experience using Streamlit and Flask.",
    skills: {
        ml: ["Classification", "Regression", "Clustering", "Model Deployment"],
        deepLearning: ["CNN", "RCNN", "RNN", "Object Detection", "YOLO", "Image Classification", "NLP"],
        programming: ["Python", "C", "Java", "HTML/CSS"],
        libraries: ["PyTorch", "Scikit-Learn", "OpenCV", "nltk", "Transformers", "Hugging Face"],
        tools: ["Jupyter Notebook", "VS Code", "Git", "Streamlit"]
    },
    projects: [
        {
            title: "Book Recommendation System",
            description: "Built a machine learning model to recommend books based on user preferences, deployed as a web application using Flask.",
            technologies: ["Python", "Scikit-Learn", "Flask", "HTML/CSS", "Java Script"]
        },
        {
            title: "Face Detection Using OpenCV",
            description: "Developed a real-time face detection system capable of identifying multiple faces simultaneously in images and video streams.",
            technologies: ["Python", "OpenCV", "YOLO", "Image Processing"]
        },
        {
            title: "Image Text Extraction",
            description: "Created a program that extracts and displays text from images using OCR technology with Tesseract.",
            technologies: ["Python", "OpenCV", "Tesseract OCR", "Text Extraction"]
        }
    ],
    experience: [
        {
            title: "Machine Learning Intern",
            company: "Unified Mentor",
            duration: "1 Month",
            date: "Sept 2024 - Oct 2024",
            description: "Developed and optimized machine learning models for real-world applications. Applied deep learning techniques, including CNN using PyTorch."
        }
    ],
    education: {
        degree: "Bachelor of Engineering in Computer Science and Engineering (AI & ML)",
        institution: "Dr. Mahalingham College of Engineering and Technology",
        location: "Coimbatore",
        duration: "2023-2027"
    },
    certifications: [
        "NPTEL Certification: Introduction to Programming in C (Elite + Silver)",
        "Linguaskill Communication Skills Certification: B1 Level",
        "Machine Learning Internship Certificate - Unified Mentor"
    ]
};

// Enhanced Chatbot Implementation
class EnhancedChatbot {
    constructor() {
        // Together API details
        this.TOGETHER_API_KEY = "tgp_v1_M8yz4zamZDdw3cCNvFqK2lBl1kjLv76bhoVASd3guqM";
        this.MODEL = "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8";
        
        // DOM elements
        this.chatbotToggle = document.getElementById('chatbot-toggle');
        this.chatbotPanel = document.getElementById('chatbot-panel');
        this.chatbotClose = document.getElementById('chatbot-close');
        this.chatbotBody = document.getElementById('chatbot-body');
        this.chatbotInput = document.getElementById('chatbot-input');
        this.chatbotSubmit = document.getElementById('chatbot-submit');
        this.quickReplies = document.querySelectorAll('.quick-reply');
        this.chatbotPopup = document.querySelector('.chatbot-popup');
        
        // Popup messages
        this.popupMessages = [
            "Can I help you?",
            "Need assistance?",
            "Ask me anything",
            "AI assistance",
            "Chat with me",
            "Have questions?",
            "I'm here to help"
        ];
        this.currentPopupIndex = 0;
        this.popupCycleInterval = null;
        
        // Conversation state
        this.conversationHistory = [{
            role: "system",
            content: this.createSystemPrompt()
        }];
        
        // Bind event handlers
        this.bindEvents();
        
        // Animation timers
        this.animationTimers = [];
        
        // Setup popup cycling
        this.setupPopupCycling();
    }
    
    // Setup popup cycling functionality
    setupPopupCycling() {
        if (!this.chatbotPopup) {
            this.chatbotPopup = document.createElement('div');
            this.chatbotPopup.className = 'chatbot-popup';
            this.chatbotToggle.appendChild(this.chatbotPopup);
        }
        
        // Clear the popup
        this.chatbotPopup.innerHTML = '';
        
        // Create popup text elements for each message
        this.popupMessages.forEach((message, index) => {
            const popupText = document.createElement('div');
            popupText.className = 'popup-text';
            popupText.textContent = message;
            if (index === 0) popupText.classList.add('active');
            this.chatbotPopup.appendChild(popupText);
        });
        
        // Start cycling automatically, not just on hover
        this.startPopupCycling();
        
        // Only stop cycling when chatbot opens, using MutationObserver
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    if (this.chatbotPanel.classList.contains('active')) {
                        this.stopPopupCycling();
                        this.chatbotPopup.style.opacity = '0';
        } else {
                        this.startPopupCycling();
                        this.chatbotPopup.style.opacity = '1';
                    }
                }
            });
        });
        
        observer.observe(this.chatbotPanel, { attributes: true });
    }
    
    // Start cycling popup messages
    startPopupCycling() {
        if (this.popupCycleInterval) return;
        
        // Make popup visible
        this.chatbotPopup.style.opacity = '1';
        this.chatbotPopup.style.transform = 'translateY(0)';
        
        this.currentPopupIndex = 0;
        this.updateActivePopup();
        
        this.popupCycleInterval = setInterval(() => {
            this.currentPopupIndex = (this.currentPopupIndex + 1) % this.popupMessages.length;
            this.updateActivePopup();
        }, 2000);
    }
    
    // Stop cycling popup messages
    stopPopupCycling() {
        if (this.popupCycleInterval) {
            clearInterval(this.popupCycleInterval);
            this.popupCycleInterval = null;
        }
    }
    
    // Update the active popup message
    updateActivePopup() {
        const popupTexts = this.chatbotPopup.querySelectorAll('.popup-text');
        popupTexts.forEach((text, index) => {
            if (index === this.currentPopupIndex) {
                text.classList.add('active');
            } else {
                text.classList.remove('active');
            }
        });
    }
    
    // Create system prompt with resume data
    createSystemPrompt() {
        return `You are an AI assistant for Vimalraj D, a Machine Learning Engineer. 
        Use this resume information to answer questions accurately and concisely:
        
        Name: ${resumeData.name}
        Title: ${resumeData.title}
        Email: ${resumeData.email}
        
        Summary: ${resumeData.summary}
        
        Skills:
        - Machine Learning: ${resumeData.skills.ml.join(', ')}
        - Deep Learning: ${resumeData.skills.deepLearning.join(', ')}
        - Programming: ${resumeData.skills.programming.join(', ')}
        - Libraries/Frameworks: ${resumeData.skills.libraries.join(', ')}
        - Tools: ${resumeData.skills.tools.join(', ')}
        
        Projects:
        1. ${resumeData.projects[0].title}: ${resumeData.projects[0].description}
        2. ${resumeData.projects[1].title}: ${resumeData.projects[1].description}
        3. ${resumeData.projects[2].title}: ${resumeData.projects[2].description}
        
        Experience:
        - ${resumeData.experience[0].title} at ${resumeData.experience[0].company} (${resumeData.experience[0].date})
          ${resumeData.experience[0].description}
        
        Education:
        - ${resumeData.education.degree}
          ${resumeData.education.institution}, ${resumeData.education.location} (${resumeData.education.duration})
        
        Certifications:
        - ${resumeData.certifications.join('\n- ')}
        
        Your responses should be:
        1. Concise (under 150 words) but comprehensive
        2. Professional and focused on Vimalraj's skills and experience
        3. Friendly and conversational
        4. Highlighting Vimalraj's expertise in ML and AI
        5. Formatted with bullet points or line breaks when appropriate
        
        Don't make up information not included in the resume. If you don't know something, just say you don't have that specific information.`;
    }
    
    // Bind event listeners
    bindEvents() {
        if (this.chatbotToggle) {
            this.chatbotToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleChatbot();
            });
        }
        
        if (this.chatbotClose) {
            this.chatbotClose.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeChatbot();
            });
        }
        
        if (this.chatbotSubmit) {
            this.chatbotSubmit.addEventListener('click', (e) => {
                e.preventDefault();
                this.sendMessage();
            });
        }
        
        if (this.chatbotInput) {
            this.chatbotInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }
        
        if (this.quickReplies) {
            this.quickReplies.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const query = button.getAttribute('data-query');
                    this.chatbotInput.value = query;
                    this.sendMessage();
                });
            });
        }
    }
    
    // Open/close chatbot
    toggleChatbot() {
        this.chatbotPanel.classList.toggle('active');
        this.chatbotToggle.classList.toggle('active');
        
        if (this.chatbotPanel.classList.contains('active')) {
            this.chatbotInput.focus();
            this.stopPopupCycling();
            this.chatbotPopup.style.opacity = '0';
            
            // Clear any existing messages on re-open
            if (this.chatbotBody.childElementCount <= 1) {
                this.addWelcomeMessage();
            }
        } else {
            // Resume popup cycling when chatbot is closed
            this.startPopupCycling();
            this.chatbotPopup.style.opacity = '1';
        }
    }
    
    // Close chatbot
    closeChatbot() {
        this.chatbotPanel.classList.remove('active');
        this.chatbotToggle.classList.remove('active');
        
        // Resume popup cycling when chatbot is closed
        this.startPopupCycling();
        this.chatbotPopup.style.opacity = '1';
    }
    
    // Add welcome message
    addWelcomeMessage() {
        const welcomeMsg = "Hi there! 👋 I'm Vimalraj's AI assistant. I can tell you about his ML engineering experience, projects, and skills. How can I help you today? 😊";
        this.addMessage(welcomeMsg, 'bot', true);
    }
    
    // Send message
    sendMessage() {
        const message = this.chatbotInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        this.addMessage(message, 'user');
        this.chatbotInput.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Add to conversation history
        this.conversationHistory.push({
            role: "user",
            content: message
        });
        
        // Process with Together API
        this.processWithAI(message);
    }
    
    // Add message to chat
    addMessage(text, sender, isInitial = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}`;
        
        if (!isInitial) {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = sender === 'user' ? 'translateX(20px)' : 'translateX(-20px)';
        }
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        // Convert newlines to <br> tags and process markdown-style formatting
        const formattedText = this.formatMessageText(text);
        messageContent.innerHTML = formattedText;
        
        messageDiv.appendChild(messageContent);
        this.chatbotBody.appendChild(messageDiv);
        
        // Animate in
        if (!isInitial) {
            setTimeout(() => {
                messageDiv.style.transition = 'all 0.3s ease-out';
                messageDiv.style.opacity = '1';
                messageDiv.style.transform = 'translateX(0)';
            }, 10);
        }
        
        // Scroll to bottom
        this.chatbotBody.scrollTop = this.chatbotBody.scrollHeight;
    }
    
    // Format message text with basic markdown support
    formatMessageText(text) {
        let formatted = text
            .replace(/\n/g, '<br>')
            // Bold
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Bullet points
            .replace(/• (.*?)(?:<br>|$)/g, '<span class="bullet-point">• $1</span><br>')
            .replace(/- (.*?)(?:<br>|$)/g, '<span class="bullet-point">• $1</span><br>');
            
        return formatted;
    }
    
    // Show typing indicator
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            typingDiv.appendChild(dot);
        }
        
        this.chatbotBody.appendChild(typingDiv);
        this.chatbotBody.scrollTop = this.chatbotBody.scrollHeight;
    }
    
    // Remove typing indicator
    removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.style.opacity = '0';
            setTimeout(() => {
                typingIndicator.remove();
            }, 300);
        }
    }
    
    // Process message with Together API
    async processWithAI(userMessage) {
        try {
            // Get cached responses for common questions
            const cachedResponse = this.getCachedResponse(userMessage.toLowerCase());
            
            if (cachedResponse) {
                // Use cached response for common questions
                setTimeout(() => {
                    this.removeTypingIndicator();
                    this.showThinkingEffect(() => {
                        this.addMessage(cachedResponse, 'bot');
                        
                        // Add to conversation history
                        this.conversationHistory.push({
                            role: "assistant",
                            content: cachedResponse
                        });
                    });
                }, 800);
                return;
            }
            
            // Make API call to Together API
            try {
                const response = await fetch('https://api.together.xyz/v1/chat/completions', {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.TOGETHER_API_KEY}`
                },
                body: JSON.stringify({
                        model: this.MODEL,
                        messages: this.conversationHistory.concat([
                            { role: "user", content: userMessage }
                        ]),
                        max_tokens: 512,
                        temperature: 0.7,
                        top_p: 0.9
                    })
                });
                
                const data = await response.json();
                this.removeTypingIndicator();
                
                if (data.choices && data.choices.length > 0) {
                    const botResponse = data.choices[0].message.content.trim();
                    
                    // Add progressive display effect
                    this.showThinkingEffect(() => {
                        this.addMessage(botResponse, 'bot');
                        
                        // Add to conversation history
                        this.conversationHistory.push({
                            role: "assistant",
                            content: botResponse
                        });
                    });
                    
                    // Keep conversation history manageable (max 10 messages)
                    if (this.conversationHistory.length > 12) {
                        // Keep system prompt and last 6 exchanges
                        this.conversationHistory = [
                            this.conversationHistory[0],
                            ...this.conversationHistory.slice(this.conversationHistory.length - 11)
                        ];
                    }
                } else {
                    // Fallback if API fails
                    const fallbackResponse = this.getFallbackResponse(userMessage.toLowerCase());
                    this.showThinkingEffect(() => {
                        this.addMessage(fallbackResponse, 'bot');
                        
                        // Add to conversation history
                        this.conversationHistory.push({
                            role: "assistant",
                            content: fallbackResponse
                        });
                    });
                }
        } catch (error) {
                console.error('API Error:', error);
                this.removeTypingIndicator();
                
                // Use fallback responses if API fails
                const fallbackResponse = this.getFallbackResponse(userMessage.toLowerCase());
                this.showThinkingEffect(() => {
                    this.addMessage(fallbackResponse, 'bot');
                    
                    // Add to conversation history
                    this.conversationHistory.push({
                        role: "assistant",
                        content: fallbackResponse
                    });
                });
            }
        } catch (error) {
            console.error('General Error:', error);
            this.removeTypingIndicator();
            this.showThinkingEffect(() => {
                this.addMessage("I'm having trouble connecting to my brain right now. Please try again in a moment.", 'bot');
            });
        }
    }
    
    // Show thinking effect before response
    showThinkingEffect(callback) {
        // Clear any existing animation timers
        this.animationTimers.forEach(timer => clearTimeout(timer));
        this.animationTimers = [];
        
        const thinkingTime = Math.floor(Math.random() * 300) + 300;
        this.animationTimers.push(setTimeout(callback, thinkingTime));
    }
    
    // Get cached response for common questions
    getCachedResponse(query) {
        // Check for project-related queries
        if (query.includes('project') || query.includes('what did you build') || query.includes('what have you built')) {
            return `Vimalraj has worked on several ML projects including: 🚀💻

• **Book Recommendation System** 📚: Using collaborative filtering algorithms with Flask deployment
• **Face Detection System** 👁️: Real-time face detection with OpenCV and YOLO
• **Image Text Extraction** 📝: OCR implementation with Tesseract

Which project would you like to know more about? 💡`;
        } 
        // Check for skills-related queries
        else if (query.includes('skills') || query.includes('expertise') || query.includes('what can you do')) {
            return `Vimalraj is skilled in: 🧠⚙️

• **Machine Learning** 🤖: Classification, Regression, Clustering, Model Deployment
• **Deep Learning** 🧩: CNN, RCNN, RNN, Object Detection, YOLO, NLP
• **Programming** 💻: Python, C, Java, HTML/CSS
• **Libraries** 📊: PyTorch, Scikit-Learn, OpenCV, Transformers
• **Tools** 🛠️: Jupyter Notebook, VS Code, Git, Streamlit`;
        }
        // Check for education-related queries
        else if (query.includes('education') || query.includes('study') || query.includes('school') || query.includes('college') || query.includes('degree')) {
            return `Vimalraj is pursuing a **B.E. in Computer Science and Engineering (AI & ML)** at Dr. Mahalingham College of Engineering and Technology in Coimbatore (2023-2027). 🎓📚

He's focusing on cutting-edge AI/ML curriculum and hands-on projects to build practical skills. 💪`;
        }
        // Check for experience-related queries
        else if (query.includes('experience') || query.includes('job') || query.includes('intern')) {
            return `Vimalraj worked as a **Machine Learning Intern** at CubeAI Solutions (Feb 2025 to Present). 💼🔍 

During this role, he:
• 🚀 Developed and optimized machine learning models for real-world applications
• 🧠 Applied deep learning techniques including CNN using PyTorch
• 📈 Improved model accuracy by tuning hyperparameters and preprocessing data`;
        }
        // Check for certification-related queries
        else if (query.includes('certification') || query.includes('certificate') || query.includes('achievement')) {
            return `Vimalraj has earned these certifications and achievements: 🏆🥇

📜 **Certifications**:
• **NPTEL**: Introduction to Programming in C (Elite + Silver)
• **Linguaskill**: Communication Skills Certification (B1 Level)
• **Unified Mentor**: Machine Learning Internship Certificate

🏅 **Achievements**:
• **Hackathon Winner**: First place in AI/ML at TechFest 2024
• **Research Publication**: Paper on image classification techniques
• **Kaggle Competition**: Top 5% ranking in ML challenge`;
        }
        // Check for personal queries
        else if (query.includes('hobby') || query.includes('interest') || query.includes('free time')) {
            return `When not coding, Vimalraj enjoys: 🌟

• 📚 Reading tech blogs and research papers
• 🎮 Playing strategic games that challenge problem-solving skills
• 🧩 Solving complex puzzles and algorithmic challenges
• 🏃‍♂️ Staying active with sports and outdoor activities

These diverse interests help him maintain a creative mindset for AI development! 💡`;
        }
        // Return null for non-cached queries
        return null;
    }
    
    // Get fallback response if API fails
    getFallbackResponse(query) {
        // Check if there's a cached response first
        const cachedResponse = this.getCachedResponse(query);
        if (cachedResponse) return cachedResponse;
        
        // Generic fallback for project queries
        if (query.includes('project') || query.includes('work')) {
            return `Vimalraj has worked on ML projects like Book Recommendation Systems 📚, Face Detection 👁️, and Image Text Extraction 📝. Each project demonstrates his skills in different ML domains. 🚀`;
        } 
        // Generic fallback for skills queries
        else if (query.includes('skills') || query.includes('expertise')) {
            return `Vimalraj is skilled in ML technologies including PyTorch 🔥, OpenCV 👁️, Scikit-Learn 📊, and various deep learning techniques. He's proficient in Python 🐍 and has experience with model deployment. 💻`;
        }
        // Generic fallback for education queries
        else if (query.includes('education') || query.includes('study')) {
            return `Vimalraj is studying Computer Science and Engineering with a focus on AI & ML at Dr. Mahalingham College of Engineering and Technology (2023-2027). 🎓 He's passionate about applying theoretical knowledge to practical AI solutions! 💡`;
        }
        // Generic fallback for personal questions
        else if (query.includes('who') || query.includes('about')) {
            return `Vimalraj is an aspiring ML Engineer 🧠 with a passion for AI innovation. He combines technical expertise with creative problem-solving to build intelligent solutions that make a difference. Want to know about his projects or skills? 🚀`;
        }
        // Very generic fallback
        else {
            return `I'm Vimalraj's AI assistant. He's an ML Engineer with expertise in PyTorch, OpenCV, and deep learning. How can I help you learn more about his skills or projects? 👋 Feel free to ask about his education 🎓, projects 💻, or certifications 🏆!`;
        }
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize chatbot
    const chatbot = new EnhancedChatbot();
});

// Social Planet Animations
function initSocialPlanets() {
    const socialPlanets = document.querySelectorAll('.social-planet');
    
    // Make sure planets are visible with proper icons
    socialPlanets.forEach(planet => {
        // Ensure planet body is visible
        const planetBody = planet.querySelector('.planet-body');
        const planetIcon = planet.querySelector('.planet-icon');
        const planetRing = planet.querySelector('.planet-ring');
        
        if (planetBody) {
            planetBody.style.background = 'linear-gradient(145deg, #1d1d30, #2a2a45)';
            planetBody.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.4)';
        }
        
        if (planetIcon) {
            planetIcon.style.fontSize = '2.2rem';
            planetIcon.style.color = '#fff';
            planetIcon.style.textShadow = '0 0 10px rgba(255, 1, 79, 0.5)';
        }
        
        if (planetRing) {
            planetRing.style.border = '3px solid rgba(255, 1, 79, 0.15)';
        }
    });
    
    // Animation for planets
    socialPlanets.forEach((planet, index) => {
        // Staggered animation on initial load
        if (typeof gsap !== 'undefined') {
            gsap.from(planet, {
                y: 30,
                opacity: 0,
                delay: 0.1 * index,
                duration: 0.8,
                ease: "back.out(1.7)"
                    });
                } else {
            // Fallback animation
            planet.style.opacity = "0";
            planet.style.transform = "translateY(30px)";
                    setTimeout(() => {
                planet.style.transition = "all 0.8s";
                planet.style.opacity = "1";
                planet.style.transform = "translateY(0)";
            }, 100 * index);
        }
        
        // Random rotation speeds for planet rings
        const planetRing = planet.querySelector('.planet-ring');
        if (planetRing) {
            const randomDuration = 10 + Math.random() * 20;
            if (typeof gsap !== 'undefined') {
                gsap.to(planetRing, {
                    rotation: 360,
                    duration: randomDuration,
                    repeat: -1,
                    ease: "none"
                });
            } else {
                planetRing.style.animation = `rotate ${randomDuration}s linear infinite`;
                }
            }
        });
}

// Enhanced skill cards animations
function enhanceSkillsSection() {
    // Add tilt effect to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (isMobile) return; // Skip on mobile
            
            const cardRect = card.getBoundingClientRect();
            const cardX = cardRect.left + cardRect.width / 2;
            const cardY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const angleX = (mouseY - cardY) / 30;
            const angleY = (cardX - mouseX) / 30;
            
            const inner = card.querySelector('.skill-card-inner');
            if (!inner.style.transform.includes('rotateY(180deg)')) {
                inner.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const inner = card.querySelector('.skill-card-inner');
            if (!inner.style.transform.includes('rotateY(180deg)')) {
                inner.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            }
        });
    });
    
    // Improve category button interaction
    const categoryBtns = document.querySelectorAll('.skills-category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if (hasGSAP && !btn.classList.contains('active')) {
                gsap.to(btn, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            if (hasGSAP && !btn.classList.contains('active')) {
                gsap.to(btn, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    });
}

// Skills Section Tab Functionality
function initSkillsTabs() {
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            skillTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all skill categories
            skillCategories.forEach(category => {
                category.classList.remove('active');
            });
            
            // Show the corresponding category
            const categoryToShow = document.querySelector(`.skill-category[data-category="${tab.dataset.category}"]`);
            if (categoryToShow) {
                categoryToShow.classList.add('active');
                
                // Animate skill items
                animateSkillItems(categoryToShow);
            }
        });
    });
}

function animateSkillItems(container) {
    const skillItems = container.querySelectorAll('.skill-item');
    
    // Use GSAP if available, otherwise use basic animation
    if (typeof gsap !== 'undefined') {
        gsap.fromTo(skillItems, 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
        );
    } else {
        // Basic CSS animation fallback
        skillItems.forEach((item, index) => {
            item.style.opacity = "0";
            item.style.transform = "translateY(20px)";
            
            setTimeout(() => {
                item.style.transition = "all 0.4s ease";
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
            }, 100 * index);
        });
    }
}

// Skill Dots Animation
function animateSkillDots() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const animateDots = (progress, dots) => {
        const progressPercent = parseFloat(progress.style.width);
        const dotLevel = 100 / dots.length;
        
        dots.forEach(dot => {
            const level = parseInt(dot.dataset.level);
            if (progressPercent >= level) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };
    
    // Set up Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItem = entry.target;
                const progress = skillItem.querySelector('.skill-progress');
                const dots = skillItem.querySelectorAll('.skill-dot');
                
                setTimeout(() => {
                    animateDots(progress, dots);
                }, 300);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe each skill item
    skillItems.forEach(item => {
        observer.observe(item);
    });
}

// Remove 3D effect from About section
function removeAbout3DEffect() {
    const aboutCard = document.querySelector('.about-3d-card');
    const aboutContainer = document.querySelector('.about-perspective-container');
    const aboutFront = document.querySelector('.about-card-front');
    
    if (aboutCard) {
        // Remove all 3D effects
        aboutCard.style.transform = 'none';
        aboutCard.style.transformStyle = 'flat';
        aboutCard.style.perspective = 'none';
        aboutCard.style.transition = 'none';
        
        // Remove any hover effects
        aboutCard.onmousemove = null;
        aboutCard.onmouseleave = null;
        
        // Remove any inline transform styles that might be added by JS
        const resetTransform = () => {
            aboutFront.style.transform = 'none';
        };
        
        // Set initial and prevent future transforms
        resetTransform();
        aboutFront.addEventListener('mouseover', resetTransform);
        aboutFront.addEventListener('mousemove', resetTransform);
        
        // Remove any parent 3D perspective
        if (aboutContainer) {
            aboutContainer.style.perspective = 'none';
        }
    }
}

// Custom Nav Icons
function updateNavIcons() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Update icons with more unique ones
    const iconMap = {
        'home': 'fas fa-rocket',
        'about': 'fas fa-user-astronaut',
        'projects': 'fas fa-project-diagram',
        'skills': 'fas fa-brain',
        'experience': 'fas fa-briefcase',
        'education': 'fas fa-graduation-cap',
        'contact': 'fas fa-satellite-dish'
    };
    
    navLinks.forEach(link => {
        const section = link.getAttribute('href').substring(1);
        const iconElement = link.querySelector('i');
        
        if (iconElement && iconMap[section]) {
            // Replace class maintaining any non-icon classes
            const currentClasses = iconElement.className.split(' ').filter(cls => !cls.startsWith('fa-'));
            iconElement.className = [...currentClasses, iconMap[section]].join(' ');
        }
    });
    
    // Also update dock navigation if it exists
    const dockItems = document.querySelectorAll('.dock-item');
    dockItems.forEach(item => {
        const section = item.getAttribute('data-section');
        if (section && iconMap[section]) {
            const iconClass = iconMap[section].split(' ')[1]; // Extract the fa-xxx part
            
            // Look for an SVG to replace
            const svg = item.querySelector('svg');
            if (svg) {
                // Create a new icon element
                const icon = document.createElement('i');
                icon.className = iconMap[section];
                icon.style.fontSize = '1.5rem';
                
                // Replace SVG with the icon
                svg.replaceWith(icon);
            }
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize skills tabs
    initSkillsTabs();
    
    // Animate skill dots with a slight delay to ensure elements are rendered
    setTimeout(() => {
        animateSkillDots();
    }, 500);
    
    // Make sure 3D effect is completely removed from About section
    removeAbout3DEffect();
    
    // Additional failsafe to remove any 3D effect after page load
    setTimeout(() => {
        removeAbout3DEffect();
    }, 1000);
    
    // Initialize active category for skills
    const firstSkillTab = document.querySelector('.skill-tab');
    if (firstSkillTab) {
        firstSkillTab.click();
    }
    
    // Initialize social planets with enhanced visibility
    initSocialPlanets();
    
    // Ensure social planets are visible even if animation fails
    const ensureSocialPlanetsVisible = () => {
        const socialPlanets = document.querySelectorAll('.social-planet');
        socialPlanets.forEach(planet => {
            planet.style.opacity = "1";
        });
        
        // Make sure icons are visible
        const planetIcons = document.querySelectorAll('.planet-icon i');
        planetIcons.forEach(icon => {
            icon.style.fontSize = "2.5rem";
            icon.style.color = "white";
            icon.style.textShadow = "0 0 10px rgba(255, 1, 79, 0.6)";
        });
    };
    
    // Run visibility check after a delay
    setTimeout(ensureSocialPlanetsVisible, 1500);
    
    // Update navigation icons
    updateNavIcons();
});

// Image Modal Functions
function openImageModal(imageId) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    // Map image IDs to actual image paths
    const imageMap = {
        'cert1': 'assets/images/certificates/nptel-cert.jpg',
        'cert2': 'assets/images/certificates/linguaskill-cert.jpg',
        'certnvidia1': 'certificates/nvidiac1.jpg',
        'cert3': 'certificates/VIMALRAJ D - Computer Vision.png',
        'ach1': 'assets/images/achievements/hackathon-trophy.jpg',
        'ach2': 'assets/images/achievements/research-paper.jpg',
        'ach3': 'assets/images/achievements/kaggle-medal.jpg'
    };
    
    // Set the image source
    modalImg.src = imageMap[imageId] || '';
    
    // Show the modal with animation
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    
    // Hide the modal with animation
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    
    // Restore body scrolling
    document.body.style.overflow = '';
}

// Close modal when clicking outside the image
document.getElementById('imageModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeImageModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeImageModal();
    }
});

// Add this new function for Email.js setup
function initializeEmailJS() {
    // Check if EmailJS is already defined
    if (typeof emailjs !== 'undefined') {
        console.log("EmailJS already loaded");
        // Set up the contact form
        setupContactForm();
        return;
    }
    
    console.log("Loading EmailJS...");
    // Load EmailJS script dynamically if not already loaded
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.async = true;
    
    script.onload = function() {
        console.log("EmailJS loaded successfully");
        // Initialize EmailJS with your public key
        try {
            emailjs.init({
                publicKey: "sMIDUfJYW9jmIlrJD"
            });
            console.log("EmailJS initialized");
            // Set up the contact form
            setupContactForm();
        } catch (error) {
            console.error("Error initializing EmailJS:", error);
        }
    };
    
    script.onerror = function() {
        console.error("Failed to load EmailJS script");
    };
    
    document.head.appendChild(script);
}

// Contact Form Submission
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const formModal = document.getElementById('form-modal');
    const modalClose = document.getElementById('modal-close');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log("Form submission started...");
            
            // Show loading message
            formMessage.textContent = "Sending message...";
            formMessage.style.color = "var(--color-text-muted)";
            
            // Prepare template parameters for EmailJS
            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                to_name: "Vimalraj D",
                to_email: "vimalrajnov172005@gmail.com"
            };
            
            console.log("Sending email with parameters:", JSON.stringify(templateParams));
            
            if (typeof emailjs === 'undefined') {
                console.error("EmailJS is not defined! Make sure EmailJS is properly loaded.");
                formMessage.textContent = "Error: Email service not available. Please try again later.";
                formMessage.style.color = "red";
                return;
            }
            
            // Using EmailJS to send email
            emailjs.send('service_i1edc0e', 'template_fk8djia', templateParams)
                .then(function(response) {
                    console.log("Email sent successfully!", response);
                    // Reset form
                    contactForm.reset();
                    
                    // Show success message
                    formMessage.textContent = "Message sent successfully!";
                    formMessage.style.color = "var(--color-primary)";
                    
                    // Show success modal
                    if (formModal) {
                        formModal.style.display = "flex";
                    }
                })
                .catch(function(error) {
                    console.error("Email sending failed!", error);
                    formMessage.textContent = "Failed to send message: " + (error.text || "Unknown error");
                    formMessage.style.color = "red";
                });
        });
    } else {
        console.error("Contact form not found in the DOM");
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            if (formModal) {
                if (typeof gsap !== 'undefined') {
                    gsap.to(formModal.querySelector('.modal-content'), {
                        scale: 0,
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.in',
                        onComplete: () => {
                            formModal.style.display = 'none';
                        }
                    });
                } else {
                    const modalContent = formModal.querySelector('.modal-content');
                    modalContent.style.opacity = "0";
                    modalContent.style.transform = "scale(0)";
                    setTimeout(() => {
                        formModal.style.display = 'none';
                    }, 300);
                }
            }
        });
    }
}

// Replace the old sendEmail function with this simplified version
function sendEmail(params) {
    return emailjs.send('service_i1edc0e', 'template_fk8djia', params);
}

