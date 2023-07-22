// Product name button click event
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

// season select filter
$(".season-select").on("change", function () {
  const season = $(this).val();
  const productWithMeta = filterProductsBasedOnSeason(season, productsWithMeta); // filter the products based on the season
  console.log(productWithMeta);

  const uniqueProducts = getUniqueProducts(productWithMeta); // get the unique products from the filtered products
  console.log(uniqueProducts);

  $(".product-items").empty();
  uniqueProducts.forEach((p) => {
    $(".product-items").append(productWiz(p));
  });
});

// fetch detail of the recipe
$(".recipe-items").on("click", ".product-detail-btn", function () {
  console.log("clicked");
  const recipeId = $(this).attr("id");
  console.log(recipeId, "recipeId");
  fetchRecipeDetail(recipeId);
});
