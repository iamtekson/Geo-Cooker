function productWiz(productName) {
  const productNameId = productName.split(" ").join("-");
  const html = `<button class="btn btn-secondary mt-1 ml-1 product-name-item ${productNameId}">${productName}</button>`;
  return html;
}

function recipeCartWiz(rJson) {
  return `<div class="col-md-3">
    <div class="card text-center">
      <img class="card-img-top" src="${rJson.img}" alt="${rJson.title}" />
      <div class="card-body">
        <h5 class="card-title">${rJson.title}</h5>
        <p class="card-text">${rJson.uses}</p>
        <a href="#" class="btn btn-primary product-detail-btn" id=${rJson.id}>View more</a>
      </div>
    </div>
  </div>`;
}
