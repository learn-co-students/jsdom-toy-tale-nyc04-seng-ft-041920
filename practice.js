const toyCollectionDiv = document.querySelector("#toy-collection");

fetch("http://localhost:3000/toys")
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    console.log(json);
    json.forEach(function (toy) {
      const newDiv = document.createElement("div");
      newDiv.className = "card";
      newDiv.innerHTML = `
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button class="like-btn>Like <3</button>
        `;

      toyCollectionDiv.append(newDiv);
    });
  });
