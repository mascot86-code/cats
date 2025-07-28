
// Перед началом, раскоментировать массив, чтобы записать значения в localStorage

// const cats = [
//   {
//     "id": "18t",
//     "url": "https://cdn2.thecatapi.com/images/18t.gif",
//     "width": 307,
//     "height": 139,
//     "isFavorite": true
//   },
//   {
//     "id": "5d6",
//     "url": "https://cdn2.thecatapi.com/images/5d6.jpg",
//     "width": 500,
//     "height": 368,
//     "isFavorite": false
//   },
//   {
//     "id": "8ro",
//     "url": "https://cdn2.thecatapi.com/images/8ro.jpg",
//     "width": 600,
//     "height": 399,
//     "isFavorite": false
//   },
//   {
//     "id": "9qk",
//     "url": "https://cdn2.thecatapi.com/images/9qk.jpg",
//     "width": 560,
//     "height": 746,
//     "isFavorite": false
//   },
//   {
//     "id": "bjt",
//     "url": "https://cdn2.thecatapi.com/images/bjt.jpg",
//     "width": 628,
//     "height": 471,
//     "isFavorite": false
//   },
//   {
//     "id": "cdm",
//     "url": "https://cdn2.thecatapi.com/images/cdm.jpg",
//     "width": 671,
//     "height": 1000,
//     "isFavorite": false
//   },
//   {
//     "id": "dbk",
//     "url": "https://cdn2.thecatapi.com/images/dbk.jpg",
//     "width": 500,
//     "height": 332,
//     "isFavorite": false
//   },
//   {
//     "id": "df1",
//     "url": "https://cdn2.thecatapi.com/images/df1.jpg",
//     "width": 2896,
//     "height": 1944,
//     "isFavorite": false
//   },
//   {
//     "id": "MTYyMTYwOQ",
//     "url": "https://cdn2.thecatapi.com/images/MTYyMTYwOQ.jpg",
//     "width": 960,
//     "height": 574,
//     "isFavorite": false
//   },
//   {
//     "id": "MTgxODI2MA",
//     "url": "https://cdn2.thecatapi.com/images/MTgxODI2MA.jpg",
//     "width": 600,
//     "height": 800,
//     "isFavorite": false
//   }
// ]

const catsList = document.querySelector('#cats-list')
const cats = getState() // Закоментировать перед записью массива в localStorage
const favoritesText = document.querySelector('#favorites')
const favoritesContent = document.querySelector('.favorites-inner')
const favoritesList = document.querySelector('.favorites-cats')
const preloader = document.querySelector('#preloader')

setTimeout(() => {
  preloader.remove()
}, 3000)

if (cats.length == 0) {
  document.querySelector('body').innerHTML = `<div class="no-cats"><img src="cry.png"> <h1> No cats found </h1></div>`
}



catsList.addEventListener('click', changeFavoriteStatus)

function render() {
  catsList.innerHTML = cats.map(toCat).join('')
  renderFavorites()
}

function toCat(cat) {
  return `
  
  <img class="cat-img ${cat.isFavorite ? ' favorite' : ''}" src="${cat.url}" data-id=${cat.id}>
  
  `
}


function changeFavoriteStatus(event) {
  if (event.target.classList.contains('cat-img')) {
    const catId = event.target.dataset.id
    const cat = cats.find(cat => cat.id === catId)
    cat.isFavorite = !cat.isFavorite
    setState()
    render()
  }
}

function getFavorites(cats) {
  return cats.filter(cat => cat.isFavorite)
}

function renderFavorites() {
  const favorites = getFavorites(cats)
  if (favorites.length == 0) {
    favoritesText.textContent = 'No favorites'
    favoritesContent.innerHTML = ''
    favoritesList.style.display = 'none'
    setState()
  } else {
    favoritesText.innerHTML = `<img src="star.png" alt="Favorite icon"> Favorites cats (${favorites.length})`
    favoritesContent.innerHTML = favorites.map(toCat).join('')
    favoritesList.style.display = 'block'
  }
}


function setState() {
  localStorage.setItem('cats', JSON.stringify(cats))
}

function getState() {
  const row = localStorage.getItem('cats')
  return row ? JSON.parse(row) : []
}

render()


