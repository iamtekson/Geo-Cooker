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
      recipe = data.results;
      $(".recipe-items").empty();
      recipe.forEach((r) => {
        $(".recipe-items").append(recipeCartWiz(r));
      });
    })
    .catch(function (err) {
      console.log(err, "error");
    });
}
