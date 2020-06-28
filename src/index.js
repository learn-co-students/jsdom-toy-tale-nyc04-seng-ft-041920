let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
  const serverLink = 'http://localhost:3000/toys'
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toysSection = document.querySelector("#toy-collection")
  const form = document.querySelector(".add-toy-form")

  form.addEventListener("submit", event => {
    // always do this for form submit events!
    event.preventDefault()
    // in the callback, get data from the form (look in the input fields)
    const name = event.target.name.value
    const image = event.target.image.value
    
    // Do Y fetch
    // POST /listings
    fetch('http://localhost:3000/toys' ,  {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        "name": name,
        "image": image,
        "likes": 0
      })
    })
      .then(r => r.json())
      .then(newToy => {
        // console.log(toyObj)
        // console.log()
        // And slap Z on/off the DOM
        // slap on the dom
        renderOneToy(newToy)
      })
  })

  function renderOneToy(toyObj) {
    const outerCard = document.createElement("div")
    outerCard.className = "card"

    outerCard.innerHTML = `
    <h2>${toyObj.name}</h2>
    <img src=${toyObj.image} class="toy-avatar" />
    <p class='likes'>${toyObj.likes} Likes </p>
    <button class="like-btn">🧸</button>
    `

    const likeBtn = outerCard.querySelector(".like-btn")
    const likesPtag = outerCard.querySelector("p")

    likeBtn.addEventListener("click", () => {
      toyObj.likes++
      likesPtag.textContent = `
        ${toyObj.likes} Likes
      `

      fetch(`${serverLink}/${toyObj.id}`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": toyObj.likes
        })
      })
    })

    toysSection.append(outerCard)
  }

  /* Initial Render */ 
  fetch(`${serverLink}`)
  .then(resp => resp.json())
  .then(toyData => {
    toyData.forEach(renderOneToy)
  })

  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
})