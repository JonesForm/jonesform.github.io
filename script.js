const searchBar = document.getElementById('searchBar');
const itemsContainer = document.getElementById('itemsContainer');
const tagBar = document.getElementById('tagBar');

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

        // Populate tagBar with unique tags (sorted alphabetically)
        const allTags = data.flatMap(item => item.tag.split(" "));
        const uniqueTagsSet = new Set(allTags);
        const tags = Array.from(uniqueTagsSet).sort();
        tagBar.innerHTML = tags.map(tag => `<a href="#" class="tag-link">${tag}</a>`).join('');

        // Load and display random items
        loadRandomItems(data);
    } catch (error) {
        console.error('Error loading data:', error);
    }
};

// Event listener for clicking on tags
tagBar.addEventListener('click', (event) => {
    if (event.target.classList.contains('tag-link')) {
        event.preventDefault();
        const clickedTag = event.target.textContent;

        // Add clicked tag to the search bar
        searchBar.value = clickedTag;

        // Filter items based on clicked tag and related tags
        const relatedTags = clickedTag.split(' ');
        performSearch(relatedTags);
    }
});

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
    itemsContainer.innerHTML = itemsToDisplay.map(item => `
        <div class="item">
            <a href="#">
                <img class="lazyload" src="${item.image}" alt="${item.description}" data-original-src="${item.image}" loading="lazy">
            </a>
            <p>${item.description}</p>
            <div class="resolution-options">
                ${generateResolutionLinks(item.resolutions)}
            </div>
        </div>
    `).join('');
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

const performSearch = (tags) => {
    const allItems = Array.from(document.querySelectorAll('.item'));

    allItems.forEach(item => {
        const itemTags = item.querySelector('p').textContent.split(' ');
        const shouldDisplay = tags.every(tag => itemTags.includes(tag));

        if (shouldDisplay) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
};

const generateResolutionLinks = (resolutions) => {
    const resolutionLinks = Object.keys(resolutions).map(resolution => `
        <a href="${resolutions[resolution]}" target="_blank" class="resolution-link">${resolution}</a>
    `).join('');

    return `<div class="resolution-options">${resolutionLinks}</div>`;
};

// Initial data load
loadData();
