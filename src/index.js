let addToy = false;

document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#new-toy-btn');
  const toyFormContainer = document.querySelector('.container');
  const toyCollection = document.getElementById('toy-collection');
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
        img.classList.add('toy-avatar')
        img.setAttribute('src', `${dataCard.image}`)
        h2.innerHTML = dataCard.name;
        cardDiv.appendChild(h2);
        cardDiv.appendChild(img);
        toyCollection.appendChild(cardDiv);
        console.log(dataCard);
      });
    });
  // End of 'GET' fetch
});
