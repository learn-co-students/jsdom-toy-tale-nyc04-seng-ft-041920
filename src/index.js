let addToy = false;

const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyForm = document.querySelector(".add-toy-form")

const toyDivCollection = document.querySelector("#toy-collection")

let toyUrl = "http://localhost:3000/toys"
let eachToyUrl = "http://localhost:3000/toys/:id"

//INITIAL FETCH
fetch(toyUrl)
  .then(resp => resp.json())
  .then(toys => {
    toys.forEach(eachToyObj => {
//     console.log(eachToyObj)
      renderToys(eachToyObj)
    })
  })

//render toys to list cards
function renderToys(eachToyObj){
  //card frame
  const cardFrame = document.createElement("div")
  cardFrame.className = "card"
//  console.log(eachToyObj)
// console.log(cardFrame)

  // h2 tag with the toy's name
  const h2 = document.createElement("h2")
  h2.innerHTML = eachToyObj.name
  cardFrame.append(h2)

  // img tag with the src of the toy's image attribute and the class name "toy-avatar"
  const img = document.createElement("img")
 
  img.src = eachToyObj.image //img.setAttribute('src', eachToyObj.image)
  img.className = "toy-avatar" //img.setAttribute('class', "toy-avatar")
  cardFrame.append(img)

  // p tag with how many likes that toy has
  const p = document.createElement("p")
  p.innerHTML = `${eachToyObj.likes} Likes`
  cardFrame.append(p)

  // button tag with a class "like-btn"
  let likeBtn = document.createElement("button")
  likeBtn.setAttribute('class', 'like-btn')
  likeBtn.setAttribute('id', eachToyObj.id)
  likeBtn.innerHTML = "like  <3"
  cardFrame.append(likeBtn)
  likeBtn.addEventListener("click", e => {
 //   console.log(e.target.dataset)
    likes(e)
  })
  toyDivCollection.append(cardFrame)
}


//selected toy FETCH UPDATE likes
function likes(e){
  e.preventDefault()
  let currentLike = parseInt(e.target.previousElementSibling.innerText) + 1
 // console.log(currentLike)

  fetch(toyUrl + `/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": currentLike
    })
  })
    .then(resp => resp.json())
    .then(data => {
      e.target.previousElementSibling.innerText = `${currentLike} likes`
  })
}

//when addBtn gets clicked, show toyFormContainer
addBtn.addEventListener("click", (e) => {
  
  e.preventDefault()

  console.log(toyForm)
  console.log(addToy) //false

  addToy = !addToy //true //if addBtn clicked, then turn true
  console.log(addToy)//true

  if(addToy){ //if true
    toyFormContainer.style.display = "block" //block	Element is rendered as a block-level element
  } else { //if false
    toyFormContainer.style.display = "none"// element will not be displayed
  }
});

toyForm.addEventListener("submit", e => {
  e.preventDefault()

let toyName = e.target.name.value
let imgUrl = e.target.image.value

// let toyNameLoc = toyFormContainer.querySelector('input[name$="name"]')
// console.log(`######${toyNameLoc.name}`)
// console.log(toyName)

fetch(toyUrl, {
  method: "POST",
  headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
  },
  body: JSON.stringify({
    "name": toyName,
    "image": imgUrl,
    "likes": 0
  })
})
  .then(resp => resp.json())
  .then(toyObj => {
    renderOneToy(toyObj)
  })
})

