document.addEventListener('DOMContentLoaded', function() {
    const recommendationsContainer = document.getElementById('recommendations-container');

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(recommendation => {
                const { name, description, imageUrl } = recommendation;

                // Create recommendation element
                const recommendationDiv = document.createElement('div');
                recommendationDiv.classList.add('recommendation');

                // Create image element
                const image = document.createElement('img');
                image.src = imageUrl;
                image.alt = name;

                // Create heading element
                const heading = document.createElement('h3');
                heading.textContent = name;

                // Create description paragraph
                const descriptionPara = document.createElement('p');
                descriptionPara.textContent = description;

                // Append elements to recommendation div
                recommendationDiv.appendChild(image);
                recommendationDiv.appendChild(heading);
                recommendationDiv.appendChild(descriptionPara);

                // Append recommendation div to container
                recommendationsContainer.appendChild(recommendationDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching recommendations:', error);
        });
});

// Event listener for form submission (Search button)
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get input value and normalize to lowercase
    let searchTerm = document.getElementById('searchInput').value.toLowerCase();

    // Example keywords to match variations
    const keywords = {
        'beach': ['beach', 'beaches'],
        'temple': ['temple', 'temples'],
        'country': ['country', 'countries']
    };

    // Check which keyword matches the search term
    let category = null;
    Object.keys(keywords).forEach(key => {
        if (keywords[key].includes(searchTerm)) {
            category = key;
        }
    });

    // If a category is found, display results
    if (category) {
        displayResults(category);
    } else {
        alert('No matching category found for: ' + searchTerm);
    }
});

// Function to display search results (dummy function)
function displayResults(category) {
    // Dummy function to simulate displaying results
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = `<p>Displaying results for ${category}</p>`;
}

// Reset button functionality
document.getElementById('resetButton').addEventListener('click', function() {
    document.getElementById('searchInput').value = ''; // Clear input field
    document.getElementById('searchResults').innerHTML = ''; // Clear search results
});

// Event listener for form submission (Search button)
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get input value and normalize to lowercase
    let searchTerm = document.getElementById('searchInput').value.toLowerCase();

    // Fetch data from JSON file or API
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            // Determine the category based on searchTerm
            let category = null;
            if (searchTerm.includes('beach')) {
                category = 'beach';
            } else if (searchTerm.includes('temple')) {
                category = 'temple';
            } else if (searchTerm.includes('country')) {
                category = 'country';
            } else {
                alert('No matching category found for: ' + searchTerm);
            }

            // Display results if category is found
            if (category) {
                displayResults(data[category]);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

// Function to display search results
function displayResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = ''; // Clear previous results

    results.forEach(result => {
        // Create HTML for each result
        const resultElement = document.createElement('div');
        resultElement.classList.add('result');

        resultElement.innerHTML = `
            <img src="${result.imageUrl}" alt="${result.name}">
            <h3>${result.name}</h3>
            <p>${result.description}</p>
        `;

        resultsContainer.appendChild(resultElement);
    });
}

// Reset button functionality
document.getElementById('resetButton').addEventListener('click', function() {
    document.getElementById('searchInput').value = ''; // Clear input field
    document.getElementById('searchResults').innerHTML = ''; // Clear search results
});

