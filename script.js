fetch('entries.json')
  .then(response => response.json())
  .then(entries => {
    let entryArea = document.getElementsByClassName('entries-container')[0];
    let searchInput = document.getElementsByTagName('input')[0];
    
    // Function to filter entries
    const filterEntries = (searchTerm) => {
      // Split the search term on a comma
      let searchTerms = searchTerm.split(' ');
      // Clear any existing entries
      entryArea.innerHTML = '';
      // Loop through entries and display only the ones that match all search terms
      entries.forEach(entry => {
        let match = true;
        for (let term of searchTerms) {
          term = term.trim().toLowerCase();
          if (!entry.title.toLowerCase().includes(term) && 
              !entry.tags.some(tag => tag.toLowerCase().includes(term))) {
            match = false;
            break;
          }
        }
        if (match) {
          let entryDiv = document.createElement('div');
          entryDiv.classList.add("entry");
          entryDiv.innerHTML = `
            <h2>${entry.title}</h2>
            <img src="${entry.image}" alt="${entry.title}">
            <p>Tags: ${entry.tags.join(', ')}</p>
            <p>${entry.description}</p>
            <a href="${entry.link}">< Read More ></a>
          `;
          entryArea.appendChild(entryDiv);
        }
      });
    };
    
    // Call the filterEntries function when the input changes
    searchInput.addEventListener('input', () => {
      filterEntries(searchInput.value);
    });
    
    // Call the filterEntries function initially to display all entries
    filterEntries('');
  })
  .catch(error => console.error(error));
