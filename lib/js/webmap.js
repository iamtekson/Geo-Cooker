require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Search",
  "esri/widgets/Fullscreen",
  "esri/layers/RouteLayer",
  "esri/widgets/Directions",
  "esri/widgets/Legend",
  "esri/widgets/LayerList",
], function (
  esriConfig,
  Map,
  MapView,
  FeatureLayer,
  Search,
  Fullscreen,
  RouteLayer,
  Directions,
  Legend,
  LayerList
) {
  esriConfig.apiKey = apiKey;

  const map = new Map({
    basemap: "streets-vector",
  });

  const view = new MapView({
    container: "mapViewDiv",
    map: map,
    center: [-105.271909, 40.026389],
    zoom: 9,
    popup: {
      defaultPopupTemplateEnabled: true,
      dockEnabled: true,
      dockOptions: {
        buttonEnabled: false,
        breakpoint: false,
        position: "top-right",
      },
      viewModel: {
        includeDefaultActions: false,
      },
    },
  });

  const search = new Search({
    //Add Search widget
    view: view,
  });

  // main feature layer dataset
  const productDirectory = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Produce_Directory/FeatureServer",
    popupTemplate: {
      title: "{USER_USER1}",
      content: `<b>Location:</b> {USER_USE_1} </br>
      
      <b>Email:</b> {USER_USE_3} </br>
      <b>Website:</b> {USER_USE_4} </br>
      <b>Products:</b> {USER_USE_5} </br>`,
      // outFields: ["USER_USE_1", "USER_USE_3", "USER_USE_4", "USER_USE_5"],

      // fields: [
      //   {
      //     name: "USER_USE_1",
      //     alias: "Location",
      //     type: "string",
      //   },
      //   {
      //     name: "USER_USE_3",
      //     alias: "Email",
      //     type: "string",
      //   },
      //   {
      //     name: "USER_USE_4",
      //     alias: "Website",
      //     type: "string",
      //   },
      //   {
      //     name: "USER_USE_5",
      //     alias: "Products",
      //     type: "string",
      //   },
      // ],
    },
    // add simple point symbol, but use the icon from local image
    renderer: {
      type: "simple",
      symbol: {
        type: "picture-marker",
        url: "https://github.com/iamtekson/esri-hack/blob/main/img/farm_icon.png",
        width: "35px",
        height: "35px",
      },
    },
  });

  map.add(productDirectory);

  // const zipCodes = new FeatureLayer({
  //   url: "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/arcgis/rest/services/zipcode_boulderco_clip/FeatureServer",
  // });
  // map.add(zipCodes);
  // ====================
  // Legend
  // ====================
  view.when(() => {
    const legend = new Legend({
      view: view,
      layerInfos: [
        {
          layer: productDirectory,
          title: "Product Directory",
        },
        // {
        //   layer: zipCodes,
        //   title: "Zip Codes",
        // },
      ],
    });

    // Add widget to the bottom right corner of the view
    view.ui.add(legend, "bottom-left");
  });

  // ====================
  // Layer list
  // ====================

  view.when(() => {
    const layerList = new LayerList({
      view: view,
    });

    // Add widget to the top right corner of the view
    view.ui.add(layerList, "top-right");
  });

  productDirectory.outFields = "*";

  // Productdirectory click event
  // Get the screen point from the view's click event
  view.on("click", function (event) {
    var screenPoint = {
      x: event.x,
      y: event.y,
    };

    // get the productDirectory layer's attribute information
    view.hitTest(screenPoint).then(function (response) {
      var graphic = response.results.filter(function (result) {
        // check if the graphic belongs to the layer of interest
        return result.graphic.layer === productDirectory;
      })[0].graphic;
      const products = graphic.attributes.USER_USE_5;
      fetchRecipe(products.split(","));
    });
  });

  view.ui.add(search, "top-right"); //Add to the map

  fullscreen = new Fullscreen({
    view: view,
  });
  view.ui.add(fullscreen, "top-left");

  // create a new RouteLayer, required for Directions widget
  const routeLayer = new RouteLayer();
  // map.add(routeLayer);

  // create a new Directions widget
  const directions = new Directions({
    // apiKey: apiKey,
    view: view,
    layer: routeLayer,
  });

  $(".route-icon").on("click", function () {
    view.ui.add(directions, "bottom-left");
  });

  //   // add the Directions widget to the view
  //   view.ui.add(directions, "top-right");
  //   view.ui.remove(directions);
});
