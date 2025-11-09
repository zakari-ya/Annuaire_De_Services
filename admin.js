// Your JavaScript code remains exactly the same
let providers = [];
let editingProviderId = null;

// Charger les prestataires
function loadProviders() {
  const savedProviders = localStorage.getItem("providers");
  const localProviders = savedProviders ? JSON.parse(savedProviders) : [];

  // Charger les données JSON (statiques)
  fetch("services_marrakech.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Fichier JSON non trouvé");
      }
      return response.json();
    })
    .then((jsonData) => {
      // Transformer les données JSON en format compatible
      const jsonProviders = jsonData.map((service) => ({
        id: service.id,
        name: service.name,
        job: service.service_type,
        zone: service.location,
        phone: service.phone || service.phone_raw,
        description:
          service.description ||
          `${service.service_type} à ${service.location}`,
        validated: true, // Les données JSON sont validées par défaut
        image: getServiceImage(service.service_type),
        rating: service.rating,
        reviews_count: service.reviews_count,
        source: "json", // Marquer la source
      }));

      // Fusionner : JSON d'abord, puis données locales
      // Éviter les doublons basés sur l'ID
      const jsonIds = new Set(jsonProviders.map((p) => p.id));
      const uniqueLocalProviders = localProviders.filter(
        (p) => !jsonIds.has(p.id)
      );

      providers = [...jsonProviders, ...uniqueLocalProviders];

      updateStats();
      renderPendingProviders();
      renderValidatedProviders();
    })
    .catch((error) => {
      console.error("Erreur chargement JSON:", error);
      // Fallback aux données locales uniquement
      providers = localProviders;
      if (providers.length === 0) {
        providers = getDefaultProviders();
      }
      saveProviders();
      updateStats();
      renderPendingProviders();
      renderValidatedProviders();
    });
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

function getDefaultProviders() {
  return [
    {
      id: Date.now().toString(),
      name: "Jean Dupont",
      job: "Plombier",
      zone: "Paris 15e",
      phone: "01 23 45 67 89",
      description: "Plombier expérimenté pour toutes vos réparations",
      image: getServiceImage("Plombier"),
      validated: false,
      source: "local",
    },
  ];
}

// Sauvegarder les prestataires (uniquement les locaux)
function saveProviders() {
  const localProviders = providers.filter(
    (p) => p.source === "local" || !p.source
  );
  localStorage.setItem("providers", JSON.stringify(localProviders));
}

// Mettre à jour les statistiques
function updateStats() {
  const total = providers.length;
  const validated = providers.filter((p) => p.validated).length;
  const pending = providers.filter((p) => !p.validated).length;
  const jsonProviders = providers.filter((p) => p.source === "json").length;

  document.getElementById("totalProviders").textContent = total;
  document.getElementById("validatedProviders").textContent = validated;
  document.getElementById("pendingProviders").textContent = pending;
  document.getElementById("jsonProviders").textContent = jsonProviders;

  // Animer les chiffres
  if (typeof anime !== "undefined") {
    anime({
      targets:
        "#totalProviders, #validatedProviders, #pendingProviders, #jsonProviders",
      scale: [1.2, 1],
      duration: 300,
      easing: "easeOutQuad",
    });
  }
}

// Afficher les prestataires en attente
function renderPendingProviders() {
  const pendingProviders = providers.filter((p) => !p.validated);
  const container = document.getElementById("pendingList");
  const noPending = document.getElementById("noPending");

  if (pendingProviders.length === 0) {
    container.innerHTML = "";
    noPending.classList.remove("hidden");
    return;
  }

  noPending.classList.add("hidden");

  container.innerHTML = pendingProviders
    .map(
      (provider) => `
                <div class="pending-card pending-card-container ${
                  provider.source === "json" ? "json-data" : "local-data"
                }">
                    <div class="pending-card-flex">
                        <div class="pending-card-img-container">
                            <img src="${provider.image}" alt="${
        provider.name
      }" class="pending-card-img">
                        </div>
                        <div class="pending-card-content">
                            <div class="pending-card-header">
                                <div>
                                    <div class="pending-card-details">
                                        <h3 class="pending-card-title">${
                                          provider.name
                                        }</h3>
                                        ${
                                          provider.source === "json"
                                            ? '<span class="pending-card-badge bg-blue-100 text-blue-800">Donnée référence</span>'
                                            : '<span class="pending-card-badge bg-green-100 text-green-800">Nouvelle entrée</span>'
                                        }
                                    </div>
                                    <div class="pending-card-details">
                                        <span class="pending-card-job">${
                                          provider.job
                                        }</span>
                                        <span class="pending-card-location">
                                            <svg class="pending-card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                            ${provider.zone}
                                        </span>
                                        ${
                                          provider.phone
                                            ? `
                                        <span class="pending-card-phone">
                                            <svg class="pending-card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                            </svg>
                                            ${provider.phone}
                                        </span>
                                        `
                                            : ""
                                        }
                                    </div>
                                </div>
                                <div class="pending-card-actions">
                                    <button onclick="validateProvider('${
                                      provider.id
                                    }')" class="btn-validate">
                                        Valider
                                    </button>
                                    <button onclick="deleteProvider('${
                                      provider.id
                                    }')" class="btn-delete">
                                        ${
                                          provider.source === "json"
                                            ? "Masquer"
                                            : "Supprimer"
                                        }
                                    </button>
                                </div>
                            </div>
                            <p class="pending-card-description">${
                              provider.description
                            }</p>
                            <div class="pending-card-footer">
                                ${
                                  provider.source === "json"
                                    ? "Donnée de référence"
                                    : `Ajouté le ${new Date(
                                        parseInt(provider.id)
                                      ).toLocaleDateString("fr-FR")}`
                                }
                            </div>
                        </div>
                    </div>
                </div>
            `
    )
    .join("");

  // Animer l'apparition des cartes
  setTimeout(() => {
    const cards = document.querySelectorAll(".pending-card");
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("visible");
      }, index * 100);
    });
  }, 100);
}

// Afficher les prestataires validés
function renderValidatedProviders() {
  const validatedProviders = providers.filter((p) => p.validated);
  const container = document.getElementById("validatedList");

  container.innerHTML = validatedProviders
    .map(
      (provider) => `
                <div class="validated-card ${
                  provider.source === "json" ? "json-data" : "local-data"
                }">
                    <img src="${provider.image}" alt="${
        provider.name
      }" class="validated-card-img">
                    <div class="validated-card-content">
                        <h4 class="validated-card-title">${provider.name}</h4>
                        <p class="validated-card-job">${provider.job}</p>
                        <p class="validated-card-location">${provider.zone}</p>
                        ${
                          provider.source === "json"
                            ? '<p class="validated-card-source text-blue-600">✓ Donnée de référence</p>'
                            : '<p class="validated-card-source text-gray-500">✓ Ajouté localement</p>'
                        }
                        ${
                          provider.rating
                            ? `
                        <div class="validated-card-rating">
                            <span class="text-yellow-500 mr-1">⭐ ${
                              provider.rating
                            }</span>
                            <span>${provider.reviews_count || ""}</span>
                        </div>
                        `
                            : ""
                        }
                        <div class="validated-card-actions">
                            <button onclick="editProvider('${
                              provider.id
                            }')" class="link-edit">
                                Modifier
                            </button>
                            <button onclick="deleteProvider('${
                              provider.id
                            }')" class="link-delete">
                                ${
                                  provider.source === "json"
                                    ? "Masquer"
                                    : "Supprimer"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            `
    )
    .join("");
}

// Valider un prestataire
function validateProvider(providerId) {
  const provider = providers.find((p) => p.id === providerId);
  if (provider) {
    provider.validated = true;
    // Si c'est une donnée JSON convertie en locale, sauvegarder
    if (provider.source === "local" || !provider.source) {
      saveProviders();
    }
    updateStats();
    renderPendingProviders();
    renderValidatedProviders();
    showConfirmModal();
  }
}

// Supprimer un prestataire
function deleteProvider(providerId) {
  const provider = providers.find((p) => p.id === providerId);
  const action = provider?.source === "json" ? "masquer" : "supprimer";

  if (confirm(`Êtes-vous sûr de vouloir ${action} ce prestataire ?`)) {
    // Ne pas supprimer les données JSON originales, seulement les cacher
    if (provider && provider.source === "json") {
      provider.validated = false; // Juste le cacher
    } else {
      // Supprimer complètement les données locales
      providers = providers.filter((p) => p.id !== providerId);
      saveProviders();
    }

    updateStats();
    renderPendingProviders();
    renderValidatedProviders();
  }
}

// Modifier un prestataire
function editProvider(providerId) {
  const provider = providers.find((p) => p.id === providerId);
  if (provider) {
    editingProviderId = providerId;

    // Remplir le formulaire avec les données actuelles
    document.getElementById("editId").value = provider.id;
    document.getElementById("editSource").value = provider.source || "local";
    document.getElementById("editName").value = provider.name;
    document.getElementById("editJob").value = provider.job;
    document.getElementById("editZone").value = provider.zone;
    document.getElementById("editPhone").value = provider.phone || "";
    document.getElementById("editDescription").value = provider.description;

    // Afficher l'avertissement pour les données JSON
    const jsonWarning = document.getElementById("jsonWarning");
    if (provider.source === "json") {
      jsonWarning.classList.remove("hidden");
    } else {
      jsonWarning.classList.add("hidden");
    }

    showEditModal();
  }
}

// Afficher le modal d'édition
function showEditModal() {
  document.getElementById("editModal").classList.remove("hidden");

  if (typeof anime !== "undefined") {
    anime({
      targets: "#editModal .bg-white",
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 300,
      easing: "easeOutQuad",
    });
  }
}

// Fermer le modal d'édition
function closeEditModal() {
  document.getElementById("editModal").classList.add("hidden");
  editingProviderId = null;
  document.getElementById("editForm").reset();
  document.getElementById("jsonWarning").classList.add("hidden");
}

// Afficher le modal de confirmation
function showConfirmModal() {
  document.getElementById("confirmModal").classList.remove("hidden");

  if (typeof anime !== "undefined") {
    anime({
      targets: "#confirmModal .bg-white",
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 300,
      easing: "easeOutQuad",
    });
  }
}

// Fermer le modal de confirmation
function closeConfirmModal() {
  document.getElementById("confirmModal").classList.add("hidden");
}

// Gérer la soumission du formulaire d'édition
document.getElementById("editForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (editingProviderId !== null) {
    const provider = providers.find((p) => p.id === editingProviderId);
    if (provider) {
      const source = document.getElementById("editSource").value;

      // Si c'est une donnée JSON, créer une copie locale
      if (source === "json") {
        // Créer une nouvelle entrée locale avec les modifications
        const updatedProvider = {
          ...provider,
          name: document.getElementById("editName").value,
          job: document.getElementById("editJob").value,
          zone: document.getElementById("editZone").value,
          phone: document.getElementById("editPhone").value,
          description: document.getElementById("editDescription").value,
          source: "local", // Convertir en donnée locale
          id: "local_" + Date.now(), // Nouvel ID pour éviter les conflits
        };

        // Remplacer l'ancienne entrée par la nouvelle
        providers = providers.filter((p) => p.id !== editingProviderId);
        providers.push(updatedProvider);
      } else {
        // Mettre à jour directement les données locales
        provider.name = document.getElementById("editName").value;
        provider.job = document.getElementById("editJob").value;
        provider.zone = document.getElementById("editZone").value;
        provider.phone = document.getElementById("editPhone").value;
        provider.description = document.getElementById("editDescription").value;
      }

      saveProviders();
      renderPendingProviders();
      renderValidatedProviders();
      closeEditModal();
      showConfirmModal();
    }
  }
});

// Initialisation
document.addEventListener("DOMContentLoaded", function () {
  loadProviders();

  // Animation d'entrée
  if (typeof anime !== "undefined") {
    anime({
      targets: ".bg-white",
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 600,
      delay: anime.stagger(100),
      easing: "easeOutQuad",
    });
  }
});

// Menu mobile
     const mobileMenuBtn = document.getElementById("mobile-menu-btn");
     if (mobileMenuBtn) {
       mobileMenuBtn.addEventListener("click", toggleMobileMenu);
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


