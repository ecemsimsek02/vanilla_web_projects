const pages = {
  "e-Hizmetler": [
    { title: "Öğrenci Belgesi", url: "ogrenci_belgesi.html" },
    { title: "Adres Değişikliği", url: "adres_degistirme.html" },
    { title: "Öğrenci Kimliği", url: "ogrenci_kimliği.html" },
    { title: "Öğrenci Üyelik", url: "ogrenci_uyelik.html" },
  ],
  "Kurum Portalları": [
    { title: "Kurum Portalı Ana Sayfa", url: "kurum_portali.html" },
    { title: "Personel İşlemleri", url: "personel.html" }
  ],
  "Belediye Hizmetleri": [
    { title: "Çöp Toplama Takvimi", url: "cop_toplama.html" },
    { title: "Belediye Duyuruları", url: "duyurular.html" }
  ],
   "Kurumların Sunduğu": [
    { title: "İkametgah", url: "ikametgah.html" },
   
  ],
   "Kurum Adında Ara": [
    { title: "Adli Sicil", url: "adli_sicil.html" },

  ],
   "Belediye Adında Ara": [
    { title: "Belediye Şikayet", url: "belediye_sikayet.html" },

  ],
};

const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get('search')?.toLowerCase() || '';

const categoriesContainer = document.getElementById('categories');
const resultsContainer = document.getElementById('results');
const searchTermDisplay = document.getElementById('searchTerm');

let activeCategory = null; // Başlangıçta tüm kategoriler gösterilecek

searchTermDisplay.textContent = searchTerm || '(Boş)';

function renderCategories() {
  categoriesContainer.innerHTML = '';
  Object.keys(pages).forEach(cat => {
    const span = document.createElement('span');
    span.textContent = cat;
    span.style.cursor = 'pointer';
    if (cat === activeCategory) span.classList.add('active');

    span.addEventListener('click', () => {
      if (activeCategory === cat) {
        activeCategory = null; // Kategoriyi iptal et, tümünü göster
      } else {
        activeCategory = cat;
      }
      renderCategories();
      performSearch();
    });

    categoriesContainer.appendChild(span);
  });
}

function performSearch() {
  let results = [];

  if (activeCategory) {
    results = pages[activeCategory].filter(p =>
      p.title.toLowerCase().includes(searchTerm)
    );
  } else {
    results = [];
    Object.values(pages).forEach(list => {
      results.push(...list.filter(p => p.title.toLowerCase().includes(searchTerm)));
    });
  }

  renderResults(results);
}

function renderResults(results) {
  resultsContainer.innerHTML = '';
  if (results.length === 0) {
    resultsContainer.textContent = 'Sonuç bulunamadı.';
    return;
  }

  results.forEach(item => {
    const div = document.createElement('div');
    const a = document.createElement('a');
    a.href = item.url;
    a.textContent = item.title;
    div.appendChild(a);
    resultsContainer.appendChild(div);
  });
}


renderCategories();
performSearch();