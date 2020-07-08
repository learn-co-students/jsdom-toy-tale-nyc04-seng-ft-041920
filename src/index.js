let addToy = false;
// DOM elements
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection")
  const toyForm = document.querySelector(".add-toy-form")

  toyForm.addEventListener("submit", event => {
    event.preventDefault()

    const name = event.target.name.value
    const image = event.target.image.value
    
    
    fetch("http://localhost:3000/toys",{
      method:"POST",
      headers: {
          'Content-Type': 'application/json',
           Accept: "application/json"
      },
      body: JSON.stringify({
        "name":  name,
        "image": image,
        "likes": 0
      })
    })
     .then(response => response.json())
     .then(toyObj => {
       renderOneToy(toyObj)
     })
})
 
  
  
  //Event Listeners
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


//Render Helpers
function renderOneToy(toyObj) {
  const toyDiv = document.createElement("div")
  toyDiv.className = "card"

  //give cards html when created
  toyDiv.innerHTML = `
  <h2>${toyObj.name}</h2>
  <img src=${toyObj.image} alt="${toyObj.name}" class="toy-avatar" />
  <p>${toyObj.likes} Likes </p>
  <button class="like-btn">Like <3</button>
  
`

// individual event listeners
  const likeBtn = toyDiv.querySelector(".like-btn")
  const likesP = toyDiv.querySelector("p")

  likeBtn.addEventListener("click", () => {
    toyObj.likes++
    likesP.textContent = `${toyObj.likes} Likes`

    fetch("http://localhost:3000/toys/${toyObj.id}",{
      method:"PATCH",
      headers: {
          'Content-Type': 'application/json',
           Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": toyObj.likes
      })
    })
     .then(response => response.json())
     .then(toyObj => {
       renderOneToy(toyObj)
     })
  })



       toyCollection.append(toyDiv)
}



// Initialize
fetch('http://localhost:3000/toys')
   .then(r => r.json())
   .then(toyArray => {
     toyArray.forEach(toyObj =>{
      renderOneToy(toyObj)
      //toyArray.forEach(renderOneToy) -forEcah takes a call back function, annynomous
     })
   })
  

   