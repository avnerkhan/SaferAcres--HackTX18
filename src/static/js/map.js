var mapCenterPosition = [-97.740831, 30.282279];

    var subscriptionKey = "xoVvmNFgm2z_1Ny875RMs7f3ibviN6uA6YHtrfwpiiM";
    var map = new atlas.Map("map", {
        "subscription-key": subscriptionKey,
        center: mapCenterPosition,
        zoom: 14
    });

//     var pin = new atlas.data.Feature(new atlas.data.Point(mapCenterPosition));
// var pins = [pin];


// map.addEventListener("load", function() {
//   /* Add a customized pin to the map */
//   var layerName = "default-pin";
//   // var pin = new atlas.data.Feature(new atlas.data.Point(mapCenterPosition));
//   var pins = sessionStorage.getItem("pins")
//   // var pins = [pin];
//   map.addPins(pins, {
//     fontColor: "#000",
//     fontSize: 14,
//     icon: "pin-red",
//     iconSize: 1,
//     name: layerName,
//     textFont: "SegoeUi-Bold",
//     textOffset: [0, 0],
//     title: ""
//   });
// }
