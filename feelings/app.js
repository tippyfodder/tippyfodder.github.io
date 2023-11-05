function fetchXRPPrice() {
    fetch('https://api.coingecko.com/api/v3/coins/ripple/market_chart?vs_currency=usd&days=1')
        .then(response => response.json())
        .then(data => {
        const priceData = data.prices;
        const currentPrice = priceData[priceData.length - 1][1];
        const previousPrice = priceData[0][1];

        // Calculate the percentage change
        const priceChangePercentage = ((currentPrice - previousPrice) / previousPrice) * 100;

        // Get the #price-wrap element
        const priceWrapElement = document.getElementById("price-wrap");

        // Get the #price element
        const priceElement = document.getElementById("price");

        // Remove all classes from #price-wrap
        priceWrapElement.classList.remove("is-green", "is-red", "is-more-green", "is-more-red", "is-extra-green", "is-extra-red", "is-psyop");

        // Remove the previous content from #price
        priceElement.textContent = '';

        // Check if the price contains specific numbers
        const specificNumbers = [606, 13, 11, 589, 69, 420];
        if (specificNumbers.includes(currentPrice)) {
            priceWrapElement.classList.add("is-psyop");
            return;
        }

        // Determine the class to apply
        switch (true) {
            case priceChangePercentage > 5:
            // Price has gone up more than 5%
            priceWrapElement.classList.add("is-extra-green");
            break;
            case priceChangePercentage < -5:
            // Price has gone down more than 5%
            priceWrapElement.classList.add("is-extra-red");
            break;
            case priceChangePercentage > 2:
            // Price has gone up more than 2%
            priceWrapElement.classList.add("is-more-green");
            break;
            case priceChangePercentage < -2:
            // Price has gone down more than 2%
            priceWrapElement.classList.add("is-more-red");
            break;
            case priceChangePercentage > .01:
            // Price has gone up more than 1%
            priceWrapElement.classList.add("is-green");
            break;
            case priceChangePercentage < -.01:
            // Price has gone down more than 1%
            priceWrapElement.classList.add("is-red");
        }

        priceElement.textContent = currentPrice.toFixed(3);
        })
        .catch(error => {
        console.error('Error fetching XRP price:', error);
        });
    }

    // Fetch XRP price and apply classes on page load
    fetchXRPPrice();

    // Fetch XRP price and apply classes periodically
    setInterval(fetchXRPPrice, 60000); // Fetch every 60 seconds (adjust as needed)


// ## PWA install 
// Check if the browser supports the 'beforeinstallprompt' event
if ('BeforeInstallPromptEvent' in window) {
    window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); // Prevent the default browser prompt
    const installButton = document.getElementById('installButton');
    installButton.style.display = 'block';

    installButton.addEventListener('click', () => {
        e.prompt(); // Show the installation prompt to the user
        installButton.style.display = 'none';
    });
    });
}