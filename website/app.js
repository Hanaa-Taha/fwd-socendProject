/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",us&appid=30cb3161f22013948834e0d70bc3ce71&units=imperial";

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  console.log(zip);
  //getweatherDemo(baseURL, zip, apiKey)
  axios
    .get(`${baseURL}${zip}${apiKey}`)
    .then((res) =>
      postData("/addWeather", {
        temperature: res.data.main.temp,
        date: newDate,
        userResponse: feelings,
      })
    )

    .then(() => {
      updateUI();
    });
}
/*const getweatherDemo = async (baseURL, zip, apiKey) => {
  // 1.
  const response = await fetch(baseURL + zip + apiKey);
  // 2. Call Fake API
  // const response = await fetch('/fakeAnimalData')
  try {
    const data = await response.json();
    console.log(data.main.temp);
    // 1. We can do something with our returned data here-- like chain promises!
    return data;
    // 2.
    // postData('/addAnimal', data)
  } catch (error) {
    // appropriately handle the error
    console.log("error", error);
  }
};*/
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = `Date:${allData.date}`;
    document.getElementById(
      "temp"
    ).innerHTML = ` Temperature:${allData.temperature}`;
    document.getElementById(
      "content"
    ).innerHTML = ` I feel:${allData.userResponse}`;
  } catch (error) {
    console.log("erorr", erorr);
  }
};
