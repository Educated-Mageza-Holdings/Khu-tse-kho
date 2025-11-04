// Contact Form Handling

const contactForm = document.getElementById('contactForm');
const messageTextarea = document.getElementById('message');
const messageCount = document.querySelector('.message-count');

// Character counter for message
if (messageTextarea) {
    messageTextarea.addEventListener('input', (e) => {
        const currentLength = e.target.value.length;
        const maxLength = 500;

        messageCount.textContent = `${currentLength}/${maxLength}`;

        if (currentLength > maxLength * 0.9) {
            messageCount.style.color = '#f44336';
        } else {
            messageCount.style.color = '';
        }

        // Limit to max length
        if (currentLength > maxLength) {
            e.target.value = e.target.value.substring(0, maxLength);
            messageCount.textContent = `${maxLength}/${maxLength}`;
        }
    });
}

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Validate form
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
            showToast('Please fill in all required fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showToast('Please enter a valid email address');
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            console.log('Form submitted:', formData);

            // Show success message
            showToast('Message sent successfully! We\'ll get back to you soon.');

            // Reset form
            contactForm.reset();
            messageCount.textContent = '0/500';

            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// FAQ accordion functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Toggle active class
        item.classList.toggle('active');

        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
    });
});
