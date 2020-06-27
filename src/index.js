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
});

fetch("http://localhost:3000/toys")
  .then(function (response) {   
    return response.json(); // call back
  })
  .then(function (json) { // call back     
    createDivCard(json); // console.log(json);
  });
function createDivCard(toys) {
  const divToyCollection = document.querySelector("#toy-collection");
   
  toys.forEach(function (obj) { // this is an array of objects
    // console.log(obj.image);  
    const divCard = document.createElement("div");
    // divCard.className = "card";
    divCard.classList = "card";
    const heading = document.createElement("h2");
    heading.innerText = obj.name;
    divCard.append(heading);

    const imgObj = document.createElement("img");
    imgObj.setAttribute("src", obj.image);
    imgObj.classList = "toy-avatar";
    divCard.append(imgObj);
    //imgObj.setAttribute("class", "toy-avatar");
    const pElement = document.createElement("p");
    pElement.innerText = `${obj.likes}; Likes`;
    divCard.append(pElement);
    
    const button = document.createElement("button")
    PushSubscriptionOptions.classList = "Like-btn";
    button.innerText = "like <3";
    divCard.append(button);

    divToyCollection.append(divCard);
    console.log(divToyCollection);
  });
};

fetch ("http://localhost:3000/toys", {
  method: "POST",
  headers: {
    "Content-Type": "applicaton/json",
    Accept: "application/json"
  }

  body: JSON.stringify({
    "name": "Jessie"
  })
});