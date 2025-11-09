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

// Gestion du formulaire
document
  .getElementById("providerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Récupération des données du formulaire
    const providerData = {
      id: Date.now().toString(),
      name: document.getElementById("providerName").value,
      job: document.getElementById("providerJob").value,
      zone: document.getElementById("providerZone").value,
      phone: document.getElementById("providerPhone").value,
      description: document.getElementById("providerDescription").value,
      validated: false, // Statut en attente de modération
      image: getServiceImage(document.getElementById("providerJob").value),
      source: "local",
    };

    // Récupération des prestataires existants
    let providers = JSON.parse(localStorage.getItem("providers") || "[]");

    // Ajout du nouveau prestataire
    providers.push(providerData);

    // Sauvegarde dans le localStorage
    localStorage.setItem("providers", JSON.stringify(providers));

    // Définir le flag pour afficher le modal sur la page d'accueil
    sessionStorage.setItem("showSuccessModal", "true");

    // Afficher le modal de succès
    document.getElementById("successModal").classList.add("visible");

    // Réinitialisation du formulaire
    document.getElementById("providerForm").reset();

    // Optionnel : Redirection après 2 secondes
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  });


  
  
  function closeModal() {
      document.getElementById("successModal").classList.remove("visible");
      // Redirection vers la page d'accueil
      window.location.href = "index.html";
    }
    
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
