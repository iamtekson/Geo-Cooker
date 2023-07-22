const productNames = [];

$(".product-name-item").on("click", function () {
  // change the button class from btn-secondary to btn-success and vice versa
  $(this).toggleClass("btn-secondary btn-success");

  // get the product name from the button text if the button is btn-success
  if ($(this).hasClass("btn-success")) {
    const productName = $(this).text();
    productNames.push(productName);
  } else {
    const productName = $(this).text();
    productNames.splice(productNames.indexOf(productName), 1);
  }

  fetchRecipe(productNames);
  console.log(productNames);
});
