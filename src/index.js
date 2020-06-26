let addToy = false;
let toyCollection
const baseUrl = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", () => {
  toyCollection = document.querySelector("#toy-collection")
  const toyForm = document.querySelector(".add-toy-form")
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
  toyForm.addEventListener("submit", (e) => {
    e.preventDefault()
    addNewToy(e)
    toyFormContainer.style.display = "none";
  })
  
  toyCollection.addEventListener("click", (e) => {
    if (e.target.className === "like-btn") {
      const toyId = e.target.closest(".card").dataset.id
      const likesTag = e.target.closest(".card").querySelector("p")
      const newLikes = parseInt(likesTag.textContent) + 1
      likesTag.textContent = `${newLikes} likes`
      updateLikes(toyId, newLikes)
    }
  })
});

// Render Helpers

function renderOneToy(toyObj) {
  const toyCard = document.createElement("div")
  toyCard.className = "card"
  toyCard.dataset.id = toyObj.id
  toyCard.innerHTML = 
  `
  <h2>${toyObj.name}</h2>
    <img src=${toyObj.image} class="toy-avatar" />
    <p>${toyObj.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  `
  toyCollection.append(toyCard)
}

function renderAllToys(toys) {
  toys.forEach(toy => {
    renderOneToy(toy)
  });
}

fetch(baseUrl)
  .then(res => res.json())
  .then(toys => {
    renderAllToys(toys)
  })

function addNewToy(event) {
  const newToyObj = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0
  }
  fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newToyObj)
  })
  .then(res => res.json())
  .then(newSavedToy => {
    renderOneToy(newSavedToy)
  })
}

function updateLikes(toyId, newLikes) {
  const updatedLikes = {
    likes: `${newLikes}`
  }

  fetch(baseUrl + `/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(updatedLikes)
  })
}
