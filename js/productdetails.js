const fisk = new URLSearchParams(window.location.search).get("id");
const endpoint = `https://kea-alt-del.dk/t7/api/products/${fisk}`;

const container = document.querySelector("#productContainer");

function getData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then(showData);
}

function showData(json) {
  console.log(json);
  container.innerHTML = `
   <figure>
        <img
          src="https://kea-alt-del.dk/t7/images/webp/640/${json.id}.webp"
          alt="${json.productdisplayname}"
          class="productImage"
        />
        <span class="saleLabel"></span>
      </figure>
      <section class="productDetails">
        <h2 class="productName">${json.productdisplayname}</h2>
        <div>
          <p class="articleType"><span class="bold">Type:</span> ${json.articletype}</p>
          <p class="productCategory">
            <span class="bold">Kategori:</span> ${json.category}
          </p>
          <p class="productPrice"><span class="bold">Pris:</span> ${json.price},-</p>
          <p class="stock"><span class="bold">Stock:</span> ${json.soldout}</p>
        </div>
        <button class="buyButton">Køb nu</button>
      </section>
  `;
}

getData();
