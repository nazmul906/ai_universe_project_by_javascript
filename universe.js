console.log("universe");
const url = `https://openapi.programming-hero.com/api/ai/tools`;
const loadData = () => {
  toggleLoader(true); //starting the spinner
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayData(data.data);
    });
};

// const loadData = async () => {
//   //   console.log(searchtext);
//   const url = `https://openapi.programming-hero.com/api/ai/tools`;
//   const res = await fetch(url);
//   const data = await res.json();
//   displayData(data.data);
//   //   console.log(data.data);
// };
const displayData = (data) => {
  //   console.log(data.tools.slice(0, 6));
  //   console.log(data.tools.length);

  if (data.tools.length > 6) {
    data = data.tools.slice(0, 6);
    const showmore = document.getElementById("showMore");
    showmore.classList.remove("d-none");
  }

  //catch card container
  const cardContainer = document.getElementById("cardContainer");
  data.forEach((element) => {
    // console.log(element);

    const newCard = document.createElement("div");
    newCard.classList.add("col");
    newCard.innerHTML = `
    <div class="card">
            <img src="${element.image}" class="card-img-top img-fluid" alt="..." />
            <div class="card-body col-md-8 d-flex flex-column" >
           
            <div class= "d-flex flex-column ">
            <h5>Features</h5>
              <p class="card-text">
              ${element.features} 
              </p>
            </div>

            <div>
              <h5> ${element.name} </h5>
            </div>
            <div>
              <h6> ${element.published_in}</h6>
            </div>
          </div>
    `;
    cardContainer.appendChild(newCard);
  });
  //   stoping the spinner
  toggleLoader(false);
};
const toggleLoader = (isloading) => {
  const spinLoader = document.getElementById("spinLoader");
  if (isloading) {
    spinLoader.classList.remove("d-none");
    console.log("loading");
  } else {
    spinLoader.classList.add("d-none");
    console.log("loaded");
  }
};
