document.addEventListener('DOMContentLoaded', function () {
    const imageContainer = document.getElementById('image-container');
    const displayedImage = document.getElementById('displayed-image');
    const nextButton = document.getElementById('next');
    const previousButton = document.getElementById('previous');

    const imageFolder = '/images/sample_images/';
    let imageList = [];
    let currentImageIndex = 0;
    const preloadedImages = [];
    let intervalID; // Variable to store the interval ID

    // Function to preload images
    function preloadImages() {
        imageList.forEach(imageName => {
            const img = new Image();
            img.src = imageFolder + imageName;
            preloadedImages.push(img);
        });
    }

    // Fetch the list of image files from the sample_images folder
    fetch(imageFolder)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(data, 'text/html');
            const anchorTags = htmlDoc.querySelectorAll('a');

            anchorTags.forEach(tag => {
                const fileName = tag.getAttribute('href');
                if (fileName.match(/\.(jpg|jpeg|png|gif)$/)) {
                    imageList.push(fileName);
                }
            });

            // Preload images
            preloadImages();

            // Event listeners for the "Next" and "Previous" buttons
            nextButton.addEventListener('click', () => {
                clearInterval(intervalID); // Pause automatic cycling
                displayNextImage();
                intervalID = setInterval(displayNextImage, 3000); // Resume automatic cycling
            });

            previousButton.addEventListener('click', () => {
                clearInterval(intervalID); // Pause automatic cycling
                displayPreviousImage();
                intervalID = setInterval(displayNextImage, 3000); // Resume automatic cycling
            });

            // Automatic image cycling
            intervalID = setInterval(displayNextImage, 3000); // Change image every 3 seconds

            // Initial image display
            displayRandomImage();
        });

    function displayRandomImage() {
        if (imageList.length > 0) {
            const randomIndex = Math.floor(Math.random() * imageList.length);
            displayedImage.src = preloadedImages[randomIndex].src;
            currentImageIndex = randomIndex;
        }
    }

    function displayNextImage() {
        if (imageList.length > 0) {
            currentImageIndex = (currentImageIndex + 1) % imageList.length;
            displayedImage.src = preloadedImages[currentImageIndex].src;
        }
    }

    function displayPreviousImage() {
        if (imageList.length > 0) {
            currentImageIndex = (currentImageIndex - 1 + imageList.length) % imageList.length;
            displayedImage.src = preloadedImages[currentImageIndex].src;
        }
    }
});
