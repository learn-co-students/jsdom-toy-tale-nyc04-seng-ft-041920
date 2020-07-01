let addToy = false;

const toyCollection = document.getElementById('toy-collection');
const toyUrl = "http://localhost:3000/toys"
const toyForm = document.querySelector(".add-toy-form")

toyForm.addEventListener("submit", event => {
  event.preventDefault()
  
  const name = event.target.name.value
  const image = event.target.image.value

  fetch(toyUrl, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

  body: JSON.stringify({
  "name": name,
  "image": image,
  "likes": 0
  })
})
  .then(response => response.json())
  .then(toyObj => {
    renderOneToy(toyObj)
  })


})

function renderOneToy(toyObj) {
  const toyDiv = document.createElement("div")
    toyDiv.className = 'card'

    toyDiv.innerHTML = `
    <h2>${toyObj.name}</h2>
    <img src= "${toyObj.image}" class= "toy-avatar" />
    <p>${toyObj.likes}</p>
    <button class= "like-btn"> Like <3 </button>
    `
    toyCollection.append(toyDiv)
}


fetch(toyUrl)
.then(response => response.json())
.then(toyData => {
  toyData.forEach(toyObj =>{
    renderOneToy(toyObj)
  })
}) 


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








