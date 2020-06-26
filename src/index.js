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

  let toyCollection = document.querySelector("#toy-collection")
  let form = document.querySelector(".add-toy-form")

  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => {
    renderAllToys(toys)
  })

  form.addEventListener("submit", (event) => {
    event.preventDefault()
    const newToy = {
      name: form.name.value,
      image: form.image.value,
      likes: 0
    }
    fetch('http://localhost:3000/toys',
      {
        method : 'POST',
        body: JSON.stringify(newToy),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }

    ).then(resp => resp.json())
     .then(toy => {
       console.log(toy)
       renderToy(toy)
     })
  })



  function renderToy(toy){
    let toyContainer = document.createElement('div')
    toyContainer.classList = 'card'
    toyContainer.dataset.id = toy.id //only if using event delegation 
    toyContainer.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p><span>${toy.likes}</span> Likes </p>
      <button class="like-btn">Like <3</button>
    `
    toyCollection.appendChild(toyContainer)
    let likeBtn =  toyContainer.querySelector('button')

    likeBtn.addEventListener('click', (e) => {
      let likesSpan = toyContainer.querySelector('span')
      let likes = parseInt(likesSpan.innerText)
      likesSpan.innerText = likes + 1
      fetch(`http://localhost:3000/toys/${toy.id}`, 
      {
        method: "PATCH",
        body: JSON.stringify({"likes" : likes + 1}),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
      )
      .then(resp => resp.json())
      .then(toy => {
         console.log(toy.likes)
      })


    })
  }


  function renderAllToys(toyObjects){
    toyObjects.forEach((toy) => {
      renderToy(toy)
    })
  }

});
