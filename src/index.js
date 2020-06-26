let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
  const toysContainer = document.querySelector("#toy-collection");
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector(".add-toy-form");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toyData => {
    toyData.forEach(function(toy) {
      toysContainer.innerHTML += `<div class="card" data-id=${toy.id} >
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p> ${toy.likes} Likes </p>
      <button class="like-btn"> <3</button>
    </div>`
    }) 
  })
  form.addEventListener("submit", function(event) {
    event.preventDefault()
    const listingObj = {
    name : event.target.name.value,
    image: event.target.image.value,
    likes: 0
  }
  fetch(`http://localhost:3000/toys`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(listingObj)
  })
    .then(r => r.json())
      // console.log(listingObj)
      // console.log(actualNewListing)
      // And slap Z on/off the DOM
      // slap on the dom
    .then(toy => {
          toysContainer.innerHTML += `<div class="card" data-id=${toy.id} >
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar" />
          <p> ${toy.likes} Likes </p>
          <button class="like-btn"> <3</button>
        </div>`
        }) 
    })
    toysContainer.addEventListener("click", function(event){
      if (event.target.matches(".like-btn")) {
        const outerCard = event.target.closest(".card")
        // const listingId = outerCard.dataset.id
        const likesSpan = outerCard.querySelector("p")
        const newLikes = parseInt(likesSpan.textContent) + 1
        likesSpan.textContent = `${newLikes} Likes`
      fetch(`http://localhost:3000/toys/${outerCard.dataset.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        likes: newLikes
      })
    })
  }
    });
});