document.addEventListener('DOMContentLoaded', function() {
    console.log('FitLife website loaded successfully');
   
    initializeNavigation();
    initializeScrollAnimations();
    checkCookieConsent();
});


function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
           
            this.classList.add('active');
        });
    });
   
    const currentLocation = location.pathname;
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active');
        }
    });
}


function initializeScrollAnimations() {

    const cards = document.querySelectorAll('.feature-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
   
    // Create intersection observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.animation = 'slideInUp 0.6s ease forwards';

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
   
    cards.forEach(card => observer.observe(card));
}



function checkCookieConsent() {
    const cookieConsent = localStorage.getItem('cookieConsent');
   
    if (!cookieConsent) {
        showCookieBanner();
    }
}



function showCookieBanner() {
    if (document.getElementById('cookieBanner')) {
        return;
    }
   
    const banner = document.createElement('div');
    banner.id = 'cookieBanner';
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <div class="cookie-content">
            <p>We use cookies to improve your experience. By using FitLife, you accept our use of cookies.</p>
            <div class="cookie-buttons">
                <button onclick="acceptCookies()" class="btn btn-primary">Accept All</button>
                <button onclick="rejectCookies()" class="btn btn-secondary">Reject Cookies</button>
            </div>
        </div>
    `;
   
    const style = document.createElement('style');
    style.textContent = `
        .cookie-banner {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #004e89;
            color: white;
            padding: 1.5rem;
            z-index: 9999;
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        }
       
        .cookie-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 2rem;
        }
       
        .cookie-content p {
            margin: 0;
            flex: 1;
            color: white;
        }
       
        .cookie-buttons {
            display: flex;
            gap: 1rem;
            white-space: nowrap;
        }
       
        @media (max-width: 768px) {
            .cookie-content {
                flex-direction: column;
                gap: 1rem;
            }
           
            .cookie-buttons {
                width: 100%;
            }
           
            .cookie-buttons button,
            .cookie-buttons a {
                flex: 1;
            }
        }
    `;
    document.head.appendChild(style);
   

    document.body.appendChild(banner);
}


function acceptCookies() {
    localStorage.setItem('cookieConsent', JSON.stringify({
        accepted: true
    }));
   
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.remove();
    }
   
    console.log('Cookies accepted');
}

function showAlert(message, type = 'info') {

    console.log(`[${type.toUpperCase()}] ${message}`);
   
    if (type === 'error') {
        alert(`Error: ${message}`);
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function logActivity(action, details = {}) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${action}`, details);
   
}


document.addEventListener('click', function(e) {

    if (e.target.closest('.logo')) {
        // Scroll to top smoothly when logo is clicked. 
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});
// getElementById('loginBtn').addEventListener('click', function() {onclick='auth.html'
// });

// cookie Reject function
function rejectCookies() {
    localStorage.setItem('cookieConsent', JSON.stringify({
        accepted: false
    }));    
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.remove();
    }   
    console.log('Cookies rejected');
}


console.log('%cWelcome to FitLife! 💪', 'font-size: 20px; color: #87ceeb; font-weight: bold;');
console.log('%cYour complete fitness and wellness platform', 'font-size: 14px; color: #004e89;');
