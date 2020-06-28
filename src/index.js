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

  //fetches all toys
  function fetchToys(url) {
    fetch(url) 
      .then(response => response.json())
      .then(toyArr => createElements(toyArr))
  }
  
  fetchToys('http://localhost:3000/toys')
  
  const toyCollection = document.querySelector("#toy-collection");
  const form = document.querySelector(".add-toy-form");

  //renders each toy card
  function renderToy (toyObj){
   const toyDiv = document.createElement("div")

   toyDiv.classList = "card"

   toyDiv.innerHTML = `
   <h2>${toyObj['name']}</h2>
   <img src=${toyObj['image']} class="toy-avatar" />
   <p>${toyObj['likes']} likes</p>
   <button class="like-btn">Like <3</button>
   `
   const likeBtn = toyDiv.querySelector(".like-btn")
   const likeP = toyDiv.querySelector("p")

   // update likes event listener
   likeBtn.addEventListener("click", () => {
      toyObj.likes++
      likeP.textContent = `${toyObj.likes} Likes`

      fetch(`http://localhost:3000/toys/${toyObj.id}`, {
        method: 'PATCH', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": toyObj.likes
        })
      })

   })
   toyCollection.append(toyDiv)
  }

  //renders all toy cards
  function createElements (toyArr){
    for (i = 0; i < toyArr.length; i++) {
      renderToy(toyArr[i])
    }
    // toyArr.forEach(renderToy)
  }

  //new toy form event listener
  form.addEventListener("submit", event => {
    event.preventDefault()
    
    const name = event.target.name.value
    const image = event.target.image.value
    
    console.log(event)
  
    fetch(`http://localhost:3000/toys`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "name": name,
          "image": image,
          "likes": 0
        })
        
    })
      .then(response => response.json())
      .then(newToyObj => {
        console.log(newToyObj)
        createElements(newToyObj)
      })
      

})
});
