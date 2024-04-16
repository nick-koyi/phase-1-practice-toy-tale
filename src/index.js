let addToy = false;

document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#new-toy-btn');
  const toyFormContainer = document.querySelector('.container');
  const toyCollection = document.getElementById('toy-collection');
  const submitBtn = document.querySelector('input[type="submit"]');
  

  // Event Listener for the add toy button
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = 'block';
    } else {
      toyFormContainer.style.display = 'none';
    }
  });
  // End of add toy button event listener
  fetch(`http://localhost:3000/toys/`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.forEach((dataCard) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        const h2 = document.createElement('h2');
        const img = document.createElement('img')
        const p = document.createElement('p')
        const likeButton = document.createElement('button')
        img.classList.add('toy-avatar')
        img.setAttribute('src', `${dataCard.image}`)
        h2.innerHTML = dataCard.name;
        p.innerHTML = dataCard.likes + ' Likes'
        likeButton.id = dataCard.id
        likeButton.classList.add('like-btn')
        likeButton.innerHTML = 'Like ❤️'

        cardDiv.appendChild(h2);
        cardDiv.appendChild(img);
        cardDiv.appendChild(p);
        cardDiv.appendChild(likeButton)
        toyCollection.appendChild(cardDiv);
        //like button functionality
        likeButton.addEventListener('click', () => {
          let numberOfLikes = dataCard.likes
          numberOfLikes++
          fetch(`http://localhost:3000/toys/${dataCard.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              likes: numberOfLikes
            })
          })
          .then((res) => {return res.json()})
          .then(() => {
            p.innerHTML = numberOfLikes + ' Likes'
          })

        })
        
        //End of like button functionality
      });
    });
  // End of 'GET' fetch

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let nameInput = document.querySelector('.nameInput')
    let imgInput = document.querySelector('.imgInput')

    fetch('http://localhost:3000/toys/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": nameInput.value.trim(),
        "image": imgInput.value.trim(),
        "likes": 0
      })
    }).then((res) => {
      return res.json()
    }).then((data) => {
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card');
      const h2 = document.createElement('h2');
      const img = document.createElement('img')
      const p = document.createElement('p')
      const likeButton = document.createElement('button')
      img.classList.add('toy-avatar')
      img.setAttribute('src', `${data.image}`)
      h2.innerHTML = data.name;
      p.innerHTML = data.likes + ' Likes'
      likeButton.id = data.id
      likeButton.classList.add('like-btn')
      likeButton.innerHTML = 'Like ❤️'

      cardDiv.appendChild(h2);
      cardDiv.appendChild(img);
      cardDiv.appendChild(p);
      cardDiv.appendChild(likeButton)
      toyCollection.appendChild(cardDiv);

    })
    nameInput.value = ''
    imgInput.value = ''
  })
  //End of 'POST' fetch

});
 