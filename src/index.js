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

const toyCollectionParentNode = document.querySelector("#toy-collection");

fetch("http://localhost:3000/toys")
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    json.forEach(function (toy) {
      addToyToDom(toy);
    });
  });

function addToyToDom(toy) {
  const toyDiv = document.createElement("div");
  toyDiv.className = "card";

  toyDiv.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p><span>${toy.likes}</span> Likes </p>
      <button class="like-btn">Like <3</button>
      `;

  toyCollectionParentNode.append(toyDiv);

  const button = toyDiv.querySelector("button");
  button.addEventListener("click", function (event) {
    // toy.likes++;
    const toyLikes = toyDiv.querySelector("span");
    toyLikes.innerText++;

    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        likes: toyLikes.innerText,
      }),
    });
  });
}

const formElement = document.querySelector("form");

formElement.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = event.target.name.value;
  const image = event.target.name.value;

  const toyObject = {
    name: name,
    image: image,
    likes: 0,
  };

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(toyObject),
  });

  addToyToDom(toyObject);
});
