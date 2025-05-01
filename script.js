document.addEventListener('DOMContentLoaded', function() {
    // Check if GSAP is available, if not, provide fallback animations
    const hasGSAP = typeof gsap !== 'undefined';
    console.log("GSAP available:", hasGSAP);

    // Tab switching functionality - fundamental navigation
    document.querySelectorAll('.about-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            console.log("Tab clicked:", tab.getAttribute('data-tab'));
            
            // Remove active class from all tabs and content sections
            document.querySelectorAll('.about-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.content-section').forEach(s => {
                s.classList.remove('active');
                s.style.display = 'none';
            });
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content section
            const tabId = tab.getAttribute('data-tab');
            const contentSection = document.querySelector(`.content-section[data-tab="${tabId}"]`);
            if (contentSection) {
                contentSection.style.display = 'block';
                setTimeout(() => {
                    contentSection.classList.add('active');
                    
                    // Animate skill bars if craft tab is selected
                    if(tabId === 'craft') {
                        document.querySelectorAll('.skill-level-bar').forEach(bar => {
                            bar.style.transform = 'scaleX(1)';
                        });
                    }
                }, 50);
            } else {
                console.error("Content section not found for tab:", tabId);
            }
        });
    });

    // Initialize by showing the first tab content
    const firstTab = document.querySelector('.about-tab');
    if (firstTab) {
        const firstTabId = firstTab.getAttribute('data-tab');
        const firstSection = document.querySelector(`.content-section[data-tab="${firstTabId}"]`);
        if (firstSection) {
            firstSection.style.display = 'block';
            firstSection.classList.add('active');
        }
        firstTab.classList.add('active');
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
            console.log("Form submitted");
            
            // Simulate form submission
            setTimeout(() => {
                if (formModal) {
                    formModal.style.display = 'flex';
                    
                    if (hasGSAP) {
                        gsap.from(formModal.querySelector('.modal-content'), {
                            scale: 0.8,
                            opacity: 0,
                            duration: 0.5,
                            ease: 'back.out(1.7)'
                        });
                    } else {
                        const modalContent = formModal.querySelector('.modal-content');
                        modalContent.style.opacity = "0";
                        modalContent.style.transform = "scale(0.8)";
                        modalContent.style.transition = "opacity 0.5s, transform 0.5s";
                        
                        setTimeout(() => {
                            modalContent.style.opacity = "1";
                            modalContent.style.transform = "scale(1)";
                        }, 10);
                    }
                }
                contactForm.reset();
            }, 1000);
        });
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            if (formModal) {
                if (hasGSAP) {
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

// Enhanced chatbot functionality
function initChatbot() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotPanel = document.getElementById('chatbot-panel');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSubmit = document.getElementById('chatbot-submit');
    const chatbotBody = document.getElementById('chatbot-body');
    const quickReplies = document.querySelectorAll('.quick-reply');

    // Together API key - replace with your actual API key
    const TOGETHER_API_KEY = "YOUR_TOGETHER_API_KEY"; // Replace with your key
    
    // User context information for better responses
    const userContext = `
    VIMALRAJ D SUMMARY: Motivated Machine Learning Engineer with experience in developing and deploying ML and Deep Learning models using PyTorch, OpenCV, and Scikit-Learn. Skilled in Python, NLP, RCNN, and RNN, with model deployment experience using Streamlit and Flask. Strong problem-solving skills and a commitment to continuous learning.

    EDUCATION: Bachelor of Engineering in Computer Science and Engineering (AI & ML) at Dr.Mahalingham College of Engineering and Technology, Coimbatore (2023-2027)

    TECHNICAL SKILLS:
    - Machine Learning: Classification, Regression, Clustering, Model Deployment
    - Deep Learning: CNN, RCNN, RNN, Object Detection, YOLO, Image Classification, NLP
    - Programming Languages: Python, C, Java
    - Libraries/Frameworks: PyTorch, Scikit-Learn, OpenCV, nltk, Transformers, Hugging Face
    - Web Development: Flask (Backend), HTML, CSS (Frontend)
    - Model Deployment: Streamlit
    - Tools: Jupyter Notebook, VS Code, Git

    CERTIFICATIONS:
    - NPTEL Certification: Introduction to Programming in C (Elite + Silver)
    - Linguaskill Communication Skills Certification: B1 Level
    - Machine Learning Internship Certificate: Unified Mentor

    PROJECTS:
    1. Book Recommendation System: Built a ML model to recommend books based on user preferences. Deployed using Flask.
    2. Face Detection Using OpenCV: Developed real-time face detection system capable of identifying multiple faces.
    3. Image Text Extraction: Created program to extract and display text from images using OCR and Tesseract.

    WORK EXPERIENCE:
    - Machine Learning Intern at CuneAi Solutions (Feb 2025 - present)

    ADDITIONAL INFORMATION:
    - Leadership: Led teams in various college projects and competitions
    - Problem-Solving: Passionate about finding solutions to complex challenges
    - Extracurricular: Active participation in college events and hackathons
    - Contact: 
      E-Mail:vimalrajnov172005@gmail.com,
      LinkedIn:https://www.linkedin.com/in/vimalraj-d-8278972a5,
      Github:https://github.com/Vimalraj-D
    `;

    // Chat history for context in API requests
    let chatHistory = [];
    const MAX_HISTORY_LENGTH = 6; // Keep track of last 6 messages (3 exchanges)

    // Prevent chatbot popup from showing when chatbot is active
    let isChatbotActive = false;

    // Toggle chatbot panel
    chatbotToggle.addEventListener('click', () => {
        if (chatbotPanel.classList.contains('active')) {
            closeChatbot();
        } else {
            openChatbot();
        }
    });

    // Close chatbot
    chatbotClose.addEventListener('click', closeChatbot);

    // Open chatbot with animation
    function openChatbot() {
        isChatbotActive = true;
        chatbotPanel.classList.add('active');
        chatbotToggle.classList.add('active');
        
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(chatbotPanel, 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
            );
        } else {
            chatbotPanel.style.transition = "opacity 0.4s, transform 0.4s";
            chatbotPanel.style.opacity = "1";
            chatbotPanel.style.transform = "translateY(0)";
        }
        
        setTimeout(() => chatbotInput.focus(), 400);
        
        // Show welcome message if this is the first time opening
        if (chatbotBody.children.length === 1) {
            addMessageToChat('bot', "Hello! I'm Vimalraj's AI assistant. Feel free to ask about his skills, projects, or experience in AI and machine learning. How can I help you today?");
        }
    }

    // Close chatbot with animation
    function closeChatbot() {
        if (typeof gsap !== 'undefined') {
            gsap.to(chatbotPanel, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    chatbotPanel.classList.remove('active');
                    chatbotToggle.classList.remove('active');
                    isChatbotActive = false;
                }
            });
        } else {
            chatbotPanel.style.opacity = "0";
            chatbotPanel.style.transform = "translateY(20px)";
            
            setTimeout(() => {
                chatbotPanel.classList.remove('active');
                chatbotToggle.classList.remove('active');
                isChatbotActive = false;
            }, 300);
        }
    }

    // Send message
    chatbotSubmit.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (!message) return;

        addMessageToChat('user', message);
        chatbotInput.value = '';
        chatbotInput.focus(); // Retain focus on input after sending
        
        // Update chat history
        chatHistory.push({ role: "user", message: message });
        if (chatHistory.length > MAX_HISTORY_LENGTH) {
            chatHistory.shift();
        }
        
        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('chatbot-message', 'bot', 'typing-indicator');
        typingIndicator.innerHTML = '<span>.</span><span>.</span><span>.</span>';
        chatbotBody.appendChild(typingIndicator);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
        
        // Call API for response or use fallback
        if (TOGETHER_API_KEY !== "YOUR_TOGETHER_API_KEY") {
            getApiResponse(message)
                .then(response => {
                    // Remove typing indicator
                    if (typingIndicator.parentNode) {
                        chatbotBody.removeChild(typingIndicator);
                    }
                    
                    // Add bot response
                    addMessageToChat('bot', response);
                    
                    // Update chat history
                    chatHistory.push({ role: "assistant", message: response });
                    if (chatHistory.length > MAX_HISTORY_LENGTH) {
                        chatHistory.shift();
                    }
                })
                .catch(error => {
                    // Remove typing indicator
                    if (typingIndicator.parentNode) {
                        chatbotBody.removeChild(typingIndicator);
                    }
                    // Add error message
                    addMessageToChat('bot', "Sorry, I couldn't process your request. Please try again later.");
                    console.error('API Error:', error);
                });
        } else {
            // Use fallback responses
            setTimeout(() => {
                // Remove typing indicator
                if (typingIndicator.parentNode) {
                    chatbotBody.removeChild(typingIndicator);
                }
                
                // Add fallback bot response
                const response = getFallbackResponse(message);
                addMessageToChat('bot', response);
                
                // Update chat history
                chatHistory.push({ role: "assistant", message: response });
                if (chatHistory.length > MAX_HISTORY_LENGTH) {
                    chatHistory.shift();
                }
            }, 1000);
        }
    }

    // Add message to chat with improved animation
    function addMessageToChat(type, content) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chatbot-message', type);
        
        // Format response with proper paragraphs instead of basic text
        content = content.replace(/\n\n/g, '<br><br>');
        content = content.replace(/\n/g, '<br>');
        
        messageDiv.innerHTML = content;

        chatbotBody.appendChild(messageDiv);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;

        if (typeof gsap !== 'undefined') {
            gsap.fromTo(messageDiv, 
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
            );
        } else {
            messageDiv.style.opacity = "0";
            messageDiv.style.transform = "translateY(10px)";
            messageDiv.style.transition = "opacity 0.3s, transform 0.3s";
            
            setTimeout(() => {
                messageDiv.style.opacity = "1";
                messageDiv.style.transform = "translateY(0)";
            }, 10);
        }
    }

    // Get response from Together API
    async function getApiResponse(userMessage) {
        try {
            // Prepare conversation history for context
            let conversationContext = "";
            if (chatHistory.length > 0) {
                conversationContext = "Recent conversation history:\n";
                chatHistory.forEach(entry => {
                    conversationContext += `${entry.role === "user" ? "User" : "Assistant"}: ${entry.message}\n`;
                });
                conversationContext += "\n";
            }
            
            const response = await fetch('https://api.together.xyz/v1/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${TOGETHER_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
                    prompt: `You are Vimalraj's personal AI assistant on his portfolio website, designed to provide detailed information about Vimalraj, his skills, projects, and related AI topics. You should respond in a conversational, helpful manner.
                    
Here is information about Vimalraj:
${userContext}

IMPORTANT INSTRUCTIONS:
1. Provide detailed, conversational responses instead of just listing items
2. When discussing projects or skills, explain them with context rather than simply listing them
3. Respond with natural paragraphs, not bullet points or lists
4. Be friendly and personable, like a knowledgeable colleague
5. Provide specific details from the context when relevant
6. Keep responses concise but informative (1-2 paragraphs is ideal)

${conversationContext}
User question: ${userMessage}
Assistant:`,
                    max_tokens: 500,
                    temperature: 0.7,
                    top_p: 0.9,
                    stop: ["User question:", "\n\nUser:"]
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0].text.trim();
        } catch (error) {
            console.error('Error calling Together API:', error);
            return getFallbackResponse(userMessage);
        }
    }

    // Enhanced fallback responses if API fails
    function getFallbackResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
            return "Vimalraj has worked on several innovative projects that showcase his ML expertise. His Book Recommendation System uses collaborative filtering to suggest books based on user preferences, and was deployed using Flask for easy access. His Face Detection system leverages OpenCV to identify multiple faces in real-time, while his Image Text Extraction project uses OCR and Tesseract to pull text from images for further processing. Which project would you like to hear more about?";
        } else if (lowerMessage.includes('skill') || lowerMessage.includes('expertise')) {
            return "Vimalraj has developed a strong skill set in AI and machine learning. He's proficient in Python programming and has hands-on experience with frameworks like PyTorch for deep learning models. He's worked extensively with computer vision libraries like OpenCV, and has implemented various neural network architectures including CNNs, RCNNs, and RNNs. His deployment skills with Streamlit and Flask allow him to create accessible ML applications. What specific skill area are you interested in learning more about?";
        } else if (lowerMessage.includes('education') || lowerMessage.includes('study')) {
            return "Vimalraj is currently pursuing his Bachelor of Engineering in Computer Science and Engineering with a specialization in AI & ML at Dr. Mahalingham College of Engineering and Technology in Coimbatore (2023-2027). Throughout his academic journey, he's been focused on applying classroom knowledge to practical projects and continuously expanding his expertise through certifications and hands-on work.";
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('email')) {
            return "You can reach out to Vimalraj through his email at vimalrajnov172005@gmail.com. He's also active on LinkedIn at https://www.linkedin.com/in/vimalraj-d-8278972a5 and shares his code projects on GitHub at https://github.com/Vimalraj-D. He's always open to discussing potential collaborations or answering questions about his work.";
        } else if (lowerMessage.includes('certification') || lowerMessage.includes('certificate')) {
            return "Vimalraj has earned several valuable certifications that complement his formal education. He holds an NPTEL Certification in Introduction to Programming in C with Elite + Silver distinction, demonstrating his programming fundamentals. His Linguaskill Communication Skills Certification at B1 Level showcases his professional communication abilities. He also completed a Machine Learning Internship Certificate from Unified Mentor, where he gained practical industry experience implementing ML solutions.";
        } else if (lowerMessage.includes('experience') || lowerMessage.includes('intern')) {
            return "Vimalraj is currently working as a Machine Learning Intern at CuneAi Solutions since February 2025. In this role, he's gaining valuable industry experience implementing ML models and working on real-world AI challenges. This practical experience complements his academic knowledge and personal projects, helping him develop a well-rounded skill set in the field of artificial intelligence and machine learning.";
        } else if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence') || lowerMessage.includes('machine learning')) {
            return "Vimalraj is deeply passionate about AI and machine learning. He's been focusing on practical applications of ML algorithms, particularly in computer vision and NLP. Through his coursework and projects, he's developed expertise in implementing neural networks like CNNs for image processing tasks and RNNs for sequence data. He stays current with the latest AI research and is particularly interested in how these technologies can be applied to solve real-world challenges across industries.";
        } else if (lowerMessage.includes('hobby') || lowerMessage.includes('interest') || lowerMessage.includes('passion')) {
            return "Beyond his technical work, Vimalraj has diverse interests that complement his AI expertise. He's passionate about exploring how AI can be applied across different domains, from healthcare to entertainment. He enjoys participating in ML competitions to sharpen his skills, and he's an active member of online AI communities where he both learns from and contributes to discussions. In his free time, he enjoys keeping up with the latest AI research papers and experimenting with new algorithms.";
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('greetings')) {
            return "Hello! I'm Vimalraj's AI assistant. I'd be happy to tell you about his skills, projects, education, or anything else you'd like to know about his work in AI and machine learning. How can I assist you today?";
        } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks') || lowerMessage.includes('appreciate')) {
            return "You're welcome! I'm glad I could help. If you have any other questions about Vimalraj's work, skills, or background, feel free to ask. I'm here to provide information about his portfolio and expertise in AI and machine learning.";
        } else {
            return "I'm here to provide detailed information about Vimalraj's AI experience, projects, skills, and background. Whether you're interested in his technical expertise, educational journey, or specific projects he's worked on, I'm happy to share insights about his work in machine learning and AI. Is there something specific you'd like to know about his portfolio or expertise?";
        }
    }

    // Quick reply clicks with enhanced animation
    quickReplies.forEach(reply => {
        reply.addEventListener('click', () => {
            const query = reply.getAttribute('data-query');
            if (query) {
                if (typeof gsap !== 'undefined') {
                    gsap.to(reply, {
                        scale: 1.1,
                        duration: 0.1,
                        yoyo: true,
                        repeat: 1,
                        onComplete: () => {
                            chatbotInput.value = query;
                            sendMessage();
                        }
                    });
                } else {
                    reply.style.transform = "scale(1.1)";
                    setTimeout(() => {
                        reply.style.transform = "scale(1)";
                        setTimeout(() => {
                            chatbotInput.value = query;
                            sendMessage();
                        }, 100);
                    }, 100);
                }
            }
        });
    });

    // Add CSS for typing indicator and message formatting
    const style = document.createElement('style');
    style.textContent = `
        .typing-indicator {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 25px;
            padding: 5px 12px;
        }
        .typing-indicator span {
            height: 6px;
            width: 6px;
            background: var(--color-text);
            border-radius: 50%;
            margin: 0 3px;
            display: inline-block;
            animation: bounce 1.5s infinite ease-in-out;
        }
        .typing-indicator span:nth-child(2) {
            animation-delay: 0.2s;
        }
        .typing-indicator span:nth-child(3) {
            animation-delay: 0.4s;
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
        }
        
        .chatbot-message {
            line-height: 1.5;
            white-space: pre-wrap;
        }
        
        .chatbot-message a {
            color: var(--color-primary);
            text-decoration: underline;
        }
        
        #chatbot-toggle.active .chatbot-popup {
            display: none;
        }
    `;
    document.head.appendChild(style);
}
