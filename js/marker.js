
var pins = []
var popups = []
var predictPins = []
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
      textOffset: [0, 0],
      title: ""
    });
  }
  else {
    console.log("show apd pins only...")
    map.removeLayers(["pred-pin"])
  }


}

function loadData(){
  console.log("loading all data...")
  $.get("http://localhost:5000/predictalccrimes", function(data){
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

  $.get("http://localhost:5000/allcrimes", function(data){

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


      if(crimeDate.getDay() == todayDate.getDay() ){
      pins.push(pin)
      }

    }
    var pinsString = JSON.stringify(pins)

    sessionStorage.setItem("pins", pinsString)
  })
}


function showData() {
  //$('#map').load(' #map > *');
    console.log("show apd pins only...")
    var pins = JSON.parse(sessionStorage.getItem("pins"))

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

  })


}
