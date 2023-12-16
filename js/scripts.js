let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector(".modal-container");
  console.log("modalContainer", modalContainer);

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = Object.keys(details.types);
      item.weight = details.weight;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    const $pokemonList = document.querySelector('.pokemon-list');
    const $listItem = document.createElement('li')
    const $button = document.createElement('button');
    $button.innerHTML = pokemon.name

    $pokemonList.appendChild($listItem);
    $listItem.appendChild($button);
    $button.classList.add('button-class');
    // event listener within function
    $button.addEventListener('click', function (e) {
      showDetails(pokemon);
    });
  }


  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  // modal container
  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");
    // let $modalContainer = $("modal-container");
    // clear existing content of the modal
    // modalHeader.empty();
    modalTitle.empty();
    modalBody.empty();

    // creating element for name in modal content
    let nameElement = $("<h>" + item.name + "</h1>");
    // creating img in madal content
    let imageElementFront = $('<img class="modal-img"style="width:50%">');
    imageElementFront.attr("src", item.imageUrlFront);
    let imageElementBack = $('<img class="modal-img"style="width:50%">');
    imageElementBack.attr("src", item.imageUrlBack);
    // creating element for height in madal content
    let heightElement = $("<p>" + "height : " + item.height + "</p>");
    //creating element for weight in modal content
    let weightElement = $("<p>" + "weight : " + item.weight + "</p>");
    // creating element for type in madal content
    let typesElement = $("<p>" + "types : " + item.types + "</p>");
    // creating element for abilities in madal content
    let abilitiesElement = $("<p>" + "abilities : " + item.abilities + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);

    // console.log('modal fire', pokemon)
    // modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = 'Pokemon name' + ': ' + item.name;

    let contentElement = document.createElement('p');
    contentElement.innerText = 'Pokemon height' + ': ' + item.height;

    let myImage = document.createElement('img');
    myImage.src = item.imageUrl;

    // Append elements to the modal
    modal.appendChild(myImage);
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);


    // Append modal to the modal container
    modalContainer.appendChild(modal);

    // Add the 'is-visible' class to show the modal
    modalContainer.classList.add('is-visible'); {
    }
  } // end of showModal function

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }


  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });
  if (modalContainer) {
    modalContainer.addEventListener('click', (e) => {
      // also triggered when clicking INSIDE the modal
      // only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  }

  return {
    addListItem: addListItem,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };

})();


document.addEventListener('DOMContentLoaded', function () {
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon)
    });
  });
});
 
