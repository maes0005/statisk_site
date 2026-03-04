const kategori = new URLSearchParams(window.location.search).get("category");
const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${kategori}`;

const container = document.querySelector("main");

function getData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then(showData);
}

function showData(json) {
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
          <p class="subtle">Taske | Puma</p>
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
