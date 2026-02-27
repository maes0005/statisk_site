const container = document.querySelector("main");

const endpoint = `https://kea-alt-del.dk/t7/api/products`;
function getData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then(showData);
}

function showData(json) {
  let markup = "";
  json.forEach((element) => {
    console.log(element);
    markup += ` <a href="productlist.html">
        <article class="smallProduct onSale soldOut">
          <img
            src="https://kea-alt-del.dk/t7/images/webp/640/1525.webp"
            alt="product image"
          />
          <h3>Blue T20 Indian Cricket Jersey</h3>
          <p class="subtle">Taske | Puma</p>
          <p class="price">DKK <span>1299</span>,-</p>
          <div class="discounted">
            <p>Now DKK <span>974</span>,-</p>
            <p><span>25</span>%</p>
          </div>
        </article>
      </a>`;
  });
  container.innerHTML = markup;
}

getData();
