document.addEventListener("DOMContentLoaded", function () {
    const texts = [
        "Architect of Intelligence",
        "Machine Learning Engineer",
        "Deep Learning Maverick",
        "AI Visionary"
    ];
    
    let index = 0; // Tracks the current text
    let charIndex = 0; // Tracks the current character
    const typingSpeed = 60;  // Speed of typing
    const eraseSpeed = 20;   // Speed of erasing
    const delayBetweenTexts = 1000; // Delay before erasing starts
    const typingElement = document.getElementById("typing-text");

    function type() {
        if (charIndex < texts[index].length) {
            typingElement.innerHTML += texts[index].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, delayBetweenTexts);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typingElement.innerHTML = texts[index].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, eraseSpeed);
        } else {
            index = (index + 1) % texts.length; // Move to the next text
            setTimeout(type, typingSpeed);
        }
    }

    // Start the typing animation immediately
    type();
});

  /* JavaScript to initialize skill bars with animation */
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
      document.querySelectorAll('.skill-bar').forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = level + '%';
      });
    }, 300);
  });

        // Add neural nodes animation
        document.querySelectorAll('.neural-nodes').forEach(container => {
            for (let i = 0; i < 10; i++) {
                const node = document.createElement('div');
                node.className = 'neural-node';
                node.style.left = `${Math.random() * 100}%`;
                node.style.top = `${Math.random() * 100}%`;
                node.style.animationDelay = `${Math.random() * 3}s`;
                container.appendChild(node);
            }
        });

        // Project filtering functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projects = document.querySelectorAll('.project-item');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                projects.forEach(project => {
                    const techStack = project.getAttribute('data-tech');
                    
                    if (filter === 'all') {
                        project.style.display = 'block';
                        setTimeout(() => {
                            project.style.opacity = '1';
                            project.style.transform = 'translateY(0)';
                        }, 10);
                    } else if (filter === 'ML' && techStack.includes('Scikit-Learn')) {
                        project.style.display = 'block';
                        setTimeout(() => {
                            project.style.opacity = '1';
                            project.style.transform = 'translateY(0)';
                        }, 10);
                    } else if (filter === 'CV' && (techStack.includes('OpenCV') || techStack.includes('YOLO'))) {
                        project.style.display = 'block';
                        setTimeout(() => {
                            project.style.opacity = '1';
                            project.style.transform = 'translateY(0)';
                        }, 10);
                    } else if (filter === 'NLP' && techStack.includes('OCR')) {
                        project.style.display = 'block';
                        setTimeout(() => {
                            project.style.opacity = '1';
                            project.style.transform = 'translateY(0)';
                        }, 10);
                    } else if (filter === 'Deployed' && (techStack.includes('Flask') || techStack.includes('Streamlit'))) {
                        project.style.display = 'block';
                        setTimeout(() => {
                            project.style.opacity = '1';
                            project.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        project.style.opacity = '0';
                        project.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            project.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Add 3D effect on mouse move
        projects.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const angleY = (x - centerX) / 20;
                const angleX = (centerY - y) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });

        // Create neural network nodes animation
        document.addEventListener('DOMContentLoaded', () => {
            const container = document.getElementById('neural-animation');
            const numNodes = 15;
            
            for (let i = 0; i < numNodes; i++) {
                const node = document.createElement('div');
                node.classList.add('node');
                
                // Random positions
                const left = Math.random() * 100;
                const top = Math.random() * 100;
                
                node.style.left = `${left}%`;
                node.style.top = `${top}%`;
                
                // Random animation delay
                const delay = Math.random() * 5;
                node.style.animation = `pulse 3s ease-in-out ${delay}s infinite`;
                
                container.appendChild(node);
            }
            
            // Add hover effects to experience cards
            const cards = document.querySelectorAll('.experience-card');
            cards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-10px)';
                    card.style.boxShadow = 'var(--glow-effect)';
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0)';
                    card.style.boxShadow = 'var(--shadow-primary)';
                });
            });
        });