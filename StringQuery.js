fetch('path/to/data.json')
  .then(response => response.json())
  .then(data => {
    // Get current URL
    let url = "http://10.100.29.33:5173/?n1=-2&n2=0&n3=-5&n4=3.22&n5=-2.12&n6=0&n7=1.41";
    let currentUrl = new URL(url);
    // Loop through the keys in the JSON data
    for (const key in data) {
      // Check if key exists in URL searchParams
      if (currentUrl.searchParams.has(key)) {
        // Set the query parameter value to the value from the JSON data
        currentUrl.searchParams.set(key, data[key]);
      }
    }
    // Update the URL
    url = currentUrl;
    console.log(url)
  });
