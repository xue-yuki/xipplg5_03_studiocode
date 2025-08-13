       document.addEventListener('DOMContentLoaded', function () {
            // 4. Dynamic Badge Text Change
            const badgeTexts = [
                'Transforming Ideas Into Reality',
                'Building Tomorrow\'s Solutions Today',
                'Your Digital Dreams, Our Code',
                'Innovation Through Technology'
            ];
            const badgeElement = document.getElementById('hero-badge');
            let badgeIndex = 0;

            function changeBadgeText() {
                if (badgeElement) {
                    badgeElement.style.opacity = '0';
                    setTimeout(() => {
                        badgeIndex = (badgeIndex + 1) % badgeTexts.length;
                        badgeElement.textContent = badgeTexts[badgeIndex];
                        badgeElement.style.opacity = '1';
                    }, 500);
                }
            }

            setInterval(changeBadgeText, 4000);

            // 5. Mouse-following particle effect
            let mouseX = 0, mouseY = 0;
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            function createMouseParticle() {
                const particle = document.createElement('div');
                particle.className = 'fixed w-1 h-1 bg-purple-400 rounded-full pointer-events-none z-50 opacity-60';
                particle.style.left = mouseX + 'px';
                particle.style.top = mouseY + 'px';
                particle.style.transition = 'all 0.8s ease-out';
                document.body.appendChild(particle);

                setTimeout(() => {
                    particle.style.opacity = '0';
                    particle.style.transform = 'scale(0)';
                }, 100);

                setTimeout(() => {
                    document.body.removeChild(particle);
                }, 900);
            }

            // Create mouse particles on hero section
            const heroSection = document.getElementById('home');
            heroSection.addEventListener('mousemove', () => {
                if (Math.random() > 0.9) { // Only create particles occasionally
                    createMouseParticle();
                }
            });

            // 6. Parallax effect for floating elements
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallaxElements = document.querySelectorAll('.floating-shape');
                
                parallaxElements.forEach((element, index) => {
                    const speed = 0.5 + (index * 0.1);
                    element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
                });
            });

            // --- Existing Features (Updated) ---
            
            // --- Fitur 1: Animasi saat Scroll ---
            const revealElements = document.querySelectorAll('.reveal');
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });
            revealElements.forEach(elem => { revealObserver.observe(elem); });

            // --- Fitur 2: Efek 3D Tilt pada Kartu ---
            const cards = document.querySelectorAll('.card-3d');
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const { width, height } = rect;
                    const rotateX = (y / height - 0.5) * -15;
                    const rotateY = (x / width - 0.5) * 15;
                    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
                });
            });

            // --- Fitur 3: Penyorotan Navigasi Aktif ---
            const sections = document.querySelectorAll('section, main');
            const navLinks = document.querySelectorAll('.nav-link');
            const navObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        navLinks.forEach(link => {
                            link.classList.remove('nav-active');
                            if (link.getAttribute('href').substring(1) === entry.target.id) {
                                link.classList.add('nav-active');
                            }
                        });
                    }
                });
            }, { rootMargin: '-50% 0px -50% 0px' });
            sections.forEach(section => { navObserver.observe(section); });

            // --- Fitur 4: Accordion untuk Services ---
            const accordionItems = document.querySelectorAll('.accordion-item');
            accordionItems.forEach(item => {
                const header = item.querySelector('.accordion-header');
                header.addEventListener('click', () => {
                    accordionItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                    item.classList.toggle('active');
                });
            });

            // --- Fitur 5: Toggle Harga Interaktif ---
            const priceToggle = document.getElementById('price-toggle');
            if (priceToggle) {
                const priceValues = document.querySelectorAll('.price-value');
                const pricePeriods = document.querySelectorAll('.price-period');

                priceToggle.addEventListener('change', () => {
                    const isYearly = priceToggle.checked;

                    priceValues.forEach(valueEl => {
                        if (!valueEl.dataset.monthly) return; 

                        const monthlyPrice = valueEl.dataset.monthly;
                        const yearlyPrice = valueEl.dataset.yearly;
                        
                        valueEl.classList.add('updating'); 
                        
                        setTimeout(() => {
                            valueEl.textContent = isYearly ? yearlyPrice : monthlyPrice;
                            valueEl.classList.remove('updating'); 
                        }, 150);
                    });

                    pricePeriods.forEach(periodEl => {
                        periodEl.textContent = isYearly ? '/tahun' : '/bulan';
                    });
                });
            }

            // --- Fitur 6: Form Handling ---
            const contactForm = document.getElementById('contact-form');
            const successMessage = document.getElementById('form-success-message');

            if (contactForm) {
                contactForm.addEventListener('submit', function(event) {
                    event.preventDefault();

                    // 1. Collect form data (removed localStorage)
                    const name = document.getElementById('name').value;
                    const email = document.getElementById('email').value;
                    const message = document.getElementById('message').value;

                    console.log('Form submitted:', { name, email, message });

                    // 2. Send to Web3Forms API
                    const formData = new FormData(contactForm);
                    const object = Object.fromEntries(formData.entries());
                    const json = JSON.stringify(object);

                    const submitButton = contactForm.querySelector('button[type="submit"]');
                    submitButton.innerHTML = 'Mengirim...';
                    submitButton.disabled = true;
                    
                    successMessage.style.display = 'none';
                    successMessage.classList.remove('text-red-400');
                    successMessage.classList.add('text-green-400');

                    fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: json
                    })
                    .then(async (response) => {
                        let apiResult = await response.json();
                        if (response.status == 200) {
                            successMessage.textContent = apiResult.message || 'Pesan Anda telah berhasil dikirim!';
                            successMessage.style.display = 'block';
                            contactForm.reset();
                        } else {
                            console.error('API Error:', apiResult);
                            successMessage.textContent = apiResult.message || 'Terjadi kesalahan saat mengirim pesan.';
                            successMessage.classList.remove('text-green-400');
                            successMessage.classList.add('text-red-400');
                            successMessage.style.display = 'block';
                        }
                    })
                    .catch(error => {
                        console.error('Fetch Error:', error);
                        successMessage.textContent = 'Terjadi kesalahan koneksi.';
                        successMessage.classList.remove('text-green-400');
                        successMessage.classList.add('text-red-400');
                        successMessage.style.display = 'block';
                    })
                    .finally(() => {
                        submitButton.innerHTML = 'Kirim Pesan';
                        submitButton.disabled = false;
                        setTimeout(() => {
                            successMessage.style.display = 'none';
                        }, 5000);
                    });
                });
            }

            // --- Hero Button Click Effects ---
            const heroButtons = document.querySelectorAll('.interactive-button');
            heroButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    // Create ripple effect
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.cssText = `
                        position: absolute;
                        width: ${size}px;
                        height: ${size}px;
                        left: ${x}px;
                        top: ${y}px;
                        background: rgba(255, 255, 255, 0.3);
                        border-radius: 50%;
                        transform: scale(0);
                        animation: ripple 0.6s linear;
                        pointer-events: none;
                    `;
                    
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });

            // CSS for ripple animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);

            // --- Fitur 7: Project Cost Calculator (Baru) ---
    const calculatorForm = document.getElementById('calculator-form');
    const estimatedCostElement = document.getElementById('estimated-cost');
    const pricing = {
        'basic': 500., // base cost for a basic website
        'e-commerce': 1500, // base cost for an e-commerce site
        'custom': 2500, // base cost for a custom web app
        'page': 100, // cost per additional page
        'seo': 200, // cost for SEO optimization
        'cms': 300, // cost for CMS integration
        'social-login': 150 // cost for social login integration
    };

    function calculateCost() {
        let totalCost = 0;
        const projectType = document.getElementById('project-type').value;
        const numPages = parseInt(document.getElementById('num-pages').value);
        const selectedFeatures = document.querySelectorAll('input[name="feature"]:checked');

        // Add base cost based on project type
        totalCost += pricing[projectType];

        // Add cost for number of pages
        if (numPages > 1) {
            totalCost += (numPages - 1) * pricing['page'];
        }

        // Add cost for additional features
        selectedFeatures.forEach(checkbox => {
            totalCost += pricing[checkbox.value];
        });

        // Update the display
        estimatedCostElement.textContent = `${totalCost.toLocaleString()}K`;
    }

    // Listen for changes in the form and recalculate
    if (calculatorForm) {
        calculatorForm.addEventListener('change', calculateCost);
        // Initial calculation
        calculateCost();
    }
});