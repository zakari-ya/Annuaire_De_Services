// Récupérer les paramètres de l'URL
function getProviderFromURL() {
  const params = new URLSearchParams(window.location.search);
  return {
    id: params.get("id"),
    name: params.get("name"),
    job: params.get("job"),
    zone: params.get("zone"),
    phone: params.get("phone"),
    description: params.get("description"),
    image: params.get("image"),
  };
}

// Charger tous les prestataires depuis le localStorage
function getAllProviders() {
  const providers = localStorage.getItem("providers");
  return providers ? JSON.parse(providers) : [];
}

// Afficher les détails du prestataire
function renderProviderDetails(provider) {
  const container = document.getElementById("providerDetails");

  container.innerHTML = `
                <div class="provider-layout">
                    
                    <div class="provider-image-box">
                        <img src="${provider.image}" alt="${provider.name}">
                    </div>

                    <div class="provider-info-box">

                        <div>
                            <span class="provider-job">${provider.job}</span>
                            <h1 class="provider-name">${provider.name}</h1>

                            <div class="provider-zone">
                                <svg width="22" height="30" fill="none" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                ${provider.zone}
                            </div>
                        </div>

                        <div>
                            <h2 class="provider-desc-title">Description</h2>
                            <p class="provider-desc-text">${provider.description}</p>
                        </div>

                        <div class="provider-actions">
                            
                            <a href="tel:${provider.phone}" class="provider-btn-call">
                                <svg width="22" height="25" fill="none" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                                ${provider.phone}
                            </a>

                            <button onclick="shareProvider()" class="provider-btn-share">
                                <svg width="22" height="25" fill="none" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                                </svg>
                                Partager
                            </button>

                        </div>

                    </div>

                </div>
            `;
}

// Afficher les prestataires similaires
function renderSimilarProviders(currentProvider) {
  const allProviders = getAllProviders();
  const similarProviders = allProviders
    .filter(
      (p) =>
        p.id != currentProvider.id &&
        p.zone === currentProvider.zone &&
        p.validated
    )
    .slice(0, 3);

  const container = document.getElementById("similarProviders");

  if (similarProviders.length === 0) {
    container.innerHTML =
      '<p class="text-gray-500 text-center col-span-full">Aucun autre prestataire dans ce quartier.</p>';
    return;
  }

  container.innerHTML = similarProviders
    .map(
      (provider) => `
                <div class="similar-card">
                    <img src="${provider.image}" alt="${
        provider.name
      }" class="similar-img">

                    <div class="similar-content">
                        <h4 class="similar-name">${provider.name}</h4>
                        <p class="similar-job">${provider.job}</p>
                        <p class="similar-desc">${provider.description}</p>

                        <a href="provider.html?id=${
                          provider.id
                        }&name=${encodeURIComponent(
        provider.name
      )}&job=${encodeURIComponent(provider.job)}&zone=${encodeURIComponent(
        provider.zone
      )}&phone=${encodeURIComponent(
        provider.phone
      )}&description=${encodeURIComponent(
        provider.description
      )}&image=${encodeURIComponent(provider.image)}"
                        class="similar-link">
                        Voir détails →
                        </a>
                    </div>
                </div>
            `
    )
    .join("");
}

// Fonction pour partager le prestataire
function shareProvider() {
  const provider = getProviderFromURL();
  const shareText = `Découvrez ${provider.name}, ${provider.job} à ${provider.zone} - ${provider.phone}`;

  if (navigator.share) {
    navigator.share({
      title: `${provider.name} - Services de Proximité`,
      text: shareText,
      url: window.location.href,
    });
  } else {
    // Fallback : copier dans le presse-papier
    navigator.clipboard
      .writeText(`${shareText} - ${window.location.href}`)
      .then(() => {
        alert("Lien copié dans le presse-papier !");
      });
  }
}

// Initialisation
document.addEventListener("DOMContentLoaded", function () {
  const provider = getProviderFromURL();

  if (provider.name) {
    renderProviderDetails(provider);
    renderSimilarProviders(provider);

    // Animation d'entrée
    anime({
      targets: "#providerDetails",
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 800,
      easing: "easeOutQuad",
    });
  } else {
    // Rediriger si aucun prestataire trouvé
    window.location.href = "index.html";
  }
});
