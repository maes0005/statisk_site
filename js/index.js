const container = document.querySelector("#linkcontainer");
const endpoint = "https://kea-alt-del.dk/t7/api/categories";

function getData() {
  fetch(endpoint)
    .then((respons) => respons.json())
    .then(showData);
}

function showData(data) {
  let markup = "";
  data.forEach(
    (kategori) =>
      (markup += `<a href="productlist.html?category=${kategori.category}">${kategori.category}</a>`),
  );
  container.innerHTML = markup;
}

getData();
