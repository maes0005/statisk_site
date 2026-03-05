document
  .querySelectorAll(".filters button")
  .forEach((knap) => knap.addEventListener("click", filter));

document
  .querySelectorAll("[data-price], [data-text]")
  .forEach((knap) => knap.addEventListener("click", sorter));

const kategori = new URLSearchParams(window.location.search).get("category");
const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${kategori}`;

const container = document.querySelector(".productContainer");

let allData;
let filteredData;

function getData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      allData = data;
      filteredData = data;
      showProducts(filteredData);
    });
}

function filter(e) {
  const valgt = e.target.textContent;

  if (valgt === "All") {
    filteredData = allData;
  } else {
    filteredData = allData.filter((element) => element.gender === valgt);
  }
  showProducts(filteredData);
}

function showProducts(json) {
  console.table(json);
  let markup = "";
  json.forEach((element) => {
    const newPrice = element.discount
      ? Math.round(element.price - (element.price * element.discount) / 100)
      : null;
    markup += ` <a href="productdetails.html?id=${element.id}">
        <article class=" ${element.soldout ? "soldOut" : ""} 
          ${element.discount ? "onSale" : ""}">
          <img
            src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp"
            alt="${element.productdisplayname}"
          />
          <h3>${element.productdisplayname}</h3>
          <p class="subtle">${element.brandname}</p>
          <p class="price">DKK <span>${element.price}</span>,-</p>
          <div class="discounted">
            <p>Now DKK <span>974</span>,-</p>
            <p><span>${element.discount}</span>%</p>
          </div>
        </article>
      </a>`;
  });
  container.innerHTML = markup;
}

getData();

function sorter(e) {
  let sorted;

  if (e.target.dataset.price) {
    const dir = e.target.dataset.price;

    if (dir === "up") {
      sorted = [...filteredData].sort((a, b) => a.price - b.price);
    } else {
      sorted = [...filteredData].sort((a, b) => b.price - a.price);
    }
  }

  if (e.target.dataset.text) {
    const dir = e.target.dataset.text;

    if (dir === "az") {
      sorted = [...filteredData].sort((a, b) =>
        a.productdisplayname.localeCompare(b.productdisplayname, "da"),
      );
    } else {
      sorted = [...filteredData].sort((a, b) =>
        b.productdisplayname.localeCompare(a.productdisplayname, "da"),
      );
    }
  }

  showProducts(sorted);
}
