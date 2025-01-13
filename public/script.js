// Animations on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    const promotionForm = document.getElementById('promotionForm');
    if (promotionForm) {
        promotionForm.addEventListener('submit', handleSubmit);
    }
});


// استخدام fetch
        const nameProject = document.getElementById('nameProject');
        const typeProject = document.getElementById('typeProject');
        const userName = document.getElementById('userName');
        const userPhone = document.getElementById('userPhone');
        const createData = async()=>{
            const numberPhone = '0621820506'
            try {
                const response = await fetch('http://localhost:3000/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        namProject: nameProject.value,
                        TypeProject: typeProject.value,
                        userName: userName.value,
                        userPhone: userPhone.value,
                    }),s
                });
                const data = await response.json();
                alert(data.message);
            } catch (error) {
                console.error(error);
            }
        }

// معالجة تقديم النموذج
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('.submit-button');
    
    // إظهار حالة التحميل
    submitButton.classList.add('submitting');
    
    // محاكاة إرسال البيانات
    setTimeout(() => {
        // إخفاء حالة التحميل
        submitButton.classList.remove('submitting');
        
        // إظهار رسالة النجاح
        showSuccess();
        
        // إعادة تعيين النموذج
    }, 2000);
    createData();
}

// التحقق من صحة رقم الهاتف
function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
}

// إظهار رسالة خطأ
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const form = document.getElementById('promotionForm');
    form.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// إظهار رسالة النجاح
function showSuccess() {
    Swal.fire({
        title: 'تم التسجيل بنجاح!',
        text: 'سنتواصل معك قريباً',
        icon: 'success',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#DAA520'
    });
}

// Counter animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 20);
}

// Initialize counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target.getAttribute('data-target');
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// التحكم في شريط التقييمات
const testimonialSlider = document.querySelector('.testimonials-slider');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevButton = document.querySelector('.prev-testimonial');
const nextButton = document.querySelector('.next-testimonial');

let currentTestimonial = 0;
const totalTestimonials = testimonialCards.length;

function showTestimonial(index) {
    testimonialSlider.style.transform = `translateX(${-index * 100}%)`;
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

// إضافة مستمعي الأحداث لأزرار التنقل
prevButton?.addEventListener('click', prevTestimonial);
nextButton?.addEventListener('click', nextTestimonial);

// التنقل التلقائي كل 5 ثوانٍ
setInterval(nextTestimonial, 5000);

// تحميل الفيديوهات بشكل متأخر
const videoCards = document.querySelectorAll('.video-card');
const videoObserverOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
};

const videoObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const iframe = entry.target.querySelector('iframe');
            if (iframe.dataset.src) {
                iframe.src = iframe.dataset.src;
                iframe.dataset.src = '';
            }
            observer.unobserve(entry.target);
        }
    });
}, videoObserverOptions);

videoCards.forEach(card => {
    videoObserver.observe(card);
});

// تحريك التقييمات عند التمرير
const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            testimonialObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.testimonial-card').forEach(card => {
    testimonialObserver.observe(card);
});

// وظيفة التمرير السلس إلى الفورم
function scrollToForm() {
    const form = document.getElementById('promotionForm');
    const formSection = document.querySelector('.promotion-section');
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;

    // حساب المسافة إلى الفورم مع مراعاة ارتفاع الهيدر
    const formOffset = formSection.offsetTop - headerHeight - 20;

    // إضافة تأثير الظهور للفورم
    formSection.classList.add('highlight');

    // التمرير السلس
    window.scrollTo({
        top: formOffset,
        behavior: 'smooth'
    });

    // تركيز على أول حقل في الفورم
    setTimeout(() => {
        document.getElementById('businessName').focus();
        // إزالة تأثير الإبراز بعد ثانيتين
        setTimeout(() => {
            formSection.classList.remove('highlight');
        }, 2000);
    }, 1000);
}

// تحسين التمرير لجميع روابط القائمة
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// إضافة تأثير تثبيت القائمة عند التمرير
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // التمرير لأسفل
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // التمرير لأعلى
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});
