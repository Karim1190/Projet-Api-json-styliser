document.addEventListener("DOMContentLoaded", function () {
    const apiDataElement = document.getElementById('api-data');
    const catButton = document.getElementById('refresh-cat-button');
    const dogButton = document.getElementById('refresh-dog-button');
    const refreshButton = document.getElementById('refresh-button');


    function fetchCatImages() {
        const xhr = new XMLHttpRequest();

        // Configurez l'appel AJAX avec l'URL de l'API The Cat API
        xhr.open("GET", "https://api.thecatapi.com/v1/images/search?limit=10", true);

        // Gérez la réponse de l'API
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseData = JSON.parse(xhr.responseText);
                displayImages(responseData);
                // Ajoutez l'animation GSAP lorsque les nouvelles images sont affichées
                animateImages();
            } else {
                console.error('Erreur lors de la récupération des images de chat', xhr.status, xhr.statusText);
                apiDataElement.textContent = 'Une erreur s\'est produite lors de la récupération des images de chat.';
            }
        };

        // Gérez les erreurs de réseau
        xhr.onerror = function () {
            console.error('Erreur réseau lors de la récupération des images de chat');
            apiDataElement.textContent = 'Une erreur réseau s\'est produite lors de la récupération des images de chat.';
        };

        // Envoyez la requête AJAX pour les images de chat
        xhr.send();
    }

    function fetchDogImages() {
        const xhr = new XMLHttpRequest();

        // Configurez l'appel AJAX avec l'URL de l'API The Dog API
        xhr.open("GET", "https://api.thedogapi.com/v1/images/search?limit=10", true);

        // Gérez la réponse de l'API
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseData = JSON.parse(xhr.responseText);
                displayImages(responseData);
                // Ajoutez l'animation GSAP lorsque les nouvelles images sont affichées
                animateImages();
            } else {
                console.error('Erreur lors de la récupération des images de chien', xhr.status, xhr.statusText);
                apiDataElement.textContent = 'Une erreur s\'est produite lors de la récupération des images de chien.';
            }
        };

        // Gérez les erreurs de réseau
        xhr.onerror = function () {
            console.error('Erreur réseau lors de la récupération des images de chien');
            apiDataElement.textContent = 'Une erreur réseau s\'est produite lors de la récupération des images de chien.';
        };

        // Envoyez la requête AJAX pour les images de chien
        xhr.send();
    }

    // Gestionnaires d'événements pour les boutons de chat et de chien
    catButton.addEventListener("click", fetchCatImages);
    dogButton.addEventListener("click", fetchDogImages);

    // Fonction pour ajouter l'animation GSAP
    function animateImages() {
        // Animation GSAP pour le titre
        gsap.from("h1", { opacity: 0, y: -50, duration: 1, ease: "power2.out" });

        // Animation GSAP pour les images de chat ou de chien
        gsap.from(".cat-image, .dog-image", {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out",
            stagger: 0.2,
        });
      
    
    }

    function displayImages(images) {
        // Créez des éléments HTML pour afficher les images de chat en grille
        const container = document.createElement('div');
        container.className = 'grid-container';

        images.forEach(image => {
            const catImage = document.createElement('img');
            catImage.src = image.url;
            catImage.alt = 'Cat Image';
            catImage.className = 'cat-image';
            container.appendChild(catImage);
        });

        apiDataElement.innerHTML = ''; // Effacez le contenu précédent
        apiDataElement.appendChild(container);
    }

    // Appel initial pour charger les images de chat
    fetchCatImages();
});
