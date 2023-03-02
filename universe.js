console.log("universe");
const url = `https://openapi.programming-hero.com/api/ai/tools`;
const loadData = () => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data.data));
};
const displayData = (data) => {
  console.log(data.tools);
};
