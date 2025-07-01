
const searchInput = document.getElementById('search');
const results = document.getElementById('results');
const tags = document.querySelectorAll('.tag');
const createList = document.getElementById('createList');
const popularList = document.getElementById('popular');
let selectedFilm = null;

let currentType = 'films';
let apiKey = '2fcaeeb540b2938068606e835ad80007';

function updateResults(query) {
  if (!query) {
    results.innerHTML = '';
    return;
  }


  let endpoint = '';
  if (currentType === 'films') endpoint = 'movie';
  else if (currentType === 'series') endpoint = 'tv';
  else {
    results.innerHTML = '<div>API search is only supported for films and series.</div>';
    return;
  }

  fetch(`https://api.themoviedb.org/3/search/${endpoint}?api_key=${apiKey}&query=${query}`)
    .then(res => res.json())
    .then(data => {
      if (!data.results || data.results.length === 0) {
        results.innerHTML = '<div>No results found</div>';
        return;
      }

     results.innerHTML = '';
data.results.forEach(item => {
  const name = item.title || item.name;

  const div = document.createElement('div');
  div.innerHTML = `${name} <button class="add-btn">+</button>`;

  const btn = div.querySelector('.add-btn');
  btn.addEventListener('click', () => addToFavorites(name));

  results.appendChild(div);
});
    })
    
}


function saveSearchTerm(term) {
  let searches = JSON.parse(localStorage.getItem('recent_searches')) || [];
  if (!searches.includes(term)) {
    searches.unshift(term);
    if (searches.length > 5) searches = searches.slice(0, 5);
    localStorage.setItem('recent_searches', JSON.stringify(searches));
    renderPopularSearches();
  }
}
function renderPopularSearches() {
  const lists = JSON.parse(localStorage.getItem('favoriteLists')) || [];


  const allItems = lists.map(list => list.items).flat();
  const uniqueItems = [...new Set(allItems)];

  if (uniqueItems.length === 0) {
    popularList.innerHTML = "<li>No items added yet</li>";
  } else {
    popularList.innerHTML = uniqueItems
      .map(item => `<li>${item}</li>`)
      .join('');
  }
}
searchInput.addEventListener('input', e => {
  updateResults(e.target.value);
});

tags.forEach(tag => {
  tag.addEventListener('click', () => {
    tags.forEach(t => t.classList.remove('active'));
    tag.classList.add('active');
    currentType = tag.getAttribute('data-type');
    createList.innerText = `Create Favorite ${capitalize(currentType)} List`;
    updateResults(searchInput.value);
  });
});

document.getElementById('createList').addEventListener('click', () => {
  document.getElementById('listModal').classList.remove('hidden');
});

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
searchInput.addEventListener('focus', () => {
  document.querySelector('.search-extended').classList.remove('hidden');
});


document.getElementById('saveListBtn').addEventListener('click', () => {
  const name = document.getElementById('listNameInput').value.trim();
  if (!name) return alert("List name cannot be empty");

  let lists = JSON.parse(localStorage.getItem('favoriteLists')) || [];


  if (!Array.isArray(lists)) {
    lists = Object.entries(lists).map(([key, items]) => ({
      listName: key,
      type: currentType || 'films',
      items: items
    }));
  }

  if (lists.some(l => l.listName === name)) {
    return alert("List already exists");
  }

  lists.push({
    listName: name,
    type: currentType || 'films',
    items: []
  });

  localStorage.setItem('favoriteLists', JSON.stringify(lists));
  window.location.href = 'favorite.html';
});

function addToFavorites(item) {
  let lists = JSON.parse(localStorage.getItem('favoriteLists')) || [];
  if (lists.length === 0) {
    return alert("No lists found. Please create one first.");
  }

  selectedFilm = item;
  const dropdown = document.getElementById('listSelectDropdown');
  dropdown.innerHTML = lists
    .map(list => `<option value="${list.listName}">${list.listName}</option>`)
    .join('');

  document.getElementById('chooseListModal').classList.remove('hidden');
}

document.getElementById('confirmAddBtn').addEventListener('click', () => {
  const selectedListName = document.getElementById('listSelectDropdown').value;
  let lists = JSON.parse(localStorage.getItem('favoriteLists')) || [];

  const index = lists.findIndex(l => l.listName === selectedListName);
  if (index === -1) return;

  if (!lists[index].items.includes(selectedFilm)) {
    lists[index].items.push(selectedFilm);
    localStorage.setItem('favoriteLists', JSON.stringify(lists));
    alert(`${selectedFilm} added to "${selectedListName}"`);
  } else {
    alert(`${selectedFilm} is already in "${selectedListName}"`);
  }

  selectedFilm = null;
  document.getElementById('chooseListModal').classList.add('hidden');
});


document.addEventListener('click', (e) => {
  const searchArea = document.querySelector('.search-area');
  const modals = document.querySelectorAll('.modal');

  if (searchArea.contains(e.target)) return;
  if ([...modals].some(modal => modal.contains(e.target))) return;

  document.querySelector('.search-extended').classList.add('hidden');
});

renderPopularSearches();
