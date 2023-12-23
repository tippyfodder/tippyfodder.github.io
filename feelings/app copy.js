function fetchXRPPrice() {
    // Create a timestamp to serve as a cache-busting parameter
    const timestamp = new Date().getTime();
    const apiUrl = `https://api.coingecko.com/api/v3/coins/ripple/market_chart?vs_currency=usd&days=1&_=${timestamp}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const priceData = data.prices;
        const currentPrice = priceData[priceData.length - 1][1];
        const previousPrice = priceData[0][1];
  
        // Calculate the percentage change
        const priceChangePercentage = ((currentPrice - previousPrice) / previousPrice) * 100;
  
        // Get the <html> element
        const htmlElement = document.documentElement;
  
        // Get the #price element
        const priceElement = document.getElementById("price");
  
        // Remove all classes from <html>
        htmlElement.classList.remove("is-green", "is-red", "is-more-green", "is-more-red", "is-extra-green", "is-extra-red", "is-psyop");
  
        // Remove the previous content from #price
        priceElement.textContent = '';
  
        // Determine the class to apply
        if (priceChangePercentage > 5) {
          // Price has gone up more than 5%
          htmlElement.classList.add("is-extra-green");
        } else if (priceChangePercentage < -5) {
          // Price has gone down more than 5%
          htmlElement.classList.add("is-extra-red");
        } else if (priceChangePercentage > 2) {
          // Price has gone up more than 2%
          htmlElement.classList.add("is-more-green");
        } else if (priceChangePercentage < -2) {
          // Price has gone down more than 2%
          htmlElement.classList.add("is-more-red");
        } else if (priceChangePercentage > 1) {
          // Price has gone up more than 1%
          htmlElement.classList.add("is-green");
        } else if (priceChangePercentage < -1) {
          // Price has gone down more than 1%
          htmlElement.classList.add("is-red");
        }
  
        // Check if the price contains specific numbers
        const specificNumbers = [606, 13, 11, 589, 69, 420];
        if (specificNumbers.includes(currentPrice)) {
          htmlElement.classList.add("is-psyop");
        }
  
        // Update the displayed price 
        priceElement.textContent = currentPrice.toFixed(3);
      })
      .catch(error => {
        console.error('Error fetching XRP price:', error);
      });
  }
document.getElementById("price-wrap").addEventListener("click", function () {
    const htmlElement = document.documentElement; 
    htmlElement.classList.toggle("is-bear");
});

  
  fetchXRPPrice();
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