// list out products on sidebar
products.forEach((product) => {
  $(".product-items").append(productWiz(product));
});

// fetch request on get recipes button click
function fetchRecipe(productNames) {
  // list out recipes on main page
  const queryParam = {
    kitchen: productNames.join(","),
    app: 1,
    needsimage: 1,
    focus: "",
    exclude: "",
    kw: "",
    catname: "",
    start: 0,
    fave: false,
    lang: "en",
    cv: 2,
  };
  const u = new URLSearchParams(queryParam).toString();

  const queryParamFormData = new FormData();
  queryParamFormData.append("json", JSON.stringify(queryParam));

  fetch(`https://d1.supercook.com/dyn/results?${u}`, {
    method: "POST",
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      const recipe = data.results;
      const recipeCount = data.total_can_make_right_now;
      $(".recipe-items").empty();
      $(".recipe-items").html(
        `<h5 class="col-md-12">You can make ${recipeCount} recipes!</h5>`
      );
      recipe.forEach((r) => {
        $(".recipe-items").append(recipeCartWiz(r));
      });
    })
    .catch(function (err) {
      console.log(err, "error");
      $(".recipe-items").html(
        '<h5 class="ml-4">Please select the products from left sidebar!</h5>'
      );
    });
}

// fetch request on get recipe detail button click
function fetchRecipeDetail(recipeId) {
  fetch(`https://d1.supercook.com/dyn/details?rid=${recipeId}&lang=en`)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      const url = data.recipe.hash;
      window.open(url, "_blank");
    })
    .catch(function (err) {
      console.log(err, "error");
    });
}
