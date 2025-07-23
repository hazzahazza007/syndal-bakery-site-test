document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false
    });

    // Manually add 'visible' class to hero text for initial animation
    document.querySelectorAll('.animate-text-reveal').forEach(element => {
        element.classList.add('visible');
    });
    document.querySelector('.animate-fade-in').classList.add('visible');


    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            // Close mobile menu after clicking a link
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active'); // Changed from .open to .active to match CSS
            navToggle.classList.toggle('active');
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
            navToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Quick View Modal
    const quickViewModal = document.getElementById('quickViewModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalPrice = document.getElementById('modalPrice');
    const closeButtons = document.querySelectorAll('.close-button, .close-button-bottom');
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');

    const productData = {
        bahnmi: {
            title: "Banh Mi Roll",
            image: "bahnmi.png",
            description: "Our signature Vietnamese Banh Mi, featuring a crispy baguette, savoury pate, flavourful cold cuts (or your choice of grilled chicken/pork), fresh herbs, pickled vegetables, and a hint of chilli.",
            
        },
        coffee: {
            title: "Artisan Coffee",
            image: "coffee.png",
            description: "Experience our premium blend coffee, expertly brewed. Choose from Espresso, Latte, Cappuccino, Flat White, or Iced Coffee. Perfect for your morning boost or an afternoon treat.",
           
        },
        meatpie: {
            title: "Classic Meat Pie",
            image: "meatpie.png",
            description: "A true Aussie classic! Our golden-baked meat pie is filled with rich, tender beef in a savoury gravy, encased in our famous flaky pastry. A hearty and satisfying meal.",
            
        },
        pastries: {
            title: "Fresh Pastries & Croissants",
            image: "images/fresh-pastries.jpg",
            description: "Indulge in our exquisite range of freshly baked pastries, including buttery croissants, pain au chocolat, fruit tarts, and cinnamon scrolls. Perfect with your coffee!",
            
        },
        breads: {
            title: "Artisan Breads",
            image: "images/artisan-breads.jpg",
            description: "Our selection of artisan breads is baked daily using traditional methods. From rustic sourdough to crusty baguettes, ideal for sandwiches or as a delicious accompaniment to any meal.",
           
        }
    };

    quickViewBtns.forEach(button => {
        button.addEventListener('click', () => {
            const itemKey = button.dataset.item;
            const item = productData[itemKey];

            if (item) {
                modalTitle.textContent = item.title;
                modalImage.src = item.image;
                modalImage.alt = item.title;
                modalDescription.textContent = item.description;
                quickViewModal.classList.add('active'); // Added 'active' class to show modal
                document.body.style.overflow = 'hidden'; // Prevent body scroll
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            quickViewModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore body scroll
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === quickViewModal) {
            quickViewModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    const testimonialDotsContainer = document.querySelector('.testimonial-dots');
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    let currentIndex = 0;

    if (testimonialDotsContainer && testimonialCards.length > 0) {
        testimonialCards.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('testimonial-dot'); // Corrected class name
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            testimonialDotsContainer.appendChild(dot);
        });
    }

    const dots = document.querySelectorAll('.testimonial-dot'); // Corrected selector

    function goToSlide(index) {
        if (testimonialSlider && testimonialCards.length > 0) {
            // Calculate scroll amount based on card width and gap
            const cardWidth = testimonialCards[0].offsetWidth;
            // Get computed gap-property from the slider's CSS
            const style = window.getComputedStyle(testimonialSlider);
            const gap = parseFloat(style.gap); // Parse the gap value (e.g., "1.5rem" to 24px)

            // Ensure gap is a number, default to 0 if not
            const actualGap = isNaN(gap) ? 0 : gap;

            const scrollAmount = index * (cardWidth + actualGap);

            testimonialSlider.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
            updateDots(index);
            currentIndex = index;
        }
    }


    function updateDots(activeIndex) {
        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            goToSlide(currentIndex);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
            goToSlide(currentIndex);
        });
    }

    // Generate Star Ratings
    testimonialCards.forEach(card => {
        const rating = parseInt(card.dataset.rating);
        if (!isNaN(rating)) {
            const starsContainer = document.createElement('div');
            starsContainer.classList.add('stars');
            for (let i = 0; i < 5; i++) {
                const star = document.createElement('i');
                star.classList.add('fa-star'); // All stars initially get fa-star
                if (i < rating) {
                    star.classList.add('fas'); // Filled star
                } else {
                    star.classList.add('far'); // Regular (empty) star
                }
                starsContainer.appendChild(star);
            }
            // Insert stars right after the quote
            const quoteElement = card.querySelector('.quote');
            if (quoteElement) {
                quoteElement.after(starsContainer);
            }
        }
    });


    // Trading Hours Logic - Dynamic Open/Closed Status
    const openStatusElement = document.querySelector('.open-status');
    const tradingHours = {
        0: { open: null, close: null, day: "Sunday", status: "Closed" }, // Sunday (0) is closed
        1: { open: "05:30", close: "16:30", day: "Monday" },
        2: { open: "05:30", close: "16:30", day: "Tuesday" },
        3: { open: "05:30", close: "16:30", day: "Wednesday" },
        4: { open: "05:30", close: "16:30", day: "Thursday" },
        5: { open: "05:30", close: "16:30", day: "Friday" },
        6: { open: "05:30", close: "15:30", day: "Saturday" }
    };

    function checkOpenStatus() {
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        const currentDaySchedule = tradingHours[dayOfWeek];

        let statusText = '';
        let statusClass = '';
        let statusIcon = '';

        if (currentDaySchedule.status === "Closed") {
            statusText = `Closed now. Reopens ${tradingHours[(dayOfWeek + 1) % 7].day} at ${tradingHours[(dayOfWeek + 1) % 7].open}`;
            statusClass = 'closed';
            statusIcon = 'fas fa-door-closed';
             // Adjust for Sunday being closed, find next open day
             if (dayOfWeek === 0) { // If it's Sunday
                statusText = `Closed now. Reopens Monday at ${tradingHours[1].open}`;
             } else if (currentDaySchedule.open && currentDaySchedule.close &&
                (currentHour * 60 + currentMinute) >= (currentDaySchedule.close.split(':')[0] * 60 + currentDaySchedule.close.split(':')[1])) {
                // If it's past closing time today
                let nextOpenDayIndex = (dayOfWeek + 1) % 7;
                while (tradingHours[nextOpenDayIndex].status === "Closed") {
                    nextOpenDayIndex = (nextOpenDayIndex + 1) % 7;
                }
                statusText = `Closed now. Reopens ${tradingHours[nextOpenDayIndex].day} at ${tradingHours[nextOpenDayIndex].open}`;
            }

        } else {
            const openTime = currentDaySchedule.open.split(':').map(Number);
            const closeTime = currentDaySchedule.close.split(':').map(Number);

            const openHour = openTime[0];
            const openMinute = openTime[1];
            const closeHour = closeTime[0];
            const closeMinute = closeTime[1];

            let isOpen = false;

            const currentTotalMinutes = currentHour * 60 + currentMinute;
            const openTotalMinutes = openHour * 60 + openMinute;
            const closeTotalMinutes = closeHour * 60 + closeMinute;


            if (currentTotalMinutes >= openTotalMinutes && currentTotalMinutes < closeTotalMinutes) {
                isOpen = true;
            }

            if (isOpen) {
                statusText = `Currently Open! Closes at ${currentDaySchedule.close}`;
                statusClass = 'open';
                statusIcon = 'fas fa-door-open';
            } else {
                let nextOpenDayIndex = (dayOfWeek + 1) % 7;
                while (tradingHours[nextOpenDayIndex].status === "Closed") {
                    nextOpenDayIndex = (nextOpenDayIndex + 1) % 7;
                }
                statusText = `Closed now. Reopens ${tradingHours[nextOpenDayIndex].day} at ${tradingHours[nextOpenDayIndex].open}`;
                statusClass = 'closed';
                statusIcon = 'fas fa-door-closed';
            }
        }
        openStatusElement.innerHTML = `<i class="${statusIcon}"></i> ${statusText}`;
        openStatusElement.className = `open-status ${statusClass}`; // Reset class list
    }

    checkOpenStatus();
    setInterval(checkOpenStatus, 60000); // Update every minute


    // Highlight Current Day in Trading Hours
    const tradingHoursList = document.querySelector('.contact-details ul');
    if (tradingHoursList) {
        const today = new Date();
        const currentDayIndex = today.getDay(); // 0 for Sunday, 1 for Monday, etc.

        // Find the list item for the current day
        const currentDayListItem = tradingHoursList.querySelector(`li[data-day="${currentDayIndex}"]`);

        if (currentDayListItem) {
            currentDayListItem.classList.add('current-day'); // Changed class name
        }
    }


    // Parallax Effect for Hero Image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            heroImage.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        });
    }

    // Add a simple hover effect for product cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)'; // Matches CSS variable for translateY
            card.style.boxShadow = 'var(--shadow-md)'; // Uses CSS variable for shadow
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'var(--shadow-sm)'; // Uses CSS variable for shadow
        });
    });

    // Add a simple hover effect for special items
    document.querySelectorAll('.special-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
            item.style.boxShadow = 'var(--shadow-md)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = 'var(--shadow-sm)';
        });
    });

    // Sticky Header Shrink
    const siteHeader = document.getElementById('site-header');
    const headerLogo = document.querySelector('.header-logo');
    const navLinks = document.querySelectorAll('.nav-menu a'); // Target all nav links

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            siteHeader.classList.add('scrolled'); // Use 'scrolled' class
            headerLogo.classList.remove('large-logo');
            headerLogo.classList.add('small-logo');
            navLinks.forEach(link => link.classList.add('shrunk-link')); // Add shrunk-link for smaller text/padding
        } else {
            siteHeader.classList.remove('scrolled');
            headerLogo.classList.remove('small-logo');
            headerLogo.classList.add('large-logo');
            navLinks.forEach(link => link.classList.remove('shrunk-link'));
        }
    });

    // Contact Form Submission (Basic Example)
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Simulate form submission
            formMessage.textContent = 'Sending your message...';
            formMessage.classList.remove('success', 'error');
            formMessage.style.opacity = '1';

            setTimeout(() => {
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;

                if (name && email && message) {
                    formMessage.textContent = 'Message sent successfully! We will get back to you soon.';
                    formMessage.classList.add('success');
                    contactForm.reset(); // Clear the form
                } else {
                    formMessage.textContent = 'Please fill in all fields.';
                    formMessage.classList.add('error');
                }
            }, 1500); // Simulate network delay
        });
    }

});