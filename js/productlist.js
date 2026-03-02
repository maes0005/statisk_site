const kategori = new URLSearchParams(window.location.search).get("category");

// console.log(kategori);

const container = document.querySelector("main");

const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${kategori}`;

function getData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then(showData);
}

function showData(json) {
  console.table(json);
  let markup = "";
  json.forEach((element) => {
    // console.log(element);
    markup += ` <a href="productlist.html">
        <article class="smallProduct onSale soldOut">
          <img
            src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp"
            alt="product image"
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
