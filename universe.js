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
      // data = sortDate(data);
      displayData(data.data.tools, datalimit);
    });
};

const loadDataByDate = async (limit1) => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  // displayData(data.data.tools);
  displayDataBydate(data.data.tools, limit1);
  // console.log("data", data.data.tools);
};
const displayDataBydate = (data, limit1) => {
  console.log("Insidedate", data);
  console.log("lm", limit1);
  const sortArray = data.sort(
    (a, b) =>
      Date.parse(new Date(a.published_in)) -
      Date.parse(new Date(b.published_in))
  );
  console.log("sorted", sortArray);
  // data.forEach((elem) => {
  //   const parsed = Date.parse(elem.published_in);
  //   console.log("Insidedateparse", parsed);
  //   console.log("Insidedate", elem);
  // });

  //our destiny is just to sent the sorted array when button is clicked
  if (limit1 == 6) {
    displayData(sortArray, limit1);
  } else {
    displayData(sortArray);
    console.log("show more is clicked");
  }
};

const displayData = (data, datalimit) => {
  //   console.log(data.tools.slice(0, 6));

  const btnShowMore = document.getElementById("btnShowMore");
  if (datalimit) {
    data = data.slice(0, 6);
    btnShowMore.classList.remove("d-none");
  } else {
    btnShowMore.classList.add("d-none");
  }

  //catch card container
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";
  data.forEach((element) => {
    // console.log(element);
    const parsed = Date.parse(element.published_in);
    console.log("date", parsed);
    const newCard = document.createElement("div");
    newCard.classList.add("col", "h-100");
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

//modal
const fetchDetail = (id) => {
  console.log("id", id);
  //as we get the id by clicking details now dynamically append this
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDataModal(data.data));

  //as we get the desire api link(data) which changing dynamically for every card details now send it to modal to show it
};

const displayDataModal = (data) => {
  console.log("dataInModal", data);

  if (data === null) {
    console.log("object is not null");
  } else {
    console.log("myObject is null or undefined");
  }
  const {
    id,
    logo,
    tool_name,
    description,
    image_link,
    features,
    pricing,
    accuracy,
    integrations,
    input_output_examples,
  } = data;

  const display = accuracy.score ? "d-block" : "d-none";
  console.log("accuracy", accuracy.score);
  console.log("pricing", pricing);
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
        <p class="card-text">${pricing ? pricing[0].price : "No cost"}</p>
        <p class="card-text">${pricing ? pricing[0].plan : "No cost"}</p>
        </div>
        <div> 
        <p class="card-text">${pricing ? pricing[1].price : "No Cost"}</p>
        <p class="card-text">$${pricing ? pricing[1].plan : "No cost"}</p>
        </div>
        <div> 
        <p class="card-text">${pricing ? pricing[2].price : "No cost"}</p>
        <p class="card-text">${pricing ? pricing[2].plan : "No cost"}</p>
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
           <li>${integrations ? integrations[0] : "No data found"}</li>
            <li> ${integrations ? integrations[1] : "No data found"}</li>
             <li>${integrations ? integrations[2] : "No data found"}</li>
         </ul>
         </div>
         </div>

        <div>
        
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <img src="${image_link[0]}" class="img-fluid rounded-start" alt="...">
    
      <div class="btn btn-danger ${display}" style=" position:relative;bottom:180px; left:220px; width:130px ">
      ${accuracy.score}
       </div>

       <div> <h5 class="text-center">${
         input_output_examples ? input_output_examples[0].input : "Not found"
       }</h5></div>
        <div> <h6  class="text-center">${
          input_output_examples ? input_output_examples[0].output : "not Found"
        }</h6></div>
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
  loadDataByDate();
});

document.getElementById("btnSortByDate").addEventListener("click", function () {
  loadDataByDate(6);
});

//by default sending some peramter to execute the slice function in display data
loadData(6);
