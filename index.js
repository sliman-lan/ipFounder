fetch("https://ipapi.co/json/")
  .then(function (response) {
    response.json().then((jsonData) => {
      const country = document.querySelector("#country");
      const city = document.querySelector("#city");
      const ip = document.querySelector("#ip");
      const org = document.querySelector("#org");
      country.textContent = jsonData["country_name"];
      city.textContent = jsonData["city"];
      ip.textContent = jsonData["ip"];
      org.textContent = jsonData["org"];
    });
  })
  .catch(function (error) {
    console.log(error);
  });

function getApi(url, ...data) {
  fetch(url)
    .then(function (response) {
      data.length
        ? response.json().then((jsonData) => {
            g(jsonData, ...data);
          })
        : response.text().then((jsonData) => g(jsonData, ...data));
    })
    .catch(function (error) {
      console.log(error);
    });
}
function g(jsonData, ...data) {
  const country = document.querySelector("#country");
  const city = document.querySelector("#city");
  const ip = document.querySelector("#ip");
  const org = document.querySelector("#org");
  const arrOfEle = [country, city, ip, org];
  if (typeof jsonData === "object")
    data.forEach((d, index) => {
      document
        .querySelectorAll(".content > div")
        .forEach((div) => div.classList.remove("hide"));
      arrOfEle[index].textContent = jsonData[d];
    });
  else {
    document
      .querySelectorAll(".content > div")
      .forEach((div) => div.classList.add("hide"));
    ip.parentElement.parentElement.classList.remove("hide");
    ip.textContent = jsonData;
  }
}

const li = document.querySelectorAll(".nav-link");

li.forEach((link) => {
  link.addEventListener("click", function () {
    if (link.matches(".active")) return false;
    else {
      li.forEach((a) => {
        a.classList.remove("active");
        a.setAttribute("aria-current", "");
      });
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
    if (link.textContent.toLocaleLowerCase() === "home") {
      console.log("home page");
      getApi("https://ipapi.co/json/", "country_name", "city", "ip", "org");
    } else if (link.textContent.toLocaleLowerCase() === "other") {
      console.log("last one");
      getApi("https://ipapi.co/ip/");
    }
  });
});
