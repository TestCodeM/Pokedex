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
      

      var imageHtml =" <img width='200' height='200' src='" + imageUrl + "' alt='" + data.name + "'>";
      var pokemonImage =" <div class='pokemon-image-wrapper center image-container' id='pokemon-image' >" + imageHtml + " </div>  ";
      pokemonInfo += "<tr class= 'is-fullwidth' ><th class='has-text-white'>Name:</th><td class='has-text-white'>" + pokeName + "</td></tr>";
      pokemonInfo += "<tr class= 'is-fullwidth'><th class='has-text-white'>Height/Weight:</th><td class='has-text-white'>" + data.height + "m / " + data.weight + "kg</td></tr>";
      pokemonInfo += "</td></tr>";

      //types
      pokemonInfo += "<tr class= 'is-fullwidth'><th class='has-text-white text-center'>Types:</th><td>";
      $.each(data.types, function (index, type) {
        var typeClass = type.type.name.toLowerCase();
        pokemonInfo +=
          "<img style='padding-left:2px; padding-right:2px;' src='images/types/" +
          typeClass +
          ".png'  alt='" +
          typeClass +
          "'>";
      });

      $("#pokemon-image").html(pokemonImage);
      // Display the Pokemon weaknesses 
pokemonInfo += "<tr class='is-fullwidth' id='pokemon-weaknesses-container'> <th class='has-text-white'>Weaknesses: </th><td><div class='type-icons-container'></div></td></tr>";

$.each(data.types, function (index, type) {
  var typeName = type.type.name;
  var typeImageUrl = `images/types/${typeName}.png`;
  var typeDisplayName = typeName.charAt(0).toUpperCase() + typeName.slice(1);

  // Fetch the type data and generate the HTML for the weakness
  var weaknessPromise = $.get(`https://pokeapi.co/api/v2/type/${typeName}`, function (data) {
    var doubleDamageFrom = data.damage_relations.double_damage_from;
    var weaknessHtml = '';

    $.each(doubleDamageFrom, function (index, type) {
      var typeImageUrl = `images/types/${type.name}.png`;
      var typeDisplayName = type.name.charAt(0).toUpperCase() + type.name.slice(1);

      weaknessHtml += `<img class='type-icon' src='${typeImageUrl}' alt='${typeDisplayName}'>`;
    });

    // Add the weakness HTML to the container
    $('#pokemon-weaknesses-container .type-icons-container').append(weaknessHtml);
  });

  // Add the type icon to the container
  weaknessPromise.done(function () {
    var typeHtml = `<img class='type-icon' src='${typeImageUrl}' alt='${typeDisplayName}'>`;
    $('#pokemon-weaknesses-container .type-icons-container').append(typeHtml);
  });
});

pokemonInfo += "</p></td></tr>";

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
var totalStatValue=0;
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
  var statBar =
    "<progress class='progress is-info' value='" +
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
          " <span style= 'margin:5px;'class='button custom-button is-size-5 move-button' data-move-url='" +
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
