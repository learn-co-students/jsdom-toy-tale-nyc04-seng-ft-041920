let addToy = false;
/* document.addEventListener("DOMContentLoaded", () => { */
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
// });

function createEachCard(obj){
      const divToyCollection = document.querySelector("#toy-collection");
      const divCard = document.createElement("div");
      const heading = document.createElement("h2");
      const imgObj = document.createElement("img");
      const button = document.createElement("button");
      const paragraph = document.createElement("paragraph");
      divCard.className = "card";
      heading.innerText = obj.name
      divCard.append(heading);
      imgObj.setAttribute("src", obj.image);
      imgObj.className =  "toy-avatar";
      divCard.append(imgObj);
      divCard.append(button);
      divCard.append(paragraph);
      paragraph.innerText = `${obj.likes} Likes`;

      button.className = 'like-btn';
      button.innerText = 'Like <3';
      divToyCollection.append(divCard);

      button.addEventListener("click", (event)=>{
        console.log(obj.likes++)
        paragraph.innerText = `${obj.likes} Likes`;
        fetch(`http://localhost:3000/toys/${obj.id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            likes: obj.likes
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8" 
          }
        })
        .then(response => response.json())
        .then(json => console.log(json))
        //Needs interpolation on url to update specific object in db
        //Pass in new value to body 
        //Change method
        //Check progress with console.log
      });
}

fetch("http://localhost:3000/toys")
  .then(function (response) {
    // call back
    return response.json();
  })
  .then(function (json) {
    // callback
    // console.log(json);
    json.forEach(function (obj) {
      createEachCard(obj)
    });
  });


const formElement = document.querySelector(".add-toy-form");
formElement.addEventListener("submit", (event)=>{
  event.preventDefault()
  //console.log(event.target)
  const nameInput = event.target.name.value
  const imageInput = event.target.image.value
  //console.log(event.target.name.value)
  //console.log(event.target.image.value)
  fetch("http://localhost:3000/toys", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: "application/json"
  },
  body: JSON.stringify({
    "name": nameInput,
    "image": imageInput,
    "likes": 0  
  }),
})
  .then(response => response.json())
  .then(data => {
    console.log('Success: ', data);
    createEachCard(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
})
//console.log(formElement)



