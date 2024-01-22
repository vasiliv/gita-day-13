const poke_container = document.getElementById('poke-container');
const pokemon_count = 30;

const colors = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};

const main_types = Object.keys(colors)

const fetchPokemon = async () => {
    for (let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i)
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    //console.log(url)
    const res = await fetch(url)
    const data = await res.json()    
    createPokemonCard(data)
}

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div')
    pokemonEl.setAttribute('id', pokemon.id)

    pokemonEl.classList.add('pokemon')   

    const id = pokemon.id.toString().padStart(3, '0')    

    const name = pokemon.name    
    
    const poke_type = pokemon.types.map(type => type.type.name)
    
    const type = main_types.find(type => poke_type.indexOf(type) > -1)
    
    const color = colors[type]    

    pokemonEl.style.backgroundColor = color

    const pokemonInnerHtml = `
    <span class="number">#${id}</span>
            <div class="img_container">
                <img src="${pokemon?.sprites?.other?.dream_world?.front_default}" >
            </div>
            <div class="info">
               
                <h3 class="name">${name}</h3>
                <small class="type">type : ${type}</small>
            </div>
        
    `
    pokemonEl.innerHTML = pokemonInnerHtml
    poke_container?.appendChild(pokemonEl)
}

var contextMenu = document.getElementById('contextMenu');


fetchPokemon()

var cards = document.getElementsByClassName('pokemon');
// var cards = document.querySelectorAll('pokemon')
console.log(cards)  


cards.forEach(function (card) {    
    card.addEventListener('contextmenu', function (event) {    
        event.preventDefault();

        // Get the data-card-id attribute value (card ID)        
        currentCardId =  document.getElementById("id");
        console.log(currentCardId)
        document.getElementById('contextMenu').setAttribute('data-id', event.target.id)
        // Position the context menu at the mouse coordinates
        contextMenu.style.left = event.pageX + 'px';
        contextMenu.style.top = event.pageY + 'px';

        // Show the context menu
        contextMenu.style.display = 'block';
    });
});

function handleMenuItemClick(item) {
    // Handle the click on a menu item
    // alert('Clicked on card ' + currentCardId);
    // console.log(item)
    // let id = document.getElementById('contextMenu').getAttribute('data-id')
    if(item == 'fullDescription'){        
        alert('card with ID: ' + currentCardId);
    //     await getPokemon(id)
    //     console.log(id)
    } else if (item == 'addToTeam'){
        alert('addToTeam clicked')
    }

    // Hide the context menu
    contextMenu.style.display = 'none';
  }