//console.log("hello World")
let addToy = false;

const url = "http://localhost:3000/toys/"
const toyCollection = document.querySelector("#toy-collection")
const addBtn = document.querySelector("#new-toy-btn")
const toyFormContainer= document.querySelector(".container")
const toyForm = document.querySelector(".add-toy-form")


// ## Fetch Andy's Toys
// On the `index.html` page, there is a `div` with the `id` "toy-collection."
// When the page loads, make a 'GET' request to fetch all the toy objects. With the
// response data, make a `<div class="card">` for each toy and add it to the
// toy-collection `div`.

fetch(url)
    .then(r => r.json())
    .then(data => {
        renderAllToys(data)
    })

function renderAllToys(data){
    data.forEach(renderOneToy)
}

// //???? why can't I just use innerHTML directly to the toyCollection?
// function renderOneToy(oneToy){
//     toyCollection.innerHTML = 
//     `
//     <div class="card">
//     <h2>${oneToy.name}</h2>
//     <img src="${oneToy.image}" alt="${oneToy.name}" class="toy-avatar" />
//     <p>${oneToy.likes} Likes </p>
//     <button class="like-btn">Like <3 </button>
//     </div>
//     `
//     console.log(toyCollection)
// }

function renderOneToy(oneToy){
    const cardFrame = document.createElement("div")
    cardFrame.className = "card"

    cardFrame.innerHTML = 
    `
    <h2>${oneToy.name}</h2>
    <img src="${oneToy.image}" alt="${oneToy.name}" class="toy-avatar" />
    <p>${oneToy.likes} Likes </p>
    <button class="like-btn">Like <3 </button>
    `
// ## Increase Toy's Likes

// When a user clicks on a toy's like button, two things should happen:

//   * Conditional increase to the toy's like count without reloading the page
//   * A patch request sent to the server at `http://localhost:3000/toys/:id` updating the number of likes that the specific toy has
//   * Headers and body are provided below (If your request isn't working, make sure your header and keys match the documentation.)
  
  const likeBtn = cardFrame.querySelector(".like-btn")
  const urlOneToy = url + `${oneToy.id}`
  const likesP = cardFrame.querySelector("p")
 // console.log(urlOneToy)

  likeBtn.addEventListener("click", () => {
      const newLikes = oneToy.likes++
      //console.log("liked")
      likesP.textContent = newLikes +" Likes"


      fetch(urlOneToy , {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'patch',                                                              
        body: JSON.stringify( { 
            "likes": newLikes 
            })                                        
        })
    })

// ```
// PATCH http://localhost:3000/toys/:id
// headers: 
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }

// body: JSON.stringify({
//   "likes": <new number>
// })
// ```

    toyCollection.append(cardFrame)
}

// ## Add a New Toy
// * When a user clicks on the add new toy button, a `POST` request is sent to `http://localhost:3000/toys` and the new toy is added to Andy's Toy Collection.
// * The toy should conditionally render to the page.
// * In order to send a POST request via Fetch, give the Fetch a second argument of an object. This object should specify the method as `POST` and also provide the appropriate headers and the JSON-ified data for the request. If your request isn't working, make sure your header and keys match the documentation.

addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if(addToy){
        toyFormContainer.style.display = "block";
    }else{
        toyFormContainer.style.display = "none";
    }
})

toyForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = e.target.name.value;
    const image = e.target.image.value;

    const data = { "name": name,
                  "image": image,
                  "likes": 0 
                  };

    fetch(url, {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(renderOneToy)
    .catch((error) => {
    console.error('Error:', error);
    });
})