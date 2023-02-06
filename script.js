const contentsContainer = document.querySelector('.contents');
fetch('contents.json')
  .then(response => response.json())
  .then(data => {
    const menu = document.createElement('ul');
    menu.classList.add('content-menu');
    document.body.appendChild(menu);

    for (const content of data.contents) {
      const menuItem = document.createElement('li');
      menuItem.textContent = content.title;
      menuItem.addEventListener('click', () => {
        document.querySelector(`[data-id="${content.id}"]`).scrollIntoView();
      });
      menu.appendChild(menuItem);

      const contentEl = document.createElement('div');
      contentEl.classList.add('entry-container');
      contentEl.setAttribute('data-id', content.id);

      const img = document.createElement('img');
      img.src = content.image;
      contentEl.appendChild(img);

      const titleEl = document.createElement('h2');
      titleEl.textContent = content.title;
      contentEl.appendChild(titleEl);

      const descriptionEl = document.createElement('p');
      descriptionEl.textContent = content.description;
      contentEl.appendChild(descriptionEl);

      const linkEl = document.createElement('a');
      linkEl.textContent = 'Read More';
      linkEl.href = content.link;
      contentEl.appendChild(linkEl);

      contentsContainer.appendChild(contentEl);
    }
  });

// Get the contents menu item and contents menu container
const contentsMenuItem = document.querySelector("#contents-menu-item");
const contentsMenu = document.querySelector("#contents-menu");

// When the contents menu item is clicked, toggle the visibility of the contents menu container
contentsMenuItem.addEventListener("click", function() {
  contentsMenu.classList.toggle("show");
});

// When clicking outside the contents menu container, hide the contents menu container
window.addEventListener("click", function(event) {
  if (!event.target.matches("#contents-menu-item")) {
    contentsMenu.classList.remove("show");
  }
});


const contentsLink = document.querySelector('.contents-link');
let menuOpen = false;

contentsLink.addEventListener('click', e => {
  e.preventDefault();

  if (!menuOpen) {
    const menu = document.createElement('div');
    menu.classList.add('contents-menu');

    fetch('contents.json')
      .then(response => response.json())
      .then(data => {
        for (const content of data.contents) {
          const menuItem = document.createElement('a');
          menuItem.classList.add('contents-menu-item');
          menuItem.textContent = content.title;
          menuItem.href = '#' + content.id;

          menu.appendChild(menuItem);
        }
      });

    contentsLink.appendChild(menu);
    menuOpen = true;
  } else {
    contentsLink.removeChild(contentsLink.lastElementChild);
    menuOpen = false;
  }
});

document.addEventListener('click', e => {
  if (!e.target.classList.contains('contents-link') && menuOpen) {
    contentsLink.removeChild(contentsLink.lastElementChild);
    menuOpen = false;
  }
});
document.querySelector(".contents-link").addEventListener("click", function(e) {
  e.preventDefault();
  document.querySelector(".contents-menu").classList.toggle("show");
});