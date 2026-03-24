document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isFlex = navLinks.style.display === 'flex';
            navLinks.style.display = isFlex ? 'none' : 'flex';
            if (!isFlex) {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.right = '20px';
                navLinks.style.background = 'var(--bg-color)';
                navLinks.style.padding = '20px';
                navLinks.style.border = '1px solid var(--border-color)';
                navLinks.style.zIndex = '100';
            }
            hamburger.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                if (window.innerWidth <= 768 && navLinks && navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                }
                
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Entrance animations using Intersection Observer
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section, .hero-content, .hero-image-container').forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });

    // Custom Cursor with Glowing Purple Trail
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    cursor.style.opacity = '0';
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    cursorDot.style.opacity = '0';
    document.body.appendChild(cursorDot);

    let mouseX = -100, mouseY = -100;
    let cursorX = -100, cursorY = -100;
    let isMoving = false;

    document.addEventListener('mousemove', (e) => {
        if (!isMoving) {
            isMoving = true;
            document.documentElement.classList.add('no-cursor');
            cursor.style.opacity = '1';
            cursorDot.style.opacity = '1';
        }
        
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Smooth follow for outer ring
    function animateCursor() {
        if (isMoving) {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Interactive hover effects on links and buttons
    document.querySelectorAll('a, button, .btn, input, textarea, select').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (isMoving) {
                cursor.classList.add('cursor-hover');
                cursorDot.classList.add('cursor-hover');
            }
        });
        el.addEventListener('mouseleave', () => {
            if (isMoving) {
                cursor.classList.remove('cursor-hover');
                cursorDot.classList.remove('cursor-hover');
            }
        });
    });
});
