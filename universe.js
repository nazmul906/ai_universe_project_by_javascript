console.log("universe");

let fetchData = [];

const loadData = (datalimit) => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  toggleLoader(true); //starting the spinner
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //   fetchData = data.data.tools;
      //   console.log(data.data);
      displayData(data.data.tools, datalimit);
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
const displayData = (data, datalimit) => {
  //   console.log(data.tools.slice(0, 6));
  //   console.log(data.tools.length);
  const btnShowMore = document.getElementById("btnShowMore");
  if (datalimit) {
    data = data.slice(0, 6);
    btnShowMore.classList.remove("d-none");
  } else {
    btnShowMore.classList.add("d-none");
  }

  console.log("asd", data);
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
            
            <div> 
        <i class="fas fa-arrow-right" onclick="fetchNewsDetail()" data-bs-toggle="modal"
        data-bs-target="#exampleModal"></i>
        </div>
          </div>
    `;
    cardContainer.appendChild(newCard);
  });
  //   stoping the spinner
  toggleLoader(false);
};

//Spinner
const toggleLoader = (isloading) => {
  const spinLoader = document.getElementById("spinLoader");
  if (isloading) {
    spinLoader.classList.remove("d-none");
    console.log("loading");
  } else {
    spinLoader.classList.add("d-none");
    console.log("loaded");
  }

  fetchData.map((data) => {
    console.log(data);
  });
};

//process data
//eta lagbe na karon kno search button nai j load kra kagbe .. deafult  ei load hbe
// const processData = () => {};

document.getElementById("btnShowMore").addEventListener("click", function () {
  //   displayData(fetchData);
  //when clicking we send no datalimit so slice function in display won't be executed so all data will be shown
  loadData();
});

//by default sending some peramter to execute the slice function in display data
loadData(6);
