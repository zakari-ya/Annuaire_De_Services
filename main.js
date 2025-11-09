// Gestion des prestataires
const PKEY = "providers";
let providers = [];

// Initialisation
document.addEventListener("DOMContentLoaded", function () {
  loadProvidersData();
  setupEventListeners();
  animateOnScroll();
  checkAndShowSuccessModal();
});

function checkAndShowSuccessModal() {
  // Vérifier si l'utilisateur vient de la page d'ajout
  const showModal = sessionStorage.getItem("showSuccessModal");
  if (showModal === "true") {
    showSuccessModal();
    // Supprimer le flag après l'affichage
    sessionStorage.removeItem("showSuccessModal");
  }
}

async function loadProvidersData() {
  try {
    // Charger les données depuis le fichier JSON
    const response = await fetch("services_marrakech.json");
    const servicesData = await response.json();

    // Charger les données locales
    const savedProviders = localStorage.getItem(PKEY);
    const localProviders = savedProviders ? JSON.parse(savedProviders) : [];

    // Transformer les données du JSON en format compatible
    const jsonProviders = servicesData.map((service) => ({
      id: service.id,
      name: service.name,
      job: service.service_type,
      zone: service.location,
      phone: service.phone || service.phone_raw,
      description:
        service.description || `${service.service_type} à ${service.location}`,
      validated: true,
      image: getServiceImage(service.service_type),
      rating: service.rating,
      reviews_count: service.reviews_count,
      source: "json",
    }));

    // Fusionner les données (JSON + locales), éviter les doublons
    const jsonIds = new Set(jsonProviders.map((p) => p.id));
    const uniqueLocalProviders = localProviders.filter(
      (p) => !jsonIds.has(p.id)
    );

    providers = [...jsonProviders, ...uniqueLocalProviders];

    saveProviders();
    renderProviders();
    updateFilters();
  } catch (error) {
    console.error("Erreur lors du chargement des données:", error);
    // Charger depuis le localStorage si disponible
    initializeProviders();
    renderProviders();
    updateFilters();
  }
}

function getServiceImage(serviceType) {
  const imageMap = {
    "Services à la personne":
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop",
    "Services aux entreprises":
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=300&fit=crop",
    Herboristerie:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=300&fit=crop",
    "Site d'information":
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=300&h=300&fit=crop",
    "Police - Justice":
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=300&fit=crop",
    "Cours de langues":
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=300&fit=crop",
    "Administration - Service public":
      "https://images.unsplash.com/photo-1551135049-8a33b42738b4?w=300&h=300&fit=crop",
    "Création d'entreprise":
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=300&fit=crop",
    Médecins:
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=300&h=300&fit=crop",
    Plombier: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    Coiffeur: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
    Restaurant:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
    Boulanger:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
    Couturier:
      "https://images.unsplash.com/photo-1594736797933-d0d69c3d15d3?w=400",
    Jardinier:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400",
    Électricien:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400",
    Mécanicien:
      "https://images.unsplash.com/photo-1581093458791-8a6a5d583c5e?w=400",
  };

  return (
    imageMap[serviceType] ||
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
  );
}

function initializeProviders() {
  const savedProviders = localStorage.getItem(PKEY);
  if (savedProviders) {
    providers = JSON.parse(savedProviders);
  } else {
    providers = [];
  }
}

function saveProviders() {
  // Sauvegarder uniquement les prestataires locaux
  const localProviders = providers.filter(
    (p) => p.source === "local" || !p.source
  );
  localStorage.setItem(PKEY, JSON.stringify(localProviders));
}

function setupEventListeners() {
  // Filtres
  const searchBtn = document.getElementById("searchBtn");
  const zoneFilter = document.getElementById("zoneFilter");
  const metierFilter = document.getElementById("metierFilter");

  if (searchBtn) searchBtn.addEventListener("click", filterProviders);
  if (zoneFilter) zoneFilter.addEventListener("change", filterProviders);
  if (metierFilter) metierFilter.addEventListener("change", filterProviders);

  // Menu mobile
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu);
  }
}

function updateFilters() {
  const zoneFilter = document.getElementById("zoneFilter");
  const metierFilter = document.getElementById("metierFilter");

  if (!zoneFilter || !metierFilter) return;

  // Obtenir les zones uniques des prestataires validés
  const validatedProviders = providers.filter((p) => p.validated);
  const zones = [...new Set(validatedProviders.map((p) => p.zone))].filter(
    (zone) => zone
  );
  // Obtenir les métiers uniques des prestataires validés
  const metiers = [...new Set(validatedProviders.map((p) => p.job))].filter(
    (job) => job
  );

  // Mettre à jour le filtre des zones
  zoneFilter.innerHTML = '<option value="Tous">Toutes les zones</option>';
  zones.forEach((zone) => {
    const option = document.createElement("option");
    option.value = zone;
    option.textContent = zone;
    zoneFilter.appendChild(option);
  });

  // Mettre à jour le filtre des métiers
  metierFilter.innerHTML = '<option value="Tous">Tous les métiers</option>';
  metiers.forEach((metier) => {
    const option = document.createElement("option");
    option.value = metier;
    option.textContent = metier;
    metierFilter.appendChild(option);
  });
}

function filterProviders() {
  const zoneFilter = document.getElementById("zoneFilter")?.value || "Tous";
  const metierFilter = document.getElementById("metierFilter")?.value || "Tous";

  const filteredProviders = providers.filter((provider) => {
    const matchesZone = zoneFilter === "Tous" || provider.zone === zoneFilter;
    const matchesMetier =
      metierFilter === "Tous" || provider.job === metierFilter;
    return matchesZone && matchesMetier && provider.validated;
  });

  renderProviders(filteredProviders);
}

function renderProviders(providersToRender = null) {
  const providerList = document.getElementById("providerList");
  const noResults = document.getElementById("noResults");

  if (!providerList || !noResults) return;

  const providersList =
    providersToRender || providers.filter((p) => p.validated);

  if (providersList.length === 0) {
    providerList.innerHTML = "";
    noResults.classList.remove("hidden");
    return;
  }

  noResults.classList.add("hidden");

  providerList.innerHTML = providersList
    .map(
      (provider) => `
        <div class="provider-card provider-card-wrapper">
            <img src="${provider.image}" alt="${provider.name}" class="provider-image">
            <div class="provider-content">
                <div class="provider-header">
                    <h4 class="provider-name">${provider.name}</h4>
                    <span class="provider-job-badge">${provider.job}</span>
                </div>
                <div class="provider-zone">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    ${provider.zone}
                </div>
                <p class="provider-description">${provider.description}</p>
                ${
                  provider.rating
                    ? `
                <div class="provider-rating">
                    <span class="provider-rating-star">⭐ ${provider.rating}</span>
                    <span class="provider-rating-count">${provider.reviews_count || ""}</span>
                </div>
                `
                    : ""
                }
                <div class="provider-footer">
                    ${
                      provider.phone
                        ? `
                    <a href="tel:${provider.phone}" class="provider-phone-link">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        ${provider.phone}
                    </a>
                    `
                        : "<div></div>"
                    }
                    <button onclick="viewProviderDetails('${provider.id}')" class="provider-details-btn">
                        Voir détails
                    </button>
                </div>
            </div>
        </div>
    `
    )
    .join("");

  // Animer l'apparition des cartes
  setTimeout(() => {
    const cards = document.querySelectorAll(".provider-card");
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "all 0.5s ease";

        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 50);
      }, index * 100);
    });
  }, 100);
}

function showSuccessModal() {
  const successModal = document.getElementById("successModal");
  if (successModal) {
    successModal.classList.remove("hidden");

    // Animation du modal
    if (typeof anime !== "undefined") {
      anime({
        targets: "#successModal .bg-white",
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 300,
        easing: "easeOutQuad",
      });
    }
  }
}

function closeModal() {
  const successModal = document.getElementById("successModal");
  if (successModal) {
    successModal.classList.add("hidden");
  }
}

function viewProviderDetails(providerId) {
  const provider = providers.find((p) => p.id === providerId);
  if (provider) {
    // Créer une URL avec les paramètres du prestataire
    const params = new URLSearchParams({
      id: provider.id,
      name: provider.name,
      job: provider.job,
      zone: provider.zone,
      phone: provider.phone || "",
      description: provider.description,
      image: provider.image,
      rating: provider.rating || "",
      reviews_count: provider.reviews_count || "",
    });
    window.location.href = `provider.html?${params.toString()}`;
  }
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenu) {
    mobileMenu.classList.toggle("hidden");
  } else {
    // Fallback si le menu mobile n'existe pas
    alert(
      "Menu mobile - Fonctionnalité à développer selon les besoins spécifiques"
    );
  }
}

// Close mobile menu when clicking on any link
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
  const mobileMenu = document.getElementById('mobile-menu');
  
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Close the mobile menu
      if (mobileMenu) {
        mobileMenu.classList.add('hidden');
      }
    });
  });
  
  // Optional: Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        mobileMenu.classList.add('hidden');
      }
    }
  });
});


function animateOnScroll() {
  // Animation simple sans dépendance à anime.js
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  });

  const animatedElements = document.querySelectorAll(
    "#home h2, #home p, #home button"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });
}

// Fonctions utilitaires pour l'administration
function getPendingProviders() {
  return providers.filter((p) => !p.validated);
}

function validateProvider(providerId) {
  const provider = providers.find((p) => p.id === providerId);
  if (provider) {
    provider.validated = true;
    saveProviders();
    renderProviders();
  }
}

function deleteProvider(providerId) {
  providers = providers.filter((p) => p.id !== providerId);
  saveProviders();
  renderProviders();
}
