const newToy = document.querySelector("button#new-toy-button")
const submitButton = document.querySelector(".submit");


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

  fetch('http://localhost:4000/toys')
  .then(resp => resp.json())
  .then(x => populateToys(x));
});

// Populates the page with the JSON toys
function populateToys(json){
  const toyCollection = document.querySelector("div#toy-collection");

  json.forEach(e => {
    // Creates the elements
    let newDiv = document.createElement("div");
    let h2 = document.createElement("h2");
    let img = document.createElement("img");
    let p = document.createElement("p");
    let button = document.createElement("button");
    
    // Handles parameter bullshit
    newDiv.classList = "card";
    h2.innerText = e.name;
    img.setAttribute("src", e.image);
    p.innerText = e.likes;
    button.classList = "like-btn";

    // Handles appending
    newDiv.appendChild(h2);
    newDiv.appendChild(img);
    newDiv.appendChild(p);
    newDiv.appendChild(button);
    toyCollection.appendChild(newDiv);
  });
}



function addNewToy(event){ // Take a Button Click Event
  event.preventDefault
  const toyCollection = document.querySelector("div#toy-collection");
  submitButton.addEventListener('click', x => addNewToy(x));
  let formData = {
    name: event.name,     // Keep this as refraction point name
    image: event.images,  // Keep this as refraction point img
    likes: 0              // Keep at 0 for Creation
  };
   
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch('http://localhost:4000/toys', configObj)
  .then(resp => resp.json())
  .then(function(object){
    populateToys(object)
    toyCollection.appendChild(populateToys(object))
  }); // ; || Otherwise .then(x => code);
}
  

// // Increase Toy's Likes
// function toyLikes(event){
//   event.preventDefault();

//   fetch('http://localhost:3000/toys/event.target.id', {
//     method: "PATCH", // Pointed Towards http://localhost:3000/toys/:id
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json"
//     },

//     body: JSON.stringify({
//       "likes": 0 //<new number> INCREASES THE ORIGINAL NUMBER BY 1
//     })
//   })

// }