let addToy = false;

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

form.addEventListener("submit", (event) => {
  event.preventDefault()

  name = event.target.name.value
  image = event.target.image.value

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "image": image,
      "likes": 0
    })
  })
  .then(response => response.json())
  .then(newToy => {
    createEachToy(newToy)
  })
  .catch((error) => {
    console.error('Error:', error);
  });
})

fetch("http://localhost:3000/toys")
.then((response) => {
  return response.json()
})
.then((toyData) => {  
  toyData.forEach(createEachToy) 
})

function createEachToy(toyObj) {
  const toyCollection = document.querySelector("#toy-collection")

  const div = document.createElement('div')
  const h2 = document.createElement('h2')
  const img = document.createElement('img')
  const p = document.createElement('p')
  const button = document.createElement('button')

  div.className = "card"
  img.className = "toy-avatar"
  button.className = "like-btn"
  button.textContent = "Like <3"

  h2.innerText = toyObj.name
  img.src = toyObj.image
  p.innerText = `${toyObj.likes} Likes`
  div.append(h2)
  div.append(img)
  div.append(p)
  div.append(button)

  div.addEventListener("click", (event) => {
    toyObj.likes++
    p.innerText = `${toyObj.likes} Likes`

    fetch(`http://localhost:3000/toys/${toyObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
         Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": toyObj.likes
      })
    })
    .then(response => response.json())
    .then(updatedToy => updatedToy)
  })
  toyCollection.append(div)
}
