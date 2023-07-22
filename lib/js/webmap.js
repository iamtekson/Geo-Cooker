require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Search",
  "esri/widgets/Fullscreen",
  "esri/layers/RouteLayer",
  "esri/widgets/Directions",
], function (
  esriConfig,
  Map,
  MapView,
  FeatureLayer,
  Search,
  Fullscreen,
  RouteLayer,
  Directions
) {
  esriConfig.apiKey = apiKey;

  const map = new Map({
    basemap: "streets-vector",
  });

  const view = new MapView({
    container: "mapViewDiv",
    map: map,
    center: [-105.271909, 40.026389],
    zoom: 8,
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

  const productDirectory = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Produce_Directory/FeatureServer",
    popupTemplate: {
      title: "{USER_USER1}",
      content: `<b>Location:</b> {USER_USE_1} </br>
      
      <b>Email:</b> {USER_USE_3} </br>
      <b>Website:</b> {USER_USE_4} </br>
      <b>Products:</b> {USER_USE_5} </br>`,
    },
    // add simple point symbol, but use the icon from local image
    renderer: {
      type: "simple",
      symbol: {
        type: "picture-marker",
        url: "../../img/farm_icon.png",
        width: "25px",
        height: "25px",
      },
    },
  });

  map.add(productDirectory);

  view.ui.add(search, "top-right"); //Add to the map

  fullscreen = new Fullscreen({
    view: view,
  });
  view.ui.add(fullscreen, "top-left");

  //   // create a new RouteLayer, required for Directions widget
  //   const routeLayer = new RouteLayer();
  //   map.add(routeLayer);

  //   // create a new Directions widget
  //   const directions = new Directions({
  //     apiKey: apiKey,
  //     view: view,
  //     layer: routeLayer,
  //   });

  //   // add the Directions widget to the view
  //   view.ui.add(directions, "top-right");
  //   view.ui.remove(directions);
});
