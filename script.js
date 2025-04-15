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

const filters = {
  searchInput: "",
  types: [],
};

// Sort By UI
const sortByNameBtn = document.getElementById("sort-by-name-btn");
const sortByIdBtn = document.getElementById("sort-by-id-btn");
// TODO: FIX HEIGHT WEIGHT SORT
const sortByHeightBtn = document.getElementById("sort-by-height-btn");
const sortByWeightBtn = document.getElementById("sort-by-weight-btn");
const sortByHpBtn = document.getElementById("sort-by-hp-btn");
const sortByAttackBtn = document.getElementById("sort-by-attack-btn");
const sortByDefenseBtn = document.getElementById("sort-by-defense-btn");
const sortBySpeedBtn = document.getElementById("sort-by-speed-btn");
const reverseListBtn = document.getElementById("reverse-list-btn");
// Filter By UI
const typeCheckboxes = document.getElementsByClassName("type-filter");
const deselectAllTypesBtn = document.getElementById("deslect-all-types");
// Compact Menu UI
const compactMenu = document.getElementsByClassName("main-menu")[0];
const expandMenuButton = document.getElementById("toggle-main-menu-btn");
const searchInput = document.getElementById("site-search-box");
const searchFilterBtn = document.getElementById("search-filter-btn");

const deleteBarInput = document.getElementById("delete-bar-input");
const deleteBtn = document.getElementById("delete-btn");

const addUpdateInputs = document.querySelectorAll(".add-update-input");
const addBtn = document.getElementById("add-update-btn");
// main() handles startup
async function main() {
  data = await getData();
  storePokemonData(data);
  showCards(pokemonArr);
  setEventHandlers();
}

async function getData() {
  const res = await fetch("./data/pokedex.json");
  const data = await res.json();
  return data;
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

  cardContainer.innerHTML = ""; // Clear all the cards on screen except the template
  cardContainer.appendChild(templateCard); // Keep the template in DOM but hidden

  for (let i = 0; i < pokemon.length; i++) {
    const nextCard = templateCard.cloneNode(true); // Copy the template card
    nextCard.removeAttribute("id"); // Remove "id= 'template-card' to avoid multiple templates"
    nextCard.classList.remove("hidden"); // Make card visible
    nextCard.classList.add("card"); // template-card is not part of card class to maintain invariants

    editCardContent(nextCard, pokemon[i]); // Edit title and image
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
  cardName.textContent = pokemonName;

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

  // Set Base Stats
  card.getElementsByClassName("pokemon-hp")[0].textContent =
    "HP: " + pokemon.hp;
  card.getElementsByClassName("pokemon-attack")[0].textContent =
    "Attack: " + pokemon.attack;
  card.getElementsByClassName("pokemon-defense")[0].textContent =
    "Defense: " + pokemon.defense;
  card.getElementsByClassName("pokemon-speed")[0].textContent =
    "Speed: " + pokemon.speed;
}

function setEventHandlers() {
  // Event Handlers for Sort By UI
  sortByNameBtn.addEventListener("click", function () {
    handleSort("name", sortByNameBtn);
  });
  sortByIdBtn.addEventListener("click", function () {
    handleSort("id", sortByIdBtn);
  });
  sortByHeightBtn.addEventListener("click", function () {
    handleSort("height", sortByHeightBtn);
  });

  sortByHpBtn.addEventListener("click", function () {
    handleSort("hp", sortByHpBtn);
  });

  sortByAttackBtn.addEventListener("click", function () {
    handleSort("attack", sortByAttackBtn);
  });

  sortByDefenseBtn.addEventListener("click", function () {
    handleSort("defense", sortByDefenseBtn);
  });

  sortBySpeedBtn.addEventListener("click", function () {
    handleSort("speed", sortBySpeedBtn);
  });

  reverseListBtn.addEventListener("click", handleReverseList);

  // Event Handlers for Filter-By UI
  deselectAllTypesBtn.addEventListener("click", handleDeselectAllTypesBtn);

  // Event Handlers for Compact Menu UI
  expandMenuButton.addEventListener("click", function () {
    compactMenu.classList.toggle("hidden");
  });
  searchFilterBtn.addEventListener("click", applyFilters);
  deleteBtn.addEventListener("click", handleDeletion);
  addBtn.addEventListener("click", handleAddOrUpdatePokemon);
}

function handleAddOrUpdatePokemon() {
  console.log(addUpdateInputs[11]);
  //if (addUpdateInputs[11].value == "")
  addPokemon();
  //else updatePokemon(addUpdateInputs[11]);
  console.log(pokemonArr[pokemonArr.length - 1]);
  showCards(pokemonArr);
}

function addPokemon() {
  let temp = new Pokemon(
    addUpdateInputs[0].value,
    pokemonArr.length + 1,
    addUpdateInputs[1].value,
    addUpdateInputs[2].value,
    addUpdateInputs[3].value,
    "./assets/images/black-square.png",
    addUpdateInputs[4].value,
    addUpdateInputs[5].value,
    addUpdateInputs[6].value,
    addUpdateInputs[7].value,
    addUpdateInputs[8].value,
    addUpdateInputs[9].value,
    addUpdateInputs[10].value
  );
  pokemonArr.push(temp);
}

function updatePokemon() {
  console.log("Wrong one lmao");
}

/*
//TODO: WRITE THIS FUNCTION IN
function updatePokemon(targetId) {
  // Find Pokemon with Target ID
  let i = 0;
  let found = false;
  for (; i < pokemonArr.length; i++) {
    if (pokemonArr[i].id == targetId) {
      found = true;
      break;
    }
  }

  for(let j = 0; j < addUpdateInputs.length; j++){

  }
}
*/

function handleDeletion() {
  const target = deleteBarInput.value;
  console.log(target);
  deleteElementFromArr(pokemonArr, "name", target);
  applyFilters();
}

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
    const toDelete = [arr[i].name, arr[i].id];
    for (; i < arr.length - 1; i++) {
      arr[i] = arr[i + 1];
    }
    pokemonArr.pop();
    alert(
      "Pokemon: " + toDelete[0] + "\nID: " + toDelete[1] + "\nHas been Deleted!"
    );
  } else {
    alert(
      "Pokemon " +
        targetAttribute +
        " Cannot Be Found!\nPokemon Deletion is CASE-SENSITIVE to prevent misdeletions."
    );
  }
}

function handleSort(attribute, toggleBtn) {
  pokemonArr = quickSort(pokemonArr, attribute);
  const sortByBtns = document.querySelectorAll(".sort-by button");
  console.log(sortByBtns);

  for (let i = 0; i < sortByBtns.length; i++) {
    sortByBtns[i].classList.remove("active");
  }
  toggleBtn.classList.add("active");
  applyFilters();
}

function handleDeselectAllTypesBtn() {
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

function applyFilters() {
  storeFilters();
  const targetValue = filters.searchInput;
  let filtered = [];

  for (let i = 0; i < pokemonArr.length; i++) {
    p = pokemonArr[i];
    if (
      p.name.trim().toLowerCase().includes(targetValue) ||
      p.species.trim().toLowerCase().includes(targetValue)
    ) {
      if (
        filters.types.includes(p.type1.toLowerCase()) ||
        (p.type2 != null && filters.types.includes(p.type2.toLowerCase()))
      )
        filtered.push(p);
    }
  }

  showCards(filtered);
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

// Data Structure Manipulation
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

// Running Code:
let pokemonArr = [];
main();
