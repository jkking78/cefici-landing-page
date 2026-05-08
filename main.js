document.addEventListener('DOMContentLoaded', () => {
    
    // Header Scroll Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileBtn.addEventListener('click', () => {
        mobileBtn.classList.toggle('active');
        nav.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if(nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileBtn.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Scroll Reveal Animations
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    // Initial check and event listener
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load
    
    // Modal Logic
    const modal = document.getElementById('contactModal');
    const closeBtn = document.querySelector('.modal-close');
    const openBtns = document.querySelectorAll('.open-modal-btn');

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Pré-sélection de la formation si l'attribut data-formation existe
            const formationVal = btn.getAttribute('data-formation');
            const selectEl = document.getElementById('userFormation');
            if(formationVal && selectEl) {
                selectEl.value = formationVal;
            }

            modal.classList.add('active');
            // Close mobile menu if open
            if(nav.classList.contains('active')) {
                mobileBtn.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Gestion de l'affichage du champ "Autre formation"
    const modalFormationSelect = document.getElementById('userFormation');
    const customFormationGroup = document.getElementById('customFormationGroup');
    const customFormationInput = document.getElementById('customFormation');
    
    if(modalFormationSelect && customFormationGroup) {
        modalFormationSelect.addEventListener('change', (e) => {
            if(e.target.value === 'autre') {
                customFormationGroup.style.display = 'block';
                customFormationInput.setAttribute('required', 'required');
            } else {
                customFormationGroup.style.display = 'none';
                customFormationInput.removeAttribute('required');
                customFormationInput.value = ''; // Réinitialiser
            }
        });
    }

    // --- LOGIQUE LIGHTBOX (Zoom Image) ---
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxActions = document.getElementById('lightboxActions');
    const lightboxCta = document.getElementById('lightboxCta');

    // Ouverture au clic sur les images zoomables
    document.querySelectorAll('.zoomable').forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            
            const formation = img.getAttribute('data-formation-cta');
            if (formation) {
                lightboxActions.style.display = 'block';
                lightboxCta.setAttribute('data-formation', formation);
            } else {
                lightboxActions.style.display = 'none';
            }
            
            lightboxModal.classList.add('active');
        });
    });

    // Fermeture de la lightbox
    if(lightboxClose && lightboxModal) {
        lightboxClose.addEventListener('click', () => {
            lightboxModal.classList.remove('active');
        });
        
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.classList.remove('active');
            }
        });
    }

    // Connexion du CTA de la Lightbox avec la Modale d'inscription
    if (lightboxCta) {
        lightboxCta.addEventListener('click', () => {
            lightboxModal.classList.remove('active');
            modal.classList.add('active');
            
            const formationVal = lightboxCta.getAttribute('data-formation');
            if(formationVal && modalFormationSelect) {
                modalFormationSelect.value = formationVal;
                // Déclencher l'événement 'change' manuellement au cas où
                modalFormationSelect.dispatchEvent(new Event('change'));
            }
        });
    }

    // Handle form submit for modal
    const regForm = document.getElementById('registrationForm');
    if(regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Récupération des données du formulaire
            const name = document.getElementById('userName').value;
            const phone = document.getElementById('userPhone').value;
            const location = document.getElementById('locationInput').value;
            const formationSelect = document.getElementById('userFormation');
            let formation = formationSelect.options[formationSelect.selectedIndex].text;
            
            if (formationSelect.value === 'autre') {
                const customVal = document.getElementById('customFormation').value;
                if (customVal.trim() !== '') {
                    formation = `Sur Mesure : ${customVal}`;
                }
            }
            
            const budget = document.getElementById('userBudget').value;

            // Formatage du message pour WhatsApp
            const message = `*NOUVELLE DEMANDE CEFICI*%0A%0A*Nom* : ${name}%0A*Téléphone* : ${phone}%0A*Localisation* : ${location}%0A*Formation* : ${formation}%0A*Budget* : ${budget}%0A%0A_Merci de me recontacter !_`;
            
            // Numéro WhatsApp CEFICI (format international sans le +)
            const whatsappNumber = "2250717053408"; 
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

            // Déclenchement de la conversion "Lead" pour Facebook Ads
            if (typeof fbq === 'function') {
                fbq('track', 'Lead', {
                    content_name: formation,
                    currency: 'XOF'
                });
            }

            const btn = regForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Envoi en cours...';
            btn.style.backgroundColor = '#10b981';

            // Envoi à Formspree via Fetch API
            const formData = new FormData(regForm);
            
            fetch("https://formspree.io/f/xykopkpb", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    btn.innerText = 'Redirection WhatsApp...';
                    setTimeout(() => {
                        window.open(whatsappUrl, '_blank');
                        btn.innerText = originalText;
                        btn.style.backgroundColor = '';
                        regForm.reset();
                        modal.classList.remove('active');
                    }, 1000);
                } else {
                    alert("Oups ! Il y a eu un problème lors de l'envoi de l'email.");
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '';
                }
            }).catch(error => {
                alert("Oups ! Une erreur réseau s'est produite lors de l'envoi.");
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
            });
        });
    }

    // Geolocation Logic
    const geolocateBtn = document.getElementById('geolocateBtn');
    const userMapIframe = document.getElementById('userMapIframe');
    const mapPlaceholder = document.querySelector('.map-placeholder');
    const locationInput = document.getElementById('locationInput');

    if(geolocateBtn) {
        geolocateBtn.addEventListener('click', () => {
            if ("geolocation" in navigator) {
                geolocateBtn.innerText = "Recherche en cours...";
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    
                    // Show map
                    userMapIframe.src = `https://maps.google.com/maps?q=${lat},${lon}&hl=fr&z=15&output=embed`;
                    userMapIframe.style.display = 'block';
                    mapPlaceholder.style.display = 'none';

                    // Try to get city name
                    try {
                        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
                        const data = await response.json();
                        if(data && data.address) {
                            const city = data.address.city || data.address.town || data.address.suburb || data.address.county || "Côte d'Ivoire";
                            locationInput.value = city;
                        }
                    } catch(e) {
                        console.log("Reverse geocoding failed", e);
                    }
                }, (error) => {
                    geolocateBtn.innerText = "Me localiser";
                    alert("Impossible d'obtenir votre position. Veuillez vérifier vos permissions de localisation.");
                });
            } else {
                alert("La géolocalisation n'est pas supportée par votre navigateur.");
            }
        });
    }

    // --- LOGIQUE COMPTE A REBOURS DYNAMIQUE ---
    function updateCountdowns() {
        const countdownElements = document.querySelectorAll('.dynamic-countdown');
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        countdownElements.forEach(el => {
            const targetDateStr = el.getAttribute('data-target-date');
            if (!targetDateStr) return;

            const targetDate = new Date(targetDateStr);
            targetDate.setHours(0, 0, 0, 0);

            const diffTime = targetDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            let text = "";
            let color = "";

            if (diffDays < 0) {
                text = "✅ Session commencée";
                color = "#64748b"; // Gris
            } else if (diffDays === 0) {
                text = "🔥 Débute Aujourd'hui";
                color = "#ef4444"; // Rouge
            } else if (diffDays === 1) {
                text = "⏳ Débute demain";
                color = "#ef4444"; // Rouge
            } else if (diffDays < 7) {
                text = `⏳ Débute dans ${diffDays} jours`;
                if (diffDays <= 3) color = "#ef4444"; // Rouge
                else color = "#f59e0b"; // Orange
            } else {
                const diffWeeks = Math.floor(diffDays / 7);
                if (diffWeeks === 1) {
                    text = "⏳ Débute dans 1 semaine";
                } else {
                    text = `⏳ Débute dans ${diffWeeks} semaines`;
                }
                
                if (diffWeeks <= 2) color = "#f59e0b"; // Orange
                else color = "#10b981"; // Vert
            }

            el.textContent = text;
            el.style.color = color;
        });
    }

    // Lancer la mise à jour
    updateCountdowns();
});
