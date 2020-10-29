//practice 10/29/2020
let addToy = false;

const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");

const toyCollection = document.querySelector("#toy-collection")

//console.log(toyCollection)

document.addEventListener("DOMContentLoaded", () => {

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


//////////////////////////////////////////////////////////////////
///////////////////////////// fetch //////////////////////////////
//////////////////////////////////////////////////////////////////
// On the `index.html` page, there is a `div` with the `id` "toy-collection."

// When the page loads, make a 'GET' request to fetch all the toy objects. With the
// response data, make a `<div class="card">` for each toy and add it to the
// toy-collection `div`.


const toyURL = "http://localhost:3000/toys"

//initial fetch
fetch(toyURL)
  .then(response => response.json())
  .then(data => 
    // console.log(data)
    data.forEach(eachToy => 
      renderToy(eachToy))
    );


//////////////////////////////////////////////////////////////////
///////////////////////////// render ////////////////////////////
//////////////////////////////////////////////////////////////////
function renderToy(eachToy){
  console.log(eachToy)
}