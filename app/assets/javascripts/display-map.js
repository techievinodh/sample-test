function displayMap() {
    require(["esri/config", "esri/Map", "esri/views/MapView"], function (esriConfig, Map, MapView) {
        esriConfig.apiKey = "AAPKc59a3091a5204ff89fe1b81423bdb9bbGunmrsvWF89-9OGUsJeJYVXlY4PNJH90lUNF-UboVDJmWtq1OG9iXAnb4x120e8_";

        const map = new Map({
            basemap: "arcgis-topographic"
        });

        const view = new MapView({
            map: map,
            center: [-0.90, 51],
            zoom: 6,
            container: "map"
        });
    });
}
