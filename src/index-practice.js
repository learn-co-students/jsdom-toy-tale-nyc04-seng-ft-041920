//practice 10/29/2020 - 11/1/2020
let addToy = false;

const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyForm = document.querySelector(".add-toy-form")

const toyDivCollection = document.querySelector("#toy-collection") //1

const toyURL = "http://localhost:3000/toys"
//console.log(toyForm)

//////////////////////////////////////////////////////////////////
///////////////////////////// fetch //////////////////////////////
//////////////////////////////////////////////////////////////////

//const eachToy = "http://localhost:3000/toys/:id"

//initial fetch option 1
// fetch(toyURL)
//   .then(response => response.json())
//   .then(data => data.forEach(eachToy =>
//     renderToy(eachToy)))


////initial fetch option 2
fetch(toyURL)
  .then(response => response.json())
  .then(data => {
    renderAllToys(data)
  })

function renderAllToys(data){
  data.forEach(renderOneToy)
}

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////



 
//////////////////////////////////////////////////////////////////
/////////////// ## Fetch Andy's Toys and render //////////////////
//////////////////////////////////////////////////////////////////
// 1 On the `index.html` page, there is a `div` with the `id` "toy-collection."
// When the page loads, make a 'GET' request to fetch all the toy objects. With the
// response data, 
// 2 make a `<div class="card">` 
// 3 for each toy and 
// 4 add it to the toy-collection `div`.

function renderOneToy(eachToy){

    //console.log(eachToy)
    //////////////////////////////////////////////////////////////////
    //option 1
    //   let cardFrame = document.createElement("div") // 2 make a `<div class="card">`
    //   cardFrame.className = "card" //2 make a `<div class="card">`
    //   let eachToyName = document.createElement("h2") //  * `h2` tag with the toy's name
    //   eachToyName.textContent = eachToy.name
    //   cardFrame.append(eachToyName)//3 for each toy
    // //////////////////////////////////////////////////////////////////
    // //  * `img` tag with the `src` of the toy's image attribute and the class name "toy-avatar"
    //   let eachToyImg = document.createElement("img")
    //   eachToyImg.className = "toy-avatar"
    //   eachToyImg.src = eachToy.image
    //   cardFrame.append(eachToyImg)
    // // <img src="" id="rainbow" width="480" />
    // //////////////////////////////////////////////////////////////////
    // //* `p` tag with how many likes that toy has  
    // let eachToyLike = document.createElement("p")
    // eachToyLike.innerText = eachToy.likes + ' likes'
    // cardFrame.append(eachToyLike)
    // //////////////////////////////////////////////////////////////////
    // //  * `button` tag with a class "like-btn"
    // let eachToyBtn = document.createElement("button")
    // eachToyBtn.className = "like-btn"
    // eachToyBtn.innerHTML = "like <3"
    // cardFrame.append(eachToyBtn)

    //////////////////////////////////////////////////////////////////
    //option 2
    const cardFrame = document.createElement("div") // 2 make a `<div class="card">`
    cardFrame.className = "card" //2 make a `<div class="card">`

    cardFrame.innerHTML = `
     <h2>${eachToy.name}</h2>
      <img src="${eachToy.image}" alt="${eachToy.name}" class="toy-avatar" />
     <p>${eachToy.likes} Likes </p>
     <button class="like-btn">Like <3 </button>
    `
   
    //toyDivCollection.append(cardFrame) //4 add it to the toy-collection `div`.
    /////end of option 2/////////////////////////////////////////////////////////////






//////////////////////////////////////////////////////////////////
////////////// ####### Increase Toy's Likes ########//////////////
//////////////////////////////////////////////////////////////////
// When a user clicks on a toy's like button, two things should happen:
//   * Conditional increase to the toy's like count without reloading the page
//   * A patch request sent to the server at `http://localhost:3000/toys/:id` updating the number of likes that the specific toy has
//   * Headers and body are provided below (If your request isn't working, make sure your header and keys match the documentation.)

    const likeBtn = cardFrame.querySelector(".like-btn")
    const likesP = cardFrame.querySelector("p")
    // console.log(toyDivCollection)
    // console.log(likeBtn)
    // console.log(likesP)

  likeBtn.addEventListener("click", () => {
    eachToy.likes++
    likesP.textContent = `${eachToy.likes} Likes`

    fetch(`http://localhost:3000/toys/${eachToy.id}`, {
      method: 'PATCH', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": eachToy.likes
      })
    })
  })
toyDivCollection.append(cardFrame) 
}
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////






//////////////////////////////////////////////////////////////////
/////////////////// ###### Add a New Toy  ########/////////////////
//////////////////////////////////////////////////////////////////
// * When a user clicks on the add new toy button, a `POST` request is sent to `http://localhost:3000/toys` and the new toy is added to Andy's Toy Collection.
// * The toy should conditionally render to the page.
// * In order to send a POST request via Fetch, give the Fetch a second argument of an object. This object should specify the method as `POST` and also provide the appropriate headers and the JSON-ified data for the request. If your request isn't working, make sure your header and keys match the documentation.

//USE DEBUGGER to figure out the value
toyForm.addEventListener("submit", event => {
  event.preventDefault()
  //debugger
  //get data from the form 
  const name = event.target.name.value
  const image = event.target.image.value


 // console.log("submitted")
  //console.log(name)

const data = { "name": name,
                "image": image,
                "likes": 0 
                };

//send data to the server
fetch( toyURL, {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
    Accept: "application/json"
  },
  body: JSON.stringify(data),
})
.then(response => response.json())

//this doesn't render toy without refreshing it
// .then(toyObj => {  
//   console.log('Success:', toyObj);  
// })

//////////////////////////////////////////////////////////////////
//*** render the new posted toy without refreshing it *** ///
.then(toyObj => { 
  renderOneToy(toyObj)
})
})
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


 addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


//////////////////////////////////////////////////////////////////
