let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

getToyData();

//*** Read ***//
//make fetch request to /toys to get all toy objects
//make card div with the response data
function getToyData() {
  fetch("http://localhost:3000/toys")
  .then( function(res) {
    return res.json();
  })
  .then(function(json) {
    json.forEach(function(toy) {
      renderToy(toy)
    })
  })
}

function renderToy(toy) {
  const toyCollection = document.querySelector("#toy-collection")
  //create toy card
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>`
    toyCollection.append(cardDiv)

  //add event listener to card
  cardDiv.addEventListener("click", function(e) {
    if (e.target.className === "like-btn") {
      let newLike = parseInt(e.target.previousElementSibling.innerText) + 1
      patchLike(toy, newLike, e.target)
    }
  })
}

//***Create ***//
//create a new toy
//post req /toys

//event listener that selects input vals and submits createToy
const addToyForm = document.querySelector(".add-toy-form");
addToyForm.addEventListener("submit", function(e) {
  e.preventDefault();

  let toyObject = {
    "name": addToyForm.name.value,
    "image": addToyForm.image.value,
    "likes": 0
  }
  console.log(toyObject)
  createToy(toyObject);
})

function createToy(newToyObject) {
  let configObj = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(newToyObject)
  }
  fetch("http://localhost:3000/toys", configObj)
  .then(function(res) {
    return res.json();
  })
  .then(function(obj){
    console.log(obj)
    renderToy(obj)
  })
}

//add function to clear input field after posting

//*** Update ***//
//patch req to toys/:id
//if success - update

function patchLike(toy, newLike, likeBtn) {
  let configObj = {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify({"likes": newLike})
  }
  fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
  .then(function(res) {
    return res.json();
  })
  .then(function(obj) {
    console.log(obj)
    addLike(likeBtn, newLike)
  })
}

function addLike(likeBtn, newLike) {
  likeBtn.previousElementSibling.innerText = newLike + " Likes";
}


//need to add error catching