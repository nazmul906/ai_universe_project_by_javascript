console.log("universe");
let showmore = false; // to check show more is clicked after sortbydate is clicked
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
  toggleLoader(true);
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
    // const parsed = Date.parse(element.published_in);
    // console.log("date", parsed);
    const newCard = document.createElement("div");
    newCard.classList.add("col");
    newCard.innerHTML = `
    <div class="card  h-100">
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

            <div class ="d-flex  flex-row justify-content-between">
            <div>
            
            <div>
              <h6> ${element.published_in}</h6>
            </div>
            </div>

            <div class= "ms-4"> 
        <i class="fas fa-arrow-right" onclick="fetchDetail('${element.id}')" data-bs-toggle="modal"
        data-bs-target="#exampleModal"></i>
        </div>
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
//   pricing && pricing[0].price ? pricing[0].price : "freeee"
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

  // const price1 = pricing[0] === "0" ? "Free of cost" : "d-none";
  //style="max-width: 740px;
  document.getElementById("modalBody").innerHTML = `
 
 <div class="card mb-3 " style="max-width: 100%;" >
  <div class="row  g-0" >
    
    <div class="col-12 col-md-6 border border-danger" >
      <div class="card-body " >
        <h5 class="card-title">${id}</h5>
        <p class="card-text">${description}</p>

        <div class=" border-0 bg-body d-flex justify-content-center ">
        <div class="">
        <p class="card-text text-success">${
          pricing ? pricing[0].price : "free of cost"
        }</p>
        <p class="card-text text-success ">${
          pricing ? pricing[0].plan : "free of cost"
        }</p>
        </div>
        <div> 
        <p class="card-text text-warning">${
          pricing ? pricing[1].price : "free of cost"
        }</p>
        <p class="card-text text-warning">$${
          pricing ? pricing[1].plan : "free of cost"
        }</p>
        </div>
        <div> 
        <p class="card-text text-danger">${
          pricing ? pricing[2].price : "free of cost"
        }</p>
        <p class="card-text text-danger">${
          pricing ? pricing[2].plan : "free of cost"
        }</p>
        </div>
        </div>

        <div class=" border-0 bg-body d-flex justify-content-center  ">
        <div>
          <h5>Features</h5>
          <ul>
           <li> ${features["1"]["feature_name"]}</li>
            <li> ${features["2"]["feature_name"]}</li>
             <li>${features["3"]["feature_name"]}</li>
         </ul>
         </div>
         <div>
          <h5>Integration</h5>
          <ul>
           <li>${
             integrations && integrations[0] ? integrations[0] : "No data found"
           }</li>
            <li> ${
              integrations && integrations[1]
                ? integrations[1]
                : "No data found"
            }</li>
             <li>${
               integrations && integrations[2]
                 ? integrations[2]
                 : "No data found"
             }</li>
         </ul>
         </div>
         </div>

        <div>
        
        </div>
      </div>
    </div>

    <div class="col-12  col-md-6">
      <img src="${image_link[0]}" class="img-fluid rounded-start" alt="...">
    
      <div class="btn btn-danger ${display}" style=" position:relative;bottom:120px; left:80px; width:130px ">
      ${accuracy.score * 100}%
       </div>

       <div> <h5 class="text-center">${
         input_output_examples
           ? input_output_examples[0].input
           : "Data is not available yet"
       }</h5></div>
        <div> <h6  class="text-center">${
          input_output_examples
            ? input_output_examples[0].output
            : "Yet to update  "
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
  if (showmore === true) {
    //console.log("showmore", showmore);
    loadDataByDate();
  }
});

document.getElementById("btnSortByDate").addEventListener("click", function () {
  loadDataByDate(6);
  showmore = true;
});

//by default sending some peramter to execute the slice function in display data
loadData(6);
