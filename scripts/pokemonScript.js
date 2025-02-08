const typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#F0B6BC'
};

var totalPokemon = 1302;

let weaknessList = [];
let immunitiesList = [];
let resilientList = [];

let weaknessList2 = [];
let immunitiesList2 = [];
let resilientList2 = [];

let weaknessListX4 = [];
let resilientList025 = [];

var typeClass;
var trackType;

$(document).ready(function () {
  // Load the Pokemon list and store it in an array
  var pokemonList = [];
  $.get("https://pokeapi.co/api/v2/pokemon?limit=" + totalPokemon, function (data) {
    $.each(data.results, function (index, pokemon) {
      var pokemonName = pokemon.name
        .split("-")
        .map(function (word) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
      var pokemonNumber = index + 1; // Add this line to get the Pokemon number
      pokemonList.push(pokemonName);
    });
  });

  // Attach an event listener to the input box
  $("#pokemon-input").on("input", function () {
    var inputText = $(this).val();
    var suggestions = [];
    for (var i = 0; i < pokemonList.length; i++) {
      if (
        pokemonList[i].toLowerCase().indexOf(inputText.toLowerCase()) == 0
      ) {
        suggestions.push(pokemonList[i]);
      }
    }
    // Display the suggestions
    var suggestionsHtml = "";
    for (var i = 0; i < suggestions.length; i++) {
      var suggestion = suggestions[i];
      var linkHtml =
        "<a href='#' class='suggestion-link is-size-5 '>" +
        suggestion +
        "</a>";
      suggestionsHtml +=
        "<div class='suggestion is-size-5 '>" + linkHtml + "</div>";
    }
    $("#pokemon-panel").html(suggestionsHtml);
    $("#pokemon-panel").show();
  });

  // Attach a click event listener to the document for the suggestion-link class
  $(document).on("click", ".suggestion-link", function () {
    var suggestionText = $(this).text();
    $("#pokemon-input").val(suggestionText);
    $("#pokemon-panel").hide();
  });

  // Hide the #pokemon-panel element when the #pokemon-input is empty
  $("#pokemon-input").on(function () {
    if ($(this).val() == "") {
      $("#pokemon-panel").hide();
    }
  });
});

function handleSuggestionClick() {
  // Get the text of the clicked suggestion
  const suggestionText = this.innerText;

  // Fill the input field with the suggestion text
  document.getElementById("pokemon-input").value = suggestionText;

  // Hide the suggestion list
  document.getElementById("suggestion-list").style.display = "none";

  const suggestionItems = document.querySelectorAll(".suggestion-item");
  suggestionItems.forEach((item) => {
    item.addEventListener("click", handleSuggestionClick);
  });
}



$(document).ready(function () {
  // Load the Pokemon list and populate the dropdown menu
  $.get("https://pokeapi.co/api/v2/pokemon?limit=" + totalPokemon, function (data) {
    $.each(data.results, function (index, pokemon) {
      var pokemonName = pokemon.name
        .replace(/-/g, " ")
        .replace(/\b\w/g, function (match) {
          return match.toUpperCase();
        });

      var pokemonNumber = index + 1; // Add this line to get the Pokemon number

      // Get the Pokemon image URL
      var pokemonImageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonNumber + ".png";

      $("#pokemon-select").append(
        "<option class='is-size-5' style='background-image:url( " + pokemonImageUrl + ");' value='" + pokemon.url + "' data-image='" + pokemonImageUrl + "' data-image-class='pokemon-icon'>" +
        pokemonName + " (No. " + pokemonNumber + ")" +
        "</option>" + pokemonImageUrl

      );
    });
  });

  // Hide the #pokemon-panel element when the #pokemon-input is empty
  $("#pokemon-input").keyup(function () {
    if ($(this).val() == "") {
      $("#pokemon-panel").hide();
    }
  });

  // Show the Pokemon information when a Pokemon is selected
  $("#pokemon-select, #pokemon-input").change(function () {
    $("#pokemon-panel").hide();

    weaknessList = [];
    immunitiesList = [];
    resilientList = [];

    weaknessList2 = [];
    immunitiesList2 = [];
    resilientList2 = [];

    weaknessListX4 = [];
    resilientList025 = [];

    var pokemonUrl = $(this).val();
    var pokemonNumber = pokemonUrl.split("/")[6]; // Extract the number from the URL
    var selectedPokemonCry = pokemonNumber + "Cry";

    $.get(pokemonUrl, function (data) {
      var pokemonInfo =
        "<div class='table-container box' style='text-align: center; background-color: #2b2d31;'> " +
        "<table style='background-color: #2b2d31;' class='table is-fullwidth'> <tbody class='is-fullwidth'>";
      var pokeName = data.name.replace(/-/g, " ").split(" ");
      for (var i = 0; i < pokeName.length; i++) {
        pokeName[i] =
          pokeName[i].charAt(0).toUpperCase() + pokeName[i].slice(1);
      }
      pokeName = pokeName.join(" ");

      // Update the audio element's source with the new cry

      var pokemonCry = document.getElementById("pokemon-cry");
      pokemonCry.volume = 0.1;
      pokemonCry.src = 'cries/' + selectedPokemonCry + '.webm';

      // Play the cry
      pokemonCry.play();

      // Display the Pokemon image
      var imageUrl = data.sprites.front_default;
      var imageHtml = " <img width='200' height='200' src='" + imageUrl + "' alt='" + data.name + "'>";
      var pokemonImage = " <div class='pokemon-image-wrapper center image-container' id='pokemon-image' >" + imageHtml + " </div>  ";
      pokemonInfo += "<tr class= 'is-fullwidth' ><th class='has-text-white text-center'>Name:</th><td class='has-text-white'>" + pokeName + "</td></tr>";
      pokemonInfo += "<tr class= 'is-fullwidth'><th class='has-text-white text-center'>Height/Weight:</th><td class='has-text-white'>" + (data.height / 10).toFixed(1) + "m / " + (data.weight / 10).toFixed(1) + "kg</td></tr>";
      pokemonInfo += "</td></tr>";

      //types
      pokemonInfo += "<tr class= 'is-fullwidth'><th class='has-text-white text-center'>Types:</th><td>";
      $.each(data.types, function (index, type) {

        typeClass = type.type.name.toLowerCase();

        trackType = typeClass + "/" + trackType;

        pokemonInfo +=
          "<img style='padding-left:2px; padding-right:2px;' src='images/types/" +
          typeClass +
          ".png'  alt='" +
          typeClass +
          "'>";
      });

      $("#pokemon-image").html(pokemonImage);

      typeNames = data.types.map(function (type) {
      });

      //Weaknesses and Immunities  
      var types = trackType.split("/");

      function getWeaknessAndImmunity() {
        typeClass = "";
        trackType = "";

        if (weaknessListX4.length >= 1 || weaknessList.length >= 1) {
          pokemonInfo += "<tr class='is-fullwidth'><th class='has-text-white'>Weaknesses:</th><td class='has-text-white'>";

          // Add x4 weaknesses with outline
          for (let weaknessX4 of weaknessListX4) {
            pokemonInfo += `<img class='type-icon x4-outline' src='images/types/${weaknessX4}.png' alt='${weaknessX4}'> `;
          }

          // Add x2 weaknesses normally
          for (let weakness of weaknessList) {
            pokemonInfo += `<img class='type-icon' src='images/types/${weakness}.png' alt='${weakness}'> `;
          }

          pokemonInfo += "</td></tr>";
        }


        if (immunitiesList.length >= 1) {
          pokemonInfo += "<tr class= 'is-fullwidth'> <th class='has-text-white'> Immunities:</th> <td class= has-text-white>";

          for (let immunity of immunitiesList) {
            pokemonInfo += "<img class='type-icon' src='images/types/" + immunity + ".png' alt='" + immunity + "'> ";
          }

          pokemonInfo += "</td></tr>";
        }


        if (resilientList025.length >= 1 || resilientList.length >= 1) {
          pokemonInfo += "<tr class='is-fullwidth'><th class='has-text-white'>Resilient:</th><td class='has-text-white'>";

          // Add x4 resilient with outline
          for (let resilient025 of resilientList025) {
            pokemonInfo += `<img class='type-icon x025-outline' src='images/types/${resilient025}.png' alt='${resilient025}'> `;
          }

          // Add x2 resilient normally
          for (let resilient of resilientList) {
            pokemonInfo += `<img class='type-icon' src='images/types/${resilient}.png' alt='${resilient}'> `;
          }

          pokemonInfo += "</td></tr>";
        }
      }

      function mergeLists(list1, list2, destination) {
        let combined = [...list1, ...list2]; // Merge both lists
        let count = new Map(); // Use Map for efficient counting

        // Count occurrences of each type
        for (let type of combined) {
          count.set(type, (count.get(type) || 0) + 1);
        }

        let uniqueList = [];
        let duplicateList = [];

        // Separate into unique and duplicate lists
        for (let [type, occurrences] of count) {
          if (occurrences >= 2) {
            duplicateList.push(type); // Move duplicates
          } else {
            uniqueList.push(type); // Keep unique ones
          }
        }

        // Update original lists
        list1.length = 0;
        list1.push(...uniqueList); // example: Keep only unique weaknesses in weaknessList
        destination.length = 0;
        destination.push(...duplicateList); // example: Move duplicates to weaknessListX4
      }

      function checkTypingMatch() {
        immunitiesList = immunitiesList2.concat(immunitiesList);
        mergeLists(weaknessList, weaknessList2, weaknessListX4);
        mergeLists(resilientList, resilientList2, resilientList025);

        // Filter out elements in Immunities from weaknessList and resilientList
        weaknessList = weaknessList.filter(w => !immunitiesList.includes(w));
        resilientList = resilientList.filter(r => !immunitiesList.includes(r));

        // Find common elements in both lists
        let commonElements = weaknessList.filter(w => resilientList.includes(w));

        // Remove common elements from both lists
        weaknessList = weaknessList.filter(w => !commonElements.includes(w));
        resilientList = resilientList.filter(r => !commonElements.includes(r));

      }

      function get2ndTypeCal() {
        switch (types[1]) {
          case "bug":
            weaknessList2 = ["fire", "flying", "rock"];
            immunitiesList2 = [];
            resilientList2 = ["fighting", "ground", "grass"];
            checkTypingMatch();
            getWeaknessAndImmunity();
            break;

          case "dark":
            weaknessList2 = ["fighting", "bug", "fairy"];
            immunitiesList2 = ["psychic"];
            resilientList2 = ["dark", "ghost"];
            checkTypingMatch();
            getWeaknessAndImmunity();
            break;

          case "dragon":
            weaknessList2 = ["dragon", "fairy", "ice"];
            immunitiesList2 = [];
            resilientList2 = ["fire", "water", "grass", "electric"];
            checkTypingMatch();
            getWeaknessAndImmunity();
            break;

          case "electric":
            weaknessList2 = ["ground"];
            immunitiesList2 = [];
            resilientList2 = ["flying", "electric", "steel"];
            checkTypingMatch();
            getWeaknessAndImmunity();
            break;

          case "fairy":
            weaknessList2 = ["poison", "steel"];
            immunitiesList2 = ["dragon"];
            resilientList2 = ["fighting", "bug", "dark"];
            checkTypingMatch();
            getWeaknessAndImmunity();
            break;

          case "fighting":
            weaknessList2 = ["flying", "psychic", "fairy"];
            immunitiesList2 = [];
            resilientList2 = ["rock", "bug", "dark"];
            checkTypingMatch();
            getWeaknessAndImmunity();
            break;

          case "fire":
            weaknessList2 = ["water", "ground", "rock"];
            immunitiesList2 = [];
            resilientList2 = ["bug", "fire", "grass", "steel", "ice", "fairy"];
            checkTypingMatch();
            getWeaknessAndImmunity();
            break;

          case "flying":
            weaknessList2 = ["electric", "ice", "rock"];
            immunitiesList2 = ["ground"];
            resilientList2 = ["fighting", "bug", "grass"];
            checkTypingMatch();
            getWeaknessAndImmunity();
            break;

          case "ghost":
            weaknessList2 = ["ghost", "dark"];
            immunitiesList2 = ["normal", "fighting"];
            resilientList2 = ["poison", "bug"];
            checkTypingMatch();
            getWeaknessAndImmunity();
            break;

          case "grass":
            weaknessList2 = ["poison", "ice", "flying", "bug", "fire"];
            immunitiesList2 = [];
            resilientList2 = ["ground", "water", "grass", "electric"];
            checkTypingMatch();
            getWeaknessAndImmunity();
            break;

          case "ground":
            weaknessList2 = ["water", "grass", "ice"];
            immunitiesList2 = ["electric"];
            resilientList2 = ["poison", "rock"];
            checkTypingMatch();
            getWeaknessAndImmunity();
            break;

          case "ice":
            weaknessList2 = ["fire", "fighting", "rock", "steel"];
            immunitiesList2 = [];
            resilientList2 = ["ice"];
            checkTypingMatch();
            getWeaknessAndImmunity();
            break;

          case "normal":
            weaknessList2 = ["fighting"];
            immunitiesList2 = ["ghost"];
            resilientList2 = [];
            checkTypingMatch();
            getWeaknessAndImmunity();
            break;

          case "poison":
            weaknessList2 = ["ground", "psychic"];
            immunitiesList2 = [];
            resilientList2 = ["fighting", "poison", "grass", "bug", "fairy"];
            checkTypingMatch();
            getWeaknessAndImmunity();
            break;

          case "psychic":
            weaknessList2 = ["bug", "ghost", "dark"];
            immunitiesList2 = [];
            resilientList2 = ["psychic", "fighting"];
            checkTypingMatch();
            getWeaknessAndImmunity();
            break;

          case "rock":
            weaknessList2 = ["water", "grass", "ground", "steel", "fighting"];
            immunitiesList2 = [];
            resilientList2 = ["normal", "flying", "poison", "fire"];
            checkTypingMatch();
            getWeaknessAndImmunity();
            break;

          case "steel":
            weaknessList2 = ["fire", "fighting", "ground"];
            immunitiesList2 = ["poison"];
            resilientList2 = ["normal", "flying", "rock", "bug", "steel", "grass", "psychic", "ice", "dragon", "fairy"];
            checkTypingMatch();
            getWeaknessAndImmunity();
            break;

          case "water":
            weaknessList2 = ["electric", "grass"];
            immunitiesList2 = [];
            resilientList2 = ["steel", "fire", "water", "ice"];
            checkTypingMatch();
            getWeaknessAndImmunity();
            break;
        }
      }

      // Check if the Pokemon have 1 type
      if (types[1] == "" || types[1] == "undefined") {
        switch (types[0]) {
          case "bug":
            weaknessList = ["fire", "flying", "rock"];
            immunitiesList = [];
            resilientList = ["fighting", "ground", "grass"];
            getWeaknessAndImmunity();
            break;

          case "dark":
            weaknessList = ["fighting", "bug", "fairy"];
            immunitiesList = ["psychic"];
            resilientList = ["dark", "ghost"];
            getWeaknessAndImmunity();
            break;

          case "dragon":
            weaknessList = ["dragon", "fairy", "ice"];
            immunitiesList = [];
            resilientList = ["fire", "water", "grass", "electric"];
            getWeaknessAndImmunity();
            break;

          case "electric":
            weaknessList = ["ground"];
            immunitiesList = [];
            resilientList = ["flying", "electric", "steel"];
            getWeaknessAndImmunity();
            break;

          case "fairy":
            weaknessList = ["poison", "steel"];
            immunitiesList = ["dragon"];
            resilientList = ["fighting", "bug", "dark"];
            getWeaknessAndImmunity();
            break;

          case "fighting":
            weaknessList = ["flying", "psychic", "fairy"];
            immunitiesList = [];
            resilientList = ["rock", "bug", "dark"];
            getWeaknessAndImmunity();
            break;

          case "fire":
            weaknessList = ["water", "ground", "rock"];
            immunitiesList = [];
            resilientList = ["bug", "fire", "grass", "steel", "ice", "fairy"];
            getWeaknessAndImmunity();
            break;

          case "flying":
            weaknessList = ["electric", "ice", "rock"];
            immunitiesList = ["ground"];
            resilientList = ["fighting", "bug", "grass"];
            getWeaknessAndImmunity();
            break;

          case "ghost":
            weaknessList = ["ghost", "dark"];
            immunitiesList = ["normal", "fighting"];
            resilientList = ["poison", "bug"];
            getWeaknessAndImmunity();
            break;

          case "grass":
            weaknessList = ["poison", "ice", "flying", "bug", "fire"];
            immunitiesList = [];
            resilientList = ["ground", "water", "grass", "electric"];
            getWeaknessAndImmunity();
            break;

          case "ground":
            weaknessList = ["water", "grass", "ice"];
            immunitiesList = ["electric"];
            resilientList = ["poison", "rock"];
            getWeaknessAndImmunity();
            break;

          case "ice":
            weaknessList = ["fire", "fighting", "rock", "steel"];
            immunitiesList = [];
            resilientList = ["ice"];
            getWeaknessAndImmunity();
            break;

          case "normal":
            weaknessList = ["fighting"];
            immunitiesList = ["ghost"];
            resilientList = [];
            getWeaknessAndImmunity();
            break;

          case "poison":
            weaknessList = ["ground", "psychic"];
            immunitiesList = [];
            resilientList = ["fighting", "poison", "grass", "bug", "fairy"];
            getWeaknessAndImmunity();
            break;

          case "psychic":
            weaknessList = ["bug", "ghost", "dark"];
            immunitiesList = [];
            resilientList = ["psychic", "fighting"];
            getWeaknessAndImmunity();
            break;

          case "rock":
            weaknessList = ["water", "grass", "ground", "steel", "fighting"];
            immunitiesList = [];
            resilientList = ["normal", "flying", "poison", "fire"];
            getWeaknessAndImmunity();
            break;

          case "steel":
            weaknessList = ["fire", "fighting", "ground"];
            immunitiesList = ["poison"];
            resilientList = ["normal", "flying", "rock", "bug", "steel", "grass", "psychic", "ice", "dragon", "fairy"];
            getWeaknessAndImmunity();
            break;

          case "water":
            weaknessList = ["electric", "grass"];
            immunitiesList = [];
            resilientList = ["steel", "fire", "water", "ice"];
            getWeaknessAndImmunity();
            break;
        }
      }

      // Check if the Pokemon have 2 types
      else if (types[1] != "" || types[1] != "undefined") {
        switch (types[0]) {
          case "bug":
            weaknessList = ["fire", "flying", "rock"];
            immunitiesList = [];
            resilientList = ["fighting", "ground", "grass"];
            get2ndTypeCal();
            break;

          case "dark":
            weaknessList = ["fighting", "bug", "fairy"];
            immunitiesList = ["psychic"];
            resilientList = ["dark", "ghost"];
            get2ndTypeCal();
            break;

          case "dragon":
            weaknessList = ["dragon", "fairy", "ice"];
            immunitiesList = [];
            resilientList = ["fire", "water", "grass", "electric"];
            get2ndTypeCal();
            break;

          case "electric":
            weaknessList = ["ground"];
            immunitiesList = [];
            resilientList = ["flying", "electric", "steel"];
            get2ndTypeCal();
            break;

          case "fairy":
            weaknessList = ["poison", "steel"];
            immunitiesList = ["dragon"];
            resilientList = ["fighting", "bug", "dark"];
            get2ndTypeCal();
            break;

          case "fighting":
            weaknessList = ["flying", "psychic", "fairy"];
            immunitiesList = [];
            resilientList = ["rock", "bug", "dark"];
            get2ndTypeCal();
            break;

          case "fire":
            weaknessList = ["water", "ground", "rock"];
            immunitiesList = [];
            resilientList = ["bug", "fire", "grass", "steel", "ice", "fairy"];
            get2ndTypeCal();
            break;

          case "flying":
            weaknessList = ["electric", "ice", "rock"];
            immunitiesList = ["ground"];
            resilientList = ["fighting", "bug", "grass"];
            get2ndTypeCal();
            break;

          case "ghost":
            weaknessList = ["ghost", "dark"];
            immunitiesList = ["normal", "fighting"];
            resilientList = ["poison", "bug"];
            get2ndTypeCal();
            break;

          case "grass":
            weaknessList = ["poison", "ice", "flying", "bug", "fire"];
            immunitiesList = [];
            resilientList = ["ground", "water", "grass", "electric"];
            get2ndTypeCal();
            break;

          case "ground":
            weaknessList = ["water", "grass", "ice"];
            immunitiesList = ["electric"];
            resilientList = ["poison", "rock"];
            get2ndTypeCal();
            break;

          case "ice":
            weaknessList = ["fire", "fighting", "rock", "steel"];
            immunitiesList = [];
            resilientList = ["ice"];
            get2ndTypeCal();
            break;

          case "normal":
            weaknessList = ["fighting"];
            immunitiesList = ["ghost"];
            resilientList = [];
            get2ndTypeCal();
            break;

          case "poison":
            weaknessList = ["ground", "psychic"];
            immunitiesList = [];
            resilientList = ["fighting", "poison", "grass", "bug", "fairy"];
            get2ndTypeCal();
            break;

          case "psychic":
            weaknessList = ["bug", "ghost", "dark"];
            immunitiesList = [];
            resilientList = ["psychic", "fighting"];
            get2ndTypeCal();
            break;

          case "rock":
            weaknessList = ["water", "grass", "ground", "steel", "fighting"];
            immunitiesList = [];
            resilientList = ["normal", "flying", "poison", "fire"];
            get2ndTypeCal();
            break;

          case "steel":
            weaknessList = ["fire", "fighting", "ground"];
            immunitiesList = ["poison"];
            resilientList = ["normal", "flying", "rock", "bug", "steel", "grass", "psychic", "ice", "dragon", "fairy"];
            get2ndTypeCal();
            break;

          case "water":
            weaknessList = ["electric", "grass"];
            immunitiesList = [];
            resilientList = ["steel", "fire", "water", "ice"];
            get2ndTypeCal();
            break;
        }
      }

      function mergeLists(list1, list2, destination) {
        let combined = [...list1, ...list2]; // Merge both lists
        let count = new Map(); // Use Map for efficient counting

        // Count occurrences of each type
        for (let type of combined) {
          count.set(type, (count.get(type) || 0) + 1);
        }

        let uniqueList = [];
        let duplicateList = [];

        // Separate into unique and duplicate lists
        for (let [type, occurrences] of count) {
          if (occurrences >= 2) {
            duplicateList.push(type); // Move duplicates
          } else {
            uniqueList.push(type); // Keep unique ones
          }
        }

        // Update original lists
        list1.length = 0;
        list1.push(...uniqueList); // example: Keep only unique weaknesses in weaknessList
        destination.length = 0;
        destination.push(...duplicateList); // example: Move duplicates to weaknessListX4
      }




      //Abilities
      pokemonInfo +=
        "<tr class= 'is-fullwidth'><th class='has-text-white text-center'>Abilities:</th><td>";
      $.each(data.abilities, function (index, ability) {
        var abilityName = ability.ability.name
          .split("-")
          .map(function (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join(" ");
        pokemonInfo +=
          "<a class='button is-size-6 custom-button ability-name'has-text-white data-ability-url='" +
          ability.ability.url +
          "'>" +
          abilityName +
          "</a> &nbsp;";
      });
      pokemonInfo += "</td></tr>";

      //details about that Ability
      $(document).on("click", ".ability-name", function () {
        var abilityUrl = $(this).data("ability-url");
        $.get(abilityUrl, function (abilityData) {
          var abilityEffect = abilityData.effect_entries.find(function (
            effect
          ) {
            return effect.language.name === "en";
          }).short_effect;
          var abilityName = abilityData.name
            .split("-")
            .map(function (word) {
              return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(" ");

          var modalHtml = `
      <div class="modal is-dark is-active">
        <div class="modal-background" ></div>
        <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">${abilityName}</p>
        </header>
        <section class="modal-card-body">
          <p>${abilityEffect}</p>
        </section>
        </div>
      </div>
      `;

          $("body").append(modalHtml);
          $(".modal .delete, .modal-background").click(function () {
            $(".modal").remove();
          });
        });
      });

      // Stats
      var statsInfo = "<br><div class='table-container box' style='text-align: center; background-color: #2b2d31;'> ";
      var totalStatValue = 0;
      $.each(data.stats, function (index, stat) {

        var statName = stat.stat.name
          .replace(/-/g, " ")
          .replace(/\b\w/g, function (l) {
            return l.toUpperCase();
          });
        if (statName == "Hp") {
          statName = "Health";
        }
        if (statName == "Special Attack") {
          statName = "Sp Attack";
        }
        if (statName == "Special Defense") {
          statName = "Sp Defense";
        }
        var statValue = stat.base_stat;
        var txtValue;

        if (statValue <= 60) {
          txtValue = 'is-danger';
        } else if (statValue <= 99) {
          txtValue = 'is-warning';
        } else if (statValue <= 130) {
          txtValue = 'is-success';
        } else if (statValue <= 170) {
          txtValue = 'is-primary';
        } else {
          txtValue = 'is-info';
        }

        var statBar =
          "<progress class='progress " + txtValue + "' value='" +
          statValue +
          "' max='255'></progress>";
        statsInfo +=
          "<div class='stat-info has-text-white is-size-5'>" +
          statName +
          ": " +
          statValue +
          statBar +
          "</div>  ";

        totalStatValue += statValue;
      });
      statsInfo += "<br><div class='stat-info has-text-white is-size-4'> Total Stats: " + totalStatValue + "</div>";
      $("#pokemon-stats").html(statsInfo);


      //Evolution 
      $.get(data.species.url, function (speciesData) {
        $.get(speciesData.evolution_chain.url, function (evolutionChainData) {
          var evolutionHtml = "<br><div class='box has-text-white' style='text-align: center; background-color: #2b2d31;> <p><b class='has-text-white is-bold'>Evolution Line</b></p>";
          var pokemon = evolutionChainData.chain;
          while (pokemon) {
            var pokemonName = pokemon.species.name
              .replace(/-/g, " ")
              .replace(/\b\w/g, function (match) {
                return match.toUpperCase();
              });

            // Get the Pokemon image URL
            var pokemonImageUrl =
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
              pokemon.species.url.split("/")[6] +
              ".png";

            // Get the evolution method
            var evolutionMethod = "";
            var evolutionDetails = pokemon["evolution_details"][0];
            if (evolutionDetails) {
              if (evolutionDetails.min_level) {
                evolutionMethod = "Level " + evolutionDetails.min_level;
              } else if (evolutionDetails.item) {
                var itemName = evolutionDetails.item.name
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, function (match) {
                    return match.toUpperCase();
                  });
                evolutionMethod = itemName + " used";
              } else if (evolutionDetails.trigger.name === "level-up" && evolutionDetails.time_of_day) {
                evolutionMethod = "Level up with " + evolutionDetails.time_of_day;
              } else if (evolutionDetails.trigger.name === "level-up") {
                evolutionMethod = "Level up";
              } else {
                evolutionMethod = evolutionDetails.trigger.name;
              }
            }

            evolutionHtml +=
              "<div class='cell'><img src='" + pokemonImageUrl + "' alt='" + pokemonName + "' /> " +
              "<br/>" +
              "<span class=''>" +
              pokemonName +
              "<br/>" +
              evolutionMethod + "</div>";
            pokemon = pokemon["evolves_to"][0];
          }

          evolutionHtml += "</div>";
          $('#pokemon-evolution').html(evolutionHtml);
        });
      });

      //Moves
      var movesHtml = "<br><div class='box has-text-white' style='text-align: center; background-color: #2b2d31;> <b class='has-text-white'>Moves </b><br><br>";
      $.each(data.moves, function (index, move) {
        var level = "";
        if (move.version_group_details[0].level_learned_at !== 0) {
          level = '<b> (Lvl ' +
            move.version_group_details[0].level_learned_at +
            ") </b>";
        }

        var pokemonMove = move.move.name.replace(/-/g, " ");
        pokemonMove = pokemonMove
          .split(" ")
          .map(function (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join(" ");



        movesHtml +=
          " <span style= 'margin:5px; color: " + '#FFFFFF' + "'class='button custom-button is-size-5 move-button' data-move-url='" +
          move.move.url +
          "'>" +
          pokemonMove +
          "&nbsp;" +
          level +
          "</span> ";
      });

      $('#pokemon-move').html(movesHtml);

      $(document).on("click", ".move-button", function () {
        var moveUrl = $(this).data("move-url");
        $.get(moveUrl, function (moveData) {
          var moveName = moveData.name.replace(/-/g, " ");
          moveName = moveName
            .split(" ")
            .map(function (word) {
              return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(" ");

          var movePower = moveData.power || "-";
          var moveAccuracy = moveData.accuracy || "-";
          var movePP = moveData.pp || "-";
          var moveCategory = moveData.damage_class.name;
          var moveType = moveData.type.name.replace(/-/g, " ");
          moveType = moveType
            .split(" ")
            .map(function (word) {
              return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(" ");


          moveType = moveType.toLowerCase();
          var moveEffect = moveData.effect_entries.find(function (
            effect
          ) {
            return effect.language.name === "en";
          }).short_effect;

          var modalHtml = `
      <div class="modal is-active is-dark">
        <div class="modal-background"></div>
        <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">${moveName}</p>
        </header>
        <section class="modal-card-body">
          <div class="columns">
          <div class="column is-size-5"><b>Power:</b> ${movePower}</div>
          <div class="column is-size-5"><b>Accuracy:</b> ${moveAccuracy}</div>
          <div class="column is-size-5 "><b>PP:</b> ${movePP}</div>
          <div class="column is-size-7" style ="align-items: center;"> 
            <img src='images/types/${moveType}.png'  alt='${moveType}'> 
            <img src='images/cat/${moveCategory}.png'  alt='${moveCategory}'> 
          </div>
      
          </div>
          <p><b>Effect:</b> ${moveEffect}</p>
        </section>
        </div>
      </div>
      `;
          $("body").append(modalHtml);

          $(".modal-background, .delete").click(function () {
            $(".modal").remove();
          });
        });
      });
      pokemonInfo = pokemonInfo.slice(0, -2); // Remove last comma and space
      pokemonInfo += "</td></tr>";
      pokemonInfo += "</tbody> </table> </div> </div>";
      $("#pokemon-info").html(pokemonInfo);
    });
  });
});
