const searchBar = document.getElementById('searchBar');
const itemsContainer = document.getElementById('itemsContainer');

document.addEventListener('DOMContentLoaded', () => {

    // Function to shuffle an array
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // Load items from data.json
    const loadData = async () => {
        try {
            const response = await fetch('data.json');
            const data = await response.json();

            // Load and display random items
            loadRandomItems(data);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    // Load and display random items
    const loadRandomItems = (data) => {
        const shuffledData = shuffleArray(data);

        let itemsToDisplay;
        const screenWidth = window.innerWidth;

        if (screenWidth > 1920) {
            itemsToDisplay = shuffledData.slice(0, 6);
        } else if (screenWidth >= 1440) {
            itemsToDisplay = shuffledData.slice(0, 16);
        } else if (screenWidth >= 768) {
            itemsToDisplay = shuffledData.slice(0, 8);
        } else {
            itemsToDisplay = shuffledData.slice(0, 4);
        }

        // Populate itemsContainer with data
        itemsContainer.innerHTML = itemsToDisplay.map(item => {
            const resolutionLinks = generateResolutionLinks(item.resolutions, item.image);
            return `
                <div class="item">
                    <a href="#" class="item-link" data-image-url="${item.image}">
                        <img src="${item.image}" alt="${item.description}">
                    </a>
                    <p>${item.description}</p>
                    <div class="resolution-options">
                        ${resolutionLinks}
                    </div>
                </div>
            `;
        }).join('');

        // Add event listeners to item links
        const itemLinks = document.querySelectorAll('.item-link');
        itemLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const imageUrl = link.getAttribute('data-image-url');
                openImageModal(imageUrl);
            });
        });
    };

    searchBar.addEventListener('input', () => {
        const searchTerms = searchBar.value.toLowerCase().split(' ');
        const allItems = Array.from(document.querySelectorAll('.item'));

        allItems.forEach(item => {
            const itemText = item.textContent.toLowerCase();
            const itemTags = item.querySelector('p').textContent.toLowerCase().split(' ');

            let shouldDisplay = true;

            for (const term of searchTerms) {
                if (!itemText.includes(term) && !itemTags.includes(term)) {
                    shouldDisplay = false;
                    break;
                }
            }

            item.style.display = shouldDisplay ? 'block' : 'none';
        });
    });

    const generateResolutionLinks = (resolutions) => {
        const resolutionLinks = Object.keys(resolutions).map(resolution => `
            <a href="${resolutions[resolution]}" class="resolution-link" target="_blank">${resolution}</a>
        `).join('');
    
        return `<div class="resolution-options">${resolutionLinks}</div>`;
    };

    // Initial data load
    loadData();
});
