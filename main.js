// --- BASE DE DONNÉES DES FORMATIONS ---
const formationsData = {
    "gestion": {
        id: "gestion",
        title: "Gestion & Logistique",
        date: "20 Mai 2026",
        price: "150 000 FCFA",
        image: "media/gestion.png",
        shortDesc: "Trésorerie, Budget, Projet, Stock, Achats, QSHE, Production et Parcs Auto.",
        longDesc: "Développez vos compétences en gestion d'entreprise et logistique. Ce programme pratique vous rendra opérationnel sur les aspects cruciaux de la chaîne de valeur, des achats à la production, en passant par le contrôle qualité.",
        category: "gestion"
    },
    "finance": {
        id: "finance",
        title: "Finances & Fiscalité",
        date: "27 Mai 2026",
        price: "150 000 FCFA",
        image: "media/finance.png",
        shortDesc: "Comptabilité, Sage Saari, États Financiers, Déclarations, Analyse et Contrôle de gestion.",
        longDesc: "Maîtrisez les rouages de la finance d'entreprise. De la saisie comptable sur Sage à l'élaboration des états financiers et aux déclarations fiscales, devenez un pilier incontournable de votre direction financière.",
        category: "finance"
    },
    "rh": {
        id: "rh",
        title: "Ressources Humaines",
        date: "03 Juin 2026",
        price: "150 000 FCFA",
        image: "media/rh.png",
        shortDesc: "Paie, Gestion du personnel, Recrutements, Droit du travail et Gestion des emplois.",
        longDesc: "Acquérez les compétences essentielles pour gérer efficacement le capital humain. Vous apprendrez à traiter la paie, recruter les bons profils, et appliquer le droit du travail ivoirien au quotidien.",
        category: "rh"
    },
    "informatique": {
        id: "informatique",
        title: "Informatique & Web",
        date: "10 Juin 2026",
        price: "150 000 FCFA",
        image: "media/it.png",
        shortDesc: "Développement Web, IA, Analyse de Données, Infographie et Bureautique.",
        longDesc: "Plongez dans le numérique avec des modules orientés vers l'avenir. Que ce soit pour l'analyse de données, la création de sites web ou l'utilisation professionnelle de l'intelligence artificielle.",
        category: "informatique"
    },
    "dev_perso": {
        id: "dev_perso",
        title: "Développement Personnel",
        date: "17 Juin 2026",
        price: "150 000 FCFA",
        image: "media/dev_perso.png",
        shortDesc: "Art Oratoire, Leadership, Confiance en soi et Découverte de soi.",
        longDesc: "Réveillez le leader qui sommeille en vous. Améliorez votre prise de parole en public, renforcez votre confiance et développez des aptitudes relationnelles qui feront décoller votre carrière.",
        category: "dev_perso"
    },
    "daf_raf": {
        id: "daf_raf",
        title: "Formation DAF / RAF",
        date: "06 Juin 2026",
        price: "200 000 FCFA",
        image: "media/formation 1.jpg",
        video: "media/recap cefici.mp4",
        shortDesc: "Formation pratique avec Double Certification Internationale (Durée : 1 mois).",
        longDesc: "Le programme ultime pour devenir Directeur Administratif et Financier ou Responsable Administratif et Financier. Bénéficiez d'une double certification internationale reconnue pour propulser votre carrière au sommet.",
        category: "finance"
    }
};

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

    if (modal) {
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
                if(nav && nav.classList.contains('active')) {
                    mobileBtn.classList.remove('active');
                    nav.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

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



    // --- LOGIQUE LIGHTBOX (Zoom Images) ---
    const zoomableImages = document.querySelectorAll('.zoomable');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxCta = document.getElementById('lightboxCta');

    if (lightboxModal && lightboxImg) {
        zoomableImages.forEach(img => {
            img.addEventListener('click', () => {
                const ctaTarget = img.getAttribute('data-formation-cta');
                if(ctaTarget) {
                    // Si c'est une image de formation, rediriger directement
                    window.location.href = `formation.html?id=${ctaTarget}`;
                    return;
                }
                
                lightboxImg.src = img.src;
                lightboxCta.style.display = 'none'; // Plus besoin de bouton dans la lightbox
                lightboxModal.classList.add('active');
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightboxModal.classList.remove('active');
        });

        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.classList.remove('active');
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
            const formation = document.getElementById('userFormation').value;
            
            // Formatage du message pour WhatsApp (avec encodage sécurisé)
            const message = `*NOUVELLE DEMANDE CEFICI*%0A%0A*Nom* : ${encodeURIComponent(name)}%0A*Téléphone* : ${encodeURIComponent(phone)}%0A*Localisation* : ${encodeURIComponent(location)}%0A*Formation* : ${encodeURIComponent(formation)}%0A%0A_Merci de me recontacter !_`;
            
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

    // Handle form submit for questionnaire
    const qForm = document.getElementById('questionnaireForm');
    if(qForm) {
        qForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Récupération des données du formulaire
            const name = document.getElementById('qName').value;
            const residence = document.getElementById('qResidence').value;
            const fonction = document.getElementById('qFonction').value;
            
            const theme = document.getElementById('qTheme').value;
            
            const whatsapp = document.getElementById('qWhatsApp').value;
            const phone = document.getElementById('qPhone').value;
            
            // Jours de réservation (checkboxes)
            const daysChecked = [];
            document.querySelectorAll('input[name="Jours_Réservation"]:checked').forEach(cb => {
                daysChecked.push(cb.value);
            });
            const days = daysChecked.join(', ');
            
            const hours = document.getElementById('qHeures').value;
            
            // Nouveaux champs
            const sourceSelect = document.getElementById('qSource');
            const source = sourceSelect.options[sourceSelect.selectedIndex].text;
            
            const attentes = document.getElementById('qAttentes').value;
            
            const fdfpRadio = document.querySelector('input[name="Formation_FDFP"]:checked');
            const fdfp = fdfpRadio ? fdfpRadio.value : 'Non précisé';
            
            // Formatage du message pour WhatsApp (avec encodage sécurisé)
            let whatsappMsg = `*📋 NOUVELLE INSCRIPTION & RÉSERVATION - CEFICI*\n\n`;
            whatsappMsg += `*Nom & Prénoms* : ${name}\n`;
            whatsappMsg += `*Lieu de résidence* : ${residence}\n`;
            whatsappMsg += `*Fonction / Métier* : ${fonction}\n`;
            whatsappMsg += `*Thème de formation* : ${theme}\n`;
            whatsappMsg += `*Contact WhatsApp* : ${whatsapp}\n`;
            whatsappMsg += `*Contact Joignable* : ${phone}\n`;
            whatsappMsg += `*Jours de réservation* : ${days || 'Non précisé'}\n`;
            whatsappMsg += `*Heures de réservation* : ${hours}\n`;
            whatsappMsg += `*Source d'information* : ${source}\n`;
            whatsappMsg += `*Attentes* : ${attentes}\n`;
            whatsappMsg += `*Formation FDFP souhaitée* : ${fdfp}\n\n`;
            whatsappMsg += `_Merci de recontacter le participant rapidement._`;
            
            const encodedMessage = encodeURIComponent(whatsappMsg);
            
            // Numéro WhatsApp CEFICI (format international sans le +)
            const whatsappNumber = "2250717053408"; 
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            // Déclenchement de la conversion "Lead" pour Facebook Ads
            if (typeof fbq === 'function') {
                fbq('track', 'Lead', {
                    content_name: theme,
                    currency: 'XOF'
                });
            }

            const btn = qForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = 'Envoi en cours...';
            btn.style.backgroundColor = '#10b981';

            // Envoi à Formspree via Fetch API
            const formData = new FormData(qForm);
            
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
                        qForm.reset();
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
                text = "Session commencée";
                color = "#64748b"; // Gris
            } else if (diffDays === 0) {
                text = "Débute Aujourd'hui";
                color = "#ef4444"; // Rouge
            } else if (diffDays === 1) {
                text = "Débute demain";
                color = "#ef4444"; // Rouge
            } else if (diffDays < 7) {
                text = `Débute dans ${diffDays} jours`;
                if (diffDays <= 3) color = "#ef4444"; // Rouge
                else color = "#f59e0b"; // Orange
            } else {
                const diffWeeks = Math.floor(diffDays / 7);
                if (diffWeeks === 1) {
                    text = "Débute dans 1 semaine";
                } else {
                    text = `Débute dans ${diffWeeks} semaines`;
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
