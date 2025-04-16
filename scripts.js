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
    this.id = getNumberOutOfString(id);
    this.species = species;
    this.type1 = type1;
    this.type2 = type2;
    this.sprite = sprite;
    this.description = description;
    this.height = getNumberOutOfString(height);
    this.weight = getNumberOutOfString(weight);
    this.hp = getNumberOutOfString(hp);
    this.attack = getNumberOutOfString(attack);
    this.defense = getNumberOutOfString(defense);
    this.speed = getNumberOutOfString(speed);
  }
}

const pokemonArr = {
  lastId: 0,
  data: [],
};

const filters = {
  searchInput: "",
  types: [],
};

// Sort By UI
const sortByNameBtn = document.getElementById("sort-by-name-btn");
const sortByIdBtn = document.getElementById("sort-by-id-btn");
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

// Add/Delete Menu UI
const deleteBarInput = document.getElementById("delete-bar-input");
const deleteBtn = document.getElementById("delete-btn");
const addUpdateInputs = document.querySelectorAll(".add-update-input");
const addBtn = document.getElementById("add-update-btn");

// main() handles startup
async function main() {
  data = await getData();
  storePokemonData(data);
  showCards(pokemonArr.data);
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
    pokemonArr.data[i] = new Pokemon(
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
    pokemonArr.lastId++;
  }
}

function showCards(pokemon) {
  const cardContainer = document.getElementById("card-container");
  const templateCard = document.getElementById("template-card");

  cardContainer.innerHTML = ""; // Clear all the cards on screen except the template

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
    "Height: " + pokemon.height + " m";
  card.getElementsByClassName("pokemon-weight")[0].textContent =
    "Weight: " + pokemon.weight + " kg";

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

  sortByWeightBtn.addEventListener("click", function () {
    handleSort("weight", sortByWeightBtn);
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

  // Event Handlers for Addition/Deletion
  deleteBtn.addEventListener("click", handleDeletion);
  addBtn.addEventListener("click", handleAddOrUpdatePokemon);

  // Event Handlers for Compact Menu UI
  expandMenuButton.addEventListener("click", function () {
    compactMenu.classList.toggle("hidden");
  });
  searchFilterBtn.addEventListener("click", applyFilters);
}

function handleSort(attribute, toggleBtn) {
  pokemonArr.data = quickSort(pokemonArr.data, attribute);

  const sortByBtns = document.querySelectorAll(".sort-by button");
  for (let i = 0; i < sortByBtns.length; i++)
    sortByBtns[i].classList.remove("active");

  toggleBtn.classList.add("active");
  applyFilters();
}

function handleReverseList() {
  pokemonArr.data = reverseList(pokemonArr.data);
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

function handleDeletion() {
  const target = deleteBarInput.value;
  deleteElementFromArr(pokemonArr.data, "name", target);
  applyFilters();
}

function handleAddOrUpdatePokemon() {
  if (addUpdateInputs[11].value == "") addPokemon();
  else updatePokemon(addUpdateInputs[11].value);
  showCards(pokemonArr.data);
}

function updatePokemon(targetId) {
  // Check that ID is valid
  const parsedId = parseInt(targetId);
  //NaN --> Floating point values ** NaN === NaN Always false **
  //Null --> Pointers/objects/references
  if (isNaN(parsedId)) {
    alert("Invalid ID. Please enter a number.");
    return false;
  }

  // Check to make sure types are valid
  let type1Val = addUpdateInputs[2].value;
  let type2Val = addUpdateInputs[3].value;
  type1Val = capitalizeFirstLetter(type1Val);
  type2Val = capitalizeFirstLetter(type2Val);
  if (type2Val == "N/A") type2Val = null;

  let validType1 = false;
  let validType2 = false;

  // This can very easily be optimized.
  for (let i = 0; i < typeCheckboxes.length; i++) {
    if (typeCheckboxes[i].value == type1Val || type1Val == "")
      validType1 = true;

    if (
      typeCheckboxes[i].value == type1Val ||
      type2Val == "" ||
      type2Val == null
    )
      validType2 = true;
  }

  let validTypes = validType1 && validType2;
  if (!validTypes) {
    alert("Type Values are invalid. Please try again");
    return false;
  }

  // Find Pokemon with Target ID
  let i = 0;
  let found = false;
  for (; i < pokemonArr.data.length; i++) {
    if (pokemonArr.data[i].id == parsedId) {
      found = true;
      break;
    }
  }
  if (!found) alert("No Pokemon with ID: " + targetId + " found.");
  else {
    updatePokemonAttribute(
      pokemonArr.data[i],
      "name",
      addUpdateInputs[0].value
    );
    updatePokemonAttribute(
      pokemonArr.data[i],
      "species",
      addUpdateInputs[1].value
    );
    updatePokemonAttribute(pokemonArr.data[i], "type1", type1Val);
    updatePokemonAttribute(pokemonArr.data[i], "type2", type2Val);
    updatePokemonAttribute(
      pokemonArr.data[i],
      "description",
      addUpdateInputs[4].value
    );
    updatePokemonAttribute(
      pokemonArr.data[i],
      "height",
      getNumberOutOfString(addUpdateInputs[5].value)
    );
    updatePokemonAttribute(
      pokemonArr.data[i],
      "weight",
      getNumberOutOfString(addUpdateInputs[6].value)
    );
    updatePokemonAttribute(pokemonArr.data[i], "hp", addUpdateInputs[7].value);
    updatePokemonAttribute(
      pokemonArr.data[i],
      "attack",
      getNumberOutOfString(addUpdateInputs[8].value)
    );
    updatePokemonAttribute(
      pokemonArr.data[i],
      "defense",
      getNumberOutOfString(addUpdateInputs[9].value)
    );
    updatePokemonAttribute(
      pokemonArr.data[i],
      "speed",
      getNumberOutOfString(addUpdateInputs[10].value)
    );
    alert("Updated Pokemon with ID: " + targetId + " sucessfully!");
    return true;
  }
}

function updatePokemonAttribute(pokemon, attribute, newVal) {
  // Don't update if new values are not input
  if (newVal == "") return;
  pokemon[attribute] = newVal;
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

function reverseList(arr) {
  let temp = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    temp.push(arr[i]);
  }
  return temp;
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

  // Consider: Probably not great that I'm mixing validation of input and logic.
  if (found) {
    const toDelete = [arr[i].name, arr[i].id];
    for (; i < arr.length - 1; i++) {
      arr[i] = arr[i + 1];
    }
    arr.pop();
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

// Consider: Generalizing this add function maybe???
function addPokemon() {
  // Check to make sure types are valid
  let type1Val = addUpdateInputs[2].value.toLowerCase();
  type1Val = capitalizeFirstLetter(type1Val);

  let type2Val;
  if (addUpdateInputs[3].value == "" || addUpdateInputs[3].value == "N/A")
    type2Val = null;
  else {
    type2Val = addUpdateInputs[3].value.toLowerCase();
    type2Val = capitalizeFirstLetter(type2Val);
  }

  let validType1 = false;
  let validType2 = false;
  for (let i = 0; i < typeCheckboxes.length; i++) {
    if (typeCheckboxes[i].value == type1Val) validType1 = true;

    if (typeCheckboxes[i].value == type2Val || type2Val == null)
      validType2 = true;
  }

  let validTypes = validType1 && validType2;
  if (!validTypes) {
    alert("Type Values are invalid. Please try again");
    return false;
  }

  let temp = new Pokemon(
    addUpdateInputs[0].value,
    ++pokemonArr.lastId,
    addUpdateInputs[1].value,
    type1Val,
    type2Val,
    "./assets/images/black-square.png",
    addUpdateInputs[4].value,
    addUpdateInputs[5].value,
    addUpdateInputs[6].value,
    addUpdateInputs[7].value,
    addUpdateInputs[8].value,
    addUpdateInputs[9].value,
    addUpdateInputs[10].value
  );
  pokemonArr.data.push(temp);
  alert("New Pokemon has been added to the END of the pokedex!");
  return true;
}

// Display Filtering Functions:
function applyFilters() {
  storeFilters();
  const targetValue = filters.searchInput;
  let filtered = [];

  for (let i = 0; i < pokemonArr.data.length; i++) {
    const p = pokemonArr.data[i];
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

// Formatting Functions:
function capitalizeFirstLetter(string) {
  if (typeof string !== "string" || string.length === 0) {
    return ""; // Return empty string for non-string input or empty string
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getNumberOutOfString(string) {
  if (typeof string !== "string") return string;

  // Copy and Pasted from Google. I do NOT know regular expressions.
  let result = string.replace(/[^0-9.]/g, "");

  if (result === "" || isNaN(result)) return string;
  return parseFloat(result);
}

main();
