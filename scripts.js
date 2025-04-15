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
    this.name = name;
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
// TODO: FIX HEIGHT WEIGHT SEARCH
const sortByNameBtn = document.getElementById("sort-by-name-btn");
const sortByIdBtn = document.getElementById("sort-by-id-btn");

// TODO: FIX HEIGHT WEIGHT SEARCH
const sortByHeightBtn = document.getElementById("sort-by-height-btn");
const sortByWeightBtn = document.getElementById("sort-by-weight-btn");

const sortByHpBtn = document.getElementById("sort-by-hp-btn");
const sortByAttackBtn = document.getElementById("sort-by-attack-btn");
const sortByDefenseBtn = document.getElementById("sort-by-defense-btn");
const sortBySpeedBtn = document.getElementById("sort-by-speed-btn");
const searchInput = document.getElementById("site-search-box");
const typeCheckboxes = document.getElementsByClassName("type-filter");
const deselectAllTypesBtn = document.getElementById("deslect-all-types");
const searchFilterBtn = document.getElementById("search-filter-btn");
const reverseListBtn = document.getElementById("reverse-list-btn");
const deleteBarInput = document.getElementById("delete-bar-input");
const deleteBtn = document.getElementById("delete-btn");

const toggleAdvancedSearchBtn = document.getElementById(
  "toggle-advanced-search-btn"
);

let pokemonArr = []; // Work on pokemonArr rather than display cards themselves.
const filters = {
  sortedByAttribute: "",
  searchInput: "",
  types: [],
};

main();

async function main() {
  data = await getData();
  storePokemonData(data);
  showCards(data);

  searchFilterBtn.addEventListener("click", applyFilters);
  reverseListBtn.addEventListener("click", handleReverseList);
  sortByNameBtn.addEventListener("click", function () {
    handleSort("name");
  });
  sortByIdBtn.addEventListener("click", function () {
    handleSort("id");
  });
  sortByHeightBtn.addEventListener("click", function () {
    handleSort("height");
  });

  sortByHpBtn.addEventListener("click", function () {
    handleSort("hp");
  });

  sortByAttackBtn.addEventListener("click", function () {
    handleSort("attack");
  });

  sortByDefenseBtn.addEventListener("click", function () {
    handleSort("defense");
  });

  sortBySpeedBtn.addEventListener("click", function () {
    handleSort("speed");
  });

  deselectAllTypesBtn.addEventListener("click", handleDeselectAllTypesBtn);
  deleteBtn.addEventListener("click", handleDeletion);
  toggleAdvancedSearchBtn.addEventListener("click", handleToggleAdvancedSearch);
}

async function getData() {
  const res = await fetch("./data/pokedex.json");
  const data = await res.json();
  return data;
}

function applyFilters() {
  storeFilters();
  const targetValue = filters.searchInput;
  const cards = document.getElementsByClassName("card");

  for (let i = 0; i < pokemonArr.length; i++) {
    const pm = pokemonArr[i];

    // Filter By Search Bar
    const searchBarMatch =
      pm.name.trim().toLowerCase().includes(targetValue) ||
      pm.species.trim().toLowerCase().includes(targetValue);

    // Filter by types
    const type1Match = filters.types.includes(pm.type1.toLowerCase());
    let type2Match = false;
    if (pm.type2 != null && filters.types.includes(pm.type2.toLowerCase()))
      type2Match = true;

    const typeMatch = type1Match || type2Match;

    if (searchBarMatch && typeMatch) cards[i].classList.remove("hidden");
    else cards[i].classList.add("hidden");
  }
}

function storeFilters() {
  filters.searchInput = searchInput.value.trim().toLowerCase(); // "Grab" string from searchbar
  filters.types = []; // Reset type filter
  // Instantiate Type Filter
  for (let i = 0; i < typeCheckboxes.length; i++) {
    if (typeCheckboxes[i].checked)
      filters.types.push(typeCheckboxes[i].value.toLowerCase());
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

function showCards(pokemon) {
  const cardContainer = document.getElementById("card-container");
  const templateCard = document.getElementById("template-card");

  // Clear all the cards on screen except the template
  cardContainer.innerHTML = "";
  cardContainer.appendChild(templateCard); // Keep the template in DOM but hidden

  for (let i = 0; i < pokemon.length; i++) {
    const nextCard = templateCard.cloneNode(true); // Copy the template card
    nextCard.removeAttribute("id"); // Remove "id= 'template-card' to avoid multiple templates"
    nextCard.classList.remove("hidden"); // Make card visible
    nextCard.classList.add("card"); // template-card is not part of card class to maintain invariants

    editCardContent(nextCard, pokemonArr[i]); // Edit title and image
    cardContainer.appendChild(nextCard); // Add new card to the container
  }
}

function editCardContent(card, pokemon) {
  let pokemonName = pokemon.name;
  let pokemonId = pokemon.id;
  let pokemonSpecies = pokemon.species;
  let pokemonType1 = pokemon.type1;
  let pokemonType2 = pokemon.type2;
  let imageURL = pokemon.sprite;
  let pokemonDescription = pokemon.description;

  // Set Pokemon Name
  const cardName = card.getElementsByClassName("pokemon-name")[0];
  cardName.textContent = pokemon.name;

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
}

function handleSort(attribute) {
  pokemonArr = quickSort(pokemonArr, attribute);
  filters.sortedByAttribute = attribute;
  //TODO: FIX THIS
  applyFilters();
}

function quickSort(arr, attribute) {
  if (arr.length <= 1) return arr;

  const pivotPokemon = arr[arr.length - 1];
  const pivot = pivotPokemon[attribute];

  const leftArr = [];
  const rightArr = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i][attribute] < pivot) {
      leftArr.push(arr[i]);
    } else {
      rightArr.push(arr[i]);
    }
  }

  return [
    ...quickSort(leftArr, attribute),
    pivotPokemon,
    ...quickSort(rightArr, attribute),
  ];
}

function handleReverseList() {
  pokemonArr = reverseList(pokemonArr);
  applyFilters();
}

function reverseList(arr) {
  let temp = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    temp.push(arr[i]);
  }
  return temp;
}

function handleToggleAdvancedSearch() {
  const advancedSearchBtn =
    document.getElementsByClassName("advanced-search")[0];
  advancedSearchBtn.classList.toggle("hidden");
}

function handleDeletion() {
  //TODO: HANDLE DELETION WITH BUTTON
  const target = deleteBarInput.value;
  console.log(target);
  deleteElementFromArr(pokemonArr, "name", target);
  showCards(pokemonArr);
  console.log(pokemonArr.length);
}

function handlePokemonAddition() {}

function deleteElementFromArr(arr, targetAttributeType, targetAttribute) {
  let i = 0;
  let found = false;
  for (; i < arr.length; i++) {
    if (arr[i][targetAttributeType] == targetAttribute) {
      found = true;
      break;
    }
  }

  if (found) {
    for (; i < arr.length - 1; i++) {
      arr[i] = arr[i + 1];
    }
    pokemonArr.pop();
  } else return false;
  return true;
}

function handleDeselectAllTypesBtn() {
  console.log(typeCheckboxes.length);
  let noValuesSelected = true;
  for (let i = 0; i < typeCheckboxes.length; i++) {
    if (typeCheckboxes[i].checked == true) {
      noValuesSelected = false;
      break;
    }
  }

  if (noValuesSelected) {
    for (let i = 0; i < typeCheckboxes.length; i++) {
      typeCheckboxes[i].checked = true;
    }
  } else {
    for (let i = 0; i < typeCheckboxes.length; i++) {
      typeCheckboxes[i].checked = false;
    }
  }
}
