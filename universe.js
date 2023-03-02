console.log("universe");
const url = `https://openapi.programming-hero.com/api/ai/tools`;
const loadData = () => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data.data));
};
const displayData = (data) => {
  //console.log(data.tools);

  //catch card container
  const cardContainer = document.getElementById("cardContainer");
  data.tools.forEach((element) => {
    console.log(element);
    const newCard = document.createElement("div");
    newCard.classList.add("col");
    newCard.innerHTML = `
    <div class="card">
            <img src="..." class="card-img-top" alt="..." />
            <div class="card-body">
            <h5>id: ${element.id}</h5>
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
    `;
    cardContainer.appendChild(newCard);
  });
};
