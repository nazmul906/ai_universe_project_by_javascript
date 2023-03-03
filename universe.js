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
  cardContainer.innerHTML = "";
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
        <i class="fas fa-arrow-right" onclick="fetchDetail('${element.id}')" data-bs-toggle="modal"
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

const fetchDetail = (id) => {
  // console.log("id", id);
  //as we get the id by clicking details now dynamically append this
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDataModal(data.data));

  //as we get the desire api link(data) which changing dynamically for every card details now send it to modal to show it
};

const displayDataModal = (data) => {
  console.log(data);

  const {
    id,
    logo,
    tool_name,
    description,
    image_link,
    features,
    pricing,
    accuracy,
  } = data;
  //style="max-width: 740px;
  document.getElementById("modalBody").innerHTML = `
 
 <div class="card mb-3" >
  <div class="row g-0" >
    
    <div class="col-md-6 border border-danger" >
      <div class="card-body " >
        <h5 class="card-title">${id}</h5>
        <p class="card-text">${description}</p>

        <div class=" border-0 bg-body d-flex justify-content-between">
        <div >
        <p class="card-text">${pricing[0].price}</p>
        <p class="card-text">${pricing[0].plan}</p>
        </div>
        <div> 
        <p class="card-text">${pricing[1].price}</p>
        <p class="card-text">${pricing[1].plan}</p>
        </div>
        <div> 
        <p class="card-text">${pricing[2].price}</p>
        <p class="card-text">${pricing[2].plan}</p>
        </div>
        </div>

        <div class=" border-0 bg-body d-flex ">
        <div>
          <h3>Features</h3>
          <ul>
           <li> ${features["1"]["feature_name"]}</li>
            <li> ${features["2"]["feature_name"]}</li>
             <li>${features["3"]["feature_name"]}</li>
         </ul>
         </div>
         <div>
          <h3>Integration</h3>
          <ul>
           <li> ${features["1"]["feature_name"]}</li>
            <li> ${features["2"]["feature_name"]}</li>
             <li>${features["3"]["feature_name"]}</li>
         </ul>
         </div>
         </div>

        <div>
        
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <img src="${image_link[0]}" class="img-fluid rounded-start" alt="...">
    </div>
  </div>
</div>
 `;
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
