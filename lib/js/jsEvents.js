// Product name button click event
const productNames = [];
$(".product-items").on("click", ".product-name-item", function () {
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
});

// season select filter
$(".season-select").on("change", function () {
  const season = $(this).val();
  const productWithMeta = filterproduceBasedOnSeason(season, produceWithMeta); // filter the produce based on the season

  const uniqueproduce = getUniqueproduce(productWithMeta); // get the unique produce from the filtered produce

  $(".product-items").empty();
  uniqueproduce.forEach((p) => {
    $(".product-items").append(productWiz(p));
  });
});

// fetch detail of the recipe
$(".recipe-items").on("click", ".product-detail-btn", function () {
  const recipeId = $(this).attr("id");
  fetchRecipeDetail(recipeId);
});
