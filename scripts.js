class Pokemon {
  constructor(
    name,
    id,
    species,
    type1,
    type2,
    sprite,
    description,
    height,
    weight,
    hp,
    attack,
    defense,
    speed
  ) {
    this.nameVar = name;
    this.id = id;
    this.species = species;
    this.type1 = type1;
    this.type2 = type2;
    this.sprite = sprite;
    this.description = description;
    this.height = height;
    this.weight = weight;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.speed = speed;
  }
}

// "Grab" HTML elements and make them interative
document
  .getElementsByClassName("search-btn")[0]
  .addEventListener("click", searchPokemon);

const checkboxes = document.getElementsByClassName("type-filter");

let pokemonArr = [];
let cards = document.querySelectorAll(".card");;
main();

async function main() {
  data = await getData();
  showCards(data);
}

async function getData() {
  const res = await fetch("./data/pokedex.json");
  const data = await res.json();
  storePokemonData(data);

  return data;
}

function searchPokemon() {
  const targetName = document
    .getElementById("site-search")
    .value.trim()
    .toLowerCase();

  if (targetName == "") {
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.remove("hidden");
    }
  } else {
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const searchName = card
        .getElementsByClassName("pokemon-name")[0]
        .textContent.trim()
        .toLowerCase();
      if (searchName !== targetName) card.classList.add("hidden");
      else card.classList.remove("hidden");
    }
  }
}

function storePokemonData(data) {
  for (let i = 0; i < data.length; i++) {
    let temp = data[i];
    pokemonArr[i] = new Pokemon(
      temp.name.english,
      temp.id,
      temp.species,
      temp.type[0],
      temp.type[1],
      temp.image.sprite,
      temp.description,
      temp.profile.height,
      temp.profile.weight,
      temp.base.HP,
      temp.base.Attack,
      temp.base.Defense,
      temp.base.Speed
    );
  }
}

// This function adds cards the page to display the data in the array
function showCards(pokemon) {
  const cardContainer = document.getElementById("card-container");
  const templateCard = document.querySelector(".card");

  for (let i = 1; i < pokemon.length; i++) {
    // Copy the template card
    const nextCard = templateCard.cloneNode(true);

    // Edit title and image
    editCardContent(nextCard, pokemonArr[i]);
    cardContainer.appendChild(nextCard); // Add new card to the container
  }
}

function editCardContent(card, pokemon) {
  let pokemonName = pokemon.nameVar;
  let pokemonId = pokemon.id;
  let pokemonSpecies = pokemon.species;
  let pokemonType1 = pokemon.type1;
  let pokemonType2 = pokemon.type2;
  let imageURL = pokemon.sprite;
  let pokemonDescription = pokemon.description;

  // Set Pokemon Name
  const cardName = card.getElementsByClassName("pokemon-name")[0];
  cardName.textContent = pokemon.nameVar;

  // Set and Format Pokemon ID
  const cardId = card.getElementsByClassName("pokemon-id")[0];
  if (pokemonId < 10) pokemonId = "00" + pokemonId;
  else if (pokemonId < 100) pokemonId = "0" + pokemonId;
  cardId.textContent = "#" + pokemonId;

  // Set Pokemon Species
  const cardSpecies = card.getElementsByClassName("pokemon-species")[0];
  cardSpecies.textContent = pokemonSpecies;

  // Set Pokemon Type1
  const cardType1 = card.getElementsByClassName("pokemon-type primary")[0];
  cardType1.textContent = pokemonType1;

  // Set and Format Pokemon Type2
  const cardType2 = card.getElementsByClassName("pokemon-type secondary")[0];
  if (pokemonType2 != null) cardType2.textContent = pokemonType2;
  else cardType2.textContent = "n/a";

  // Set Pokemon Sprite
  const cardImage = card.querySelector("img");
  cardImage.src = imageURL;
  cardImage.alt = pokemonName + " Sprite";

  // Set Pokemon Description
  const cardDescription = card.getElementsByClassName("pokemon-description")[0];
  cardDescription.textContent = pokemonDescription;

  // Set Profile
  card.getElementsByClassName("pokemon-height")[0].textContent =
    "Height: " + pokemon.height;
  card.getElementsByClassName("pokemon-weight")[0].textContent =
    "Weight: " + pokemon.weight;

  // Unfortunately Newer Pokemon Do NOT have their base stats available
  // Check to see if they're available, if NOT --> display N/A
  card.getElementsByClassName("pokemon-attack")[0].textContent =
    "Attack: " + pokemon.attack;
  card.getElementsByClassName("pokemon-hp")[0].textContent =
    "HP: " + pokemon.hp;
  card.getElementsByClassName("pokemon-defense")[0].textContent =
    "Defense: " + pokemon.defense;
  card.getElementsByClassName("pokemon-speed")[0].textContent =
    "Speed: " + pokemon.speed;

  // You can use console.log to help you debug!
  // View the output by right clicking on your website,
  // select "Inspect", then click on the "Console" tab
  console.log("new card:", pokemon.name, "- html: ", card);
  // This calls the addCards() function when the page is first loaded
  document.addEventListener("DOMContentLoaded", showCards);
}

/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */
/*
const FRESH_PRINCE_URL =
  "https://upload.wikimedia.org/wikipedia/en/3/33/Fresh_Prince_S1_DVD.jpg";
const CURB_POSTER_URL =
  "https://m.media-amazon.com/images/M/MV5BZDY1ZGM4OGItMWMyNS00MDAyLWE2Y2MtZTFhMTU0MGI5ZDFlXkEyXkFqcGdeQXVyMDc5ODIzMw@@._V1_FMjpg_UX1000_.jpg";
const EAST_LOS_HIGH_POSTER_URL =
  "https://static.wikia.nocookie.net/hulu/images/6/64/East_Los_High.jpg";

// This is an array of strings (TV show titles)
let titles = [
  "Fresh Prince of Bel Air",
  "Curb Your Enthusiasm",
  "East Los High",
  "Bruh Borger",
];
// Your final submission should have much more data than this, and
// you should use more than just an array of strings to store it all.

// This function adds cards the page to display the data in the array
function showCards() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");

  for (let i = 0; i < titles.length; i++) {
    let title = titles[i];

    // This part of the code doesn't scale very well! After you add your
    // own data, you'll need to do something totally different here.
    let imageURL = "";
    if (i == 0) {
      imageURL = FRESH_PRINCE_URL;
    } else if (i == 1) {
      imageURL = CURB_POSTER_URL;
    } else if (i == 2) {
      imageURL = EAST_LOS_HIGH_POSTER_URL;
    }

    const nextCard = templateCard.cloneNode(true); // Copy the template card
    editCardContent(nextCard, title, imageURL); // Edit title and image
    cardContainer.appendChild(nextCard); // Add new card to the container
  }
}

function editCardContent(card, newTitle, newImageURL) {
  card.style.display = "block";

  const cardHeader = card.querySelector("h2");
  cardHeader.textContent = newTitle;

  const cardImage = card.querySelector("img");
  cardImage.src = newImageURL;
  cardImage.alt = newTitle + " Poster";

  // You can use console.log to help you debug!
  // View the output by right clicking on your website,
  // select "Inspect", then click on the "Console" tab
  console.log("new card:", newTitle, "- html: ", card);
}

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards);

function quoteAlert() {
  console.log("Button Clicked!");
  alert(
    "I guess I can kiss heaven goodbye, because it got to be a sin to look this good!"
  );
}

function removeLastCard() {
  titles.pop(); // Remove last item in titles array
  showCards(); // Call showCards again to refresh
}
*/
