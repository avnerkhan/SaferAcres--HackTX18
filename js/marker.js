
var pins = []
var popups = []

function loadData(){
  console.log("loading all data...")
  $.get("http://localhost:5000/allcrimes", function(data){

    console.log(data)

    for (var i = 0; i < data.length; i++) {
      var crimeName = data[i].crime_type;
      var time = data[i].crime_time;

      var date = data[i].crime_date;
      var zip = data[i].crime_zip;
      var pos = [data[i].crime_long, data[i].crime_lat]

      var pin = new atlas.data.Feature(new atlas.data.Point(pos));
      console.log("This is date")
      var crimeDate = new Date(date);
      var todayDate = new Date();
      console.log(crimeDate.getDay())


      if(crimeDate.getDay() == todayDate.getDay() ){
      pins.push(pin)
      }
      /* Create content for popup */
      var popupContentElement = document.createElement("div");
      popupContentElement.style.padding = "8px";
      var popupNameElement = document.createElement("div");
      popupNameElement.innerText = crimeName;
      popupContentElement.appendChild(popupNameElement);

      /* Create a popup */
      var popup = new atlas.Popup({
        content: popupContentElement,
        position: pos,
        pixelOffset: [0, 0]
      });
      popups.push(popup)
    }
    var popupsString = JSON.stringify(popups)
    var pinsString = JSON.stringify(pins)

    sessionStorage.setItem("popups", popupsString)
    sessionStorage.setItem("pins", pinsString)
  })
}


function showData() {
  console.log("show pins and popups now...")
  var popups = JSON.parse(sessionStorage.getItem("popups"))
  var pins = JSON.parse(sessionStorage.getItem("pins"))
  console.log("Pins is...")
  console.log(pins)
  console.log("Popups is...")
  console.log(popups)

  map.addEventListener("load", function() {
    /* Add a customized pin to the map */
    var layerName = "default-pin";
    // var pin = new atlas.data.Feature(new atlas.data.Point(mapCenterPosition));


    map.addPins(pins, {
      fontColor: "#000",
      fontSize: 14,
      icon: "pin-red",
      iconSize: 1,
      name: layerName,
      textFont: "SegoeUi-Bold",
      textOffset: [0, 0],
      title: ""
    });

    /* Add an event listener for mouse over */
    map.addEventListener("mouseover", layerName, function() {
      /* Open the popup */
      for (var i = 0; i < popups.length; i++) {
        var popup = popups[i];
        popup.open(map);
      }
    });
  })


}
