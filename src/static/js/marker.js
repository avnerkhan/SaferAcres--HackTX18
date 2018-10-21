
var pins = []
var popups = []
var predictPins = []
var commonPins = []
var isPredicted = false

function toggle(){
  isPredicted = !isPredicted;
  var pins = JSON.parse(sessionStorage.getItem("predictPins"))
  if (isPredicted){
    console.log("show apd and prediction pins...")
    var layerName = "pred-pin";
    map.addPins(pins, {
      fontColor: "#000",
      fontSize: 14,
      icon: "pin-blue",
      iconSize: 1,
      name: layerName,
      textFont: "SegoeUi-Bold",
      textOffset: [0, 20],
      title: "Predicted"
    });
  }
  else {
    console.log("show apd pins only...")
    map.removeLayers(["pred-pin"])
  }

}

function loadData(){
  console.log("loading all data...")
  $.get("http://localhost:443/predictalccrimes", function(data){
    console.log("Prediction data....")
    console.log(data)

    for(var i = 0; i<data.length; i++) {
      var lat = data[i].latitude
      var long = data[i].longitude
      var pos = [long, lat]
      var pin = new atlas.data.Feature(new atlas.data.Point(pos));
      predictPins.push(pin)
    }

    var predictPinsString = JSON.stringify(predictPins)

    sessionStorage.setItem("predictPins", predictPinsString)


  })

  $.get("http://localhost:443/allcrimes", function(data){

    console.log(data)

    for (var i = 0; i < data.length; i++) {
      var crimeName = data[i].crime_type;
      var time = data[i].crime_time;

      var date = data[i].crime_date;
      var zip = data[i].crime_zip;
      var pos = [data[i].crime_long, data[i].crime_lat]

      var pin = new atlas.data.Feature(new atlas.data.Point(pos));
      // console.log("This is date")
      var crimeDate = new Date(date);
      var todayDate = new Date();
      // console.log(crimeDate.getDay())

      var mostCommonCrimes = ['DISTURBANCE - OTHER', 'FAMILY DISTURBANCE', 'ASSAULT W/INJURY-FAM/DATE VIOL']

      if (mostCommonCrimes.includes(crimeName)) {
        commonPins.push(pin)
      }
      else {
        pins.push(pin)
      }
      // if(crimeDate.getDay() == todayDate.getDay() ){
      //
      // }

    }
    var pinsString = JSON.stringify(pins)
    var commonPinsString = JSON.stringify(commonPins)
    sessionStorage.setItem("commonPins", commonPinsString)
    sessionStorage.setItem("pins", pinsString)
  })
}

function showData() {
    console.log("show apd pins only...")
    var pins = JSON.parse(sessionStorage.getItem("pins"))
    var commonPins = JSON.parse(sessionStorage.getItem("commonPins"))

    map.addEventListener("load", function() {
      /* Add a customized pin to the map */
      var layerName = "default-pin";
      var otherLayer = "most-common"

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

      map.addPins(commonPins, {
        fontColor: "#000",
        fontSize: 14,
        icon: "pin-round-darkblue",
        iconSize: 1,
        name: otherLayer,
        textFont: "SegoeUi-Bold",
        textOffset: [0, 20],
        title: "Common Crime"
      });
  })
}
