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
    center: [-122.4194, 37.7749],
    zoom: 12,
  });

  const search = new Search({
    //Add Search widget
    view: view,
  });

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
