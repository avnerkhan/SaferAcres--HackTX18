var mapCenterPosition = [-97.740831, 30.282279];

    var subscriptionKey = "xoVvmNFgm2z_1Ny875RMs7f3ibviN6uA6YHtrfwpiiM";
    var map = new atlas.Map("map", {
        "subscription-key": subscriptionKey,
        center: mapCenterPosition,
        zoom: 14
    });

    var pin = new atlas.data.Feature(new atlas.data.Point(mapCenterPosition));
var pins = [pin];

map.events.add("load", function () {
map.addPins(pins, {
fontColor: "#000",
fontSize: 14,
icon: "pin-red",
iconSize: 1,
name: "default-pin-layer",
textFont: "SegoeUi-Bold",
textOffset: [0, 20],
title: "Times Square"
});
});
    function boundingBoxOfPositions(positions) {
        var swLon = 180;
        var swLat = 90;
        var neLon = -180;
        var neLat = -90;
        for (i = 0; i < positions.length; i++) {
            var position = positions[i];
            if (position[0] < swLon) {
                swLon = position[0];
            }
            if (position[1] < swLat) {
                swLat = position[1];
            }
            if (position[0] > neLon) {
                neLon = position[0];
            }
            if (position[1] > neLat) {
                neLat = position[1];
            }
        }
        return [swLon, swLat, neLon, neLat];
    }
    function buildPoiPopupContent(poiProperties) {
        var poiTitleBox = document.createElement("div");
        poiTitleBox.classList.add("poi-title-box", "font-segoeui-b");
        poiTitleBox.innerText = poiProperties.name || poiProperties.address;
        var poiInfoBox = document.createElement("div");
        poiInfoBox.classList.add("poi-info-box", "font-segoeui");
        if (poiProperties.address) {
            var poiAddressInfo = document.createElement("div");
            poiAddressInfo.classList.add("info", "location");
            poiAddressInfo.innerText = poiProperties.address;
            poiInfoBox.appendChild(poiAddressInfo);
        }
        if (poiProperties.phone) {
            var poiPhoneInfo = document.createElement("div");
            poiPhoneInfo.classList.add("info", "phone");
            poiPhoneInfo.innerText = poiProperties.phone;
            poiInfoBox.appendChild(poiPhoneInfo);
        }
        if (poiProperties.url) {
            var linkElement = document.createElement("a");
            linkElement.classList.add("info", "website");
            linkElement.href = "http://" + poiProperties.url;
            linkElement.innerText = poiProperties.url;
            var poiUrlInfo = document.createElement("div");
            poiUrlInfo.appendChild(linkElement);
            poiInfoBox.appendChild(poiUrlInfo);
        }
        var poiContentBox = document.createElement("div");
        poiContentBox.classList.add("poi-content-box");
        poiContentBox.appendChild(poiTitleBox);
        poiContentBox.appendChild(poiInfoBox);
        return poiContentBox;
    }
    map.addEventListener("click", searchLayerName, function (event) {
        var pin = event.features[0];
        searchPopup.setPopupOptions({
            position: pin.geometry.coordinates,
            content: buildPoiPopupContent({
                name: pin.properties.name,
                address: pin.properties.freeformAddress,
                phone: pin.properties.phone,
                url: pin.properties.url
            })
        });
        searchPopup.open(map);
    });
    var shouldChangeCamera = false;
    function searchResultsHandler() {
        searchPins = [];
        searchInfoPanelBody.innerHTML = "";
        searchPopup.close();
        if (this.readyState === 4 && this.status === 400) {
            map.addPins(searchPins, {
                name: searchLayerName,
                overwrite: true
            });
        }
        if (this.readyState === 4 && this.status === 500) {
            window.alert("Problem with search service.");
        }
        if (this.readyState === 4 && this.status === 200) {
            var response = JSON.parse(this.responseText);
            response.results.sort(function (a, b) { return b.score - a.score });
            searchPins = response.results.map(function (item) {
                var geographyPosition = [item.position.lon, item.position.lat];
                var properties = {
                    // data
                    type: item.type,
                    score: item.score,
                    position: item.position,
                    // address info
                    countrySubdivision: item.address.countrySubdivision,
                    freeformAddress: item.address.freeformAddress,
                    municipality: item.address.municipality,
                    postalCode: item.address.postalCode,
                    streetName: item.address.streetName,
                    streetNumber: item.address.streetNumber,
                    // view
                    viewport: item.viewport
                }
                if (item.type === "POI") {
                    properties.name = item.poi.name;
                    properties.phone = item.poi.phone;
                    properties.url = item.poi.url;
                }
                return new atlas.data.Feature(new atlas.data.Point(geographyPosition), properties);
            });
            let searchPin = searchPins ? searchPins[0] : null;
            if (searchPin && shouldChangeCamera) {
                map.setCameraBounds({
                    bounds: [
                        searchPin.properties.viewport.topLeftPoint.lon,
                        searchPin.properties.viewport.btmRightPoint.lat,
                        searchPin.properties.viewport.btmRightPoint.lon,
                        searchPin.properties.viewport.btmRightPoint.lat
                    ]
                });
                map.setCamera({
                    center: [
                        searchPin.properties.position.lon,
                        searchPin.properties.position.lat
                    ],
                    zoom: map.getCamera().zoom - 1
                });
            }
            for (i = 0; i < searchPins.length; i++) {
                searchPin = searchPins[i];
                var resultListItemElement = document.createElement("li");
                resultListItemElement.dataset.lon = searchPin.geometry.coordinates[0];
                resultListItemElement.dataset.lat = searchPin.geometry.coordinates[1];
                resultListItemElement.dataset.search = (searchPin.properties.name) ?
                    searchPin.properties.name + ", " + searchPin.properties.freeformAddress :
                    searchPin.properties.freeformAddress;
                if (searchPin.properties.name) { resultListItemElement.dataset.name = searchPin.properties.name; }
                let line1 = "{name}".replace("{name}", searchPin.properties.name || searchPin.properties.freeformAddress);
                var resultListItemHeadingElement = document.createElement("div");
                resultListItemHeadingElement.classList.add("title", "font-segoeui-b");
                resultListItemHeadingElement.innerText = line1;
                resultListItemElement.appendChild(resultListItemHeadingElement);
                resultListItemElement.dataset.address = searchPin.properties.freeformAddress
                let line2 = "{type}: {freeformAddress}"
                    .replace("{type}", searchPin.properties.type)
                    .replace("{freeformAddress}", searchPin.properties.freeformAddress)

                if (line2) {
                    var resultListItemAddressElement = document.createElement("div");
                    resultListItemAddressElement.classList.add("info", "font-segoeui");
                    resultListItemAddressElement.innerText = line2;
                    resultListItemElement.appendChild(resultListItemAddressElement);
                }
                if (searchPin.properties.phone) {
                    resultListItemElement.dataset.phone = searchPin.properties.phone;
                    var resultListItemPhoneElement = document.createElement("div");
                    resultListItemPhoneElement.classList.add("info", "font-segoeui");
                    resultListItemPhoneElement.innerText = "phone: " + searchPin.properties.phone;
                    resultListItemElement.appendChild(resultListItemPhoneElement);
                }
                if (searchPin.properties.url) {
                    resultListItemElement.dataset.url = searchPin.properties.url;
                    var resultListItemUrlElement = document.createElement("div");
                    resultListItemUrlElement.classList.add("info", "font-segoeui");
                    var linkElement = document.createElement("a");
                    linkElement.href = "http://" + searchPin.properties.url;
                    linkElement.innerText = searchPin.properties.url;
                    resultListItemUrlElement.appendChild(linkElement);
                    resultListItemElement.appendChild(resultListItemUrlElement);
                }
                resultListItemElement.addEventListener("mouseover", function (event) {
                    searchPopup.setPopupOptions({
                        position: [this.dataset.lon, this.dataset.lat],
                        content: buildPoiPopupContent({
                            name: this.dataset.name,
                            address: this.dataset.address,
                            phone: this.dataset.phone,
                            url: this.dataset.url
                        })
                    });
                    searchPopup.open(map);
                });
                resultListItemElement.addEventListener("click", function (event) {
                    shouldChangeCamera = true;
                    document.getElementById("search-input").value = this.dataset.search;
                    search(searchResultsHandler);
                });
                searchInfoPanelBody.appendChild(resultListItemElement);
            }
            map.addPins(searchPins, {
                name: searchLayerName,
                overwrite: true
            });
        }
    };
    var search = function (responseHandler) {
        var searchInputValue = document.getElementById("search-input").value;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = responseHandler;
        var url = "https://atlas.microsoft.com/search/fuzzy/json?";
        url += "&query=" + searchInputValue;
        url += "&api-version=1.0";
        url += "&subscription-key=" + subscriptionKey;
        url += "&extendedPostalCodesFor=POI";
        url += "&lat=" + map.getCamera().center[1];
        url += "&lon=" + map.getCamera().center[0];
        url += "&maxFuzzyLevel=4";
        xhttp.open("GET", url, true);
        xhttp.send();
    };
    var searchInput = document.getElementById("search-input");
    searchInput.addEventListener("keyup", function (e) {
        if (searchInput.value !== "") {
            shouldChangeCamera = (e.keyCode === 13) ? true : false;
            search(searchResultsHandler);
        }
    });
    // Logic For Zoom In Button
    var plusZoomElement = document.createElement("div");
    plusZoomElement.classList.add("zoom", "font-segoeui-b");
    plusZoomElement.id = "zoom-plus";
    plusZoomElement.innerText = "+";
    document.body.appendChild(plusZoomElement);
    plusZoomElement.addEventListener("click", function (event) {
        var currZoom = map.getCamera().zoom;
        map.setCamera({
            zoom: currZoom + 1
        });
    });
    // Logic For Zoom Out Button
    var minusZoomElement = document.createElement("div");
    minusZoomElement.classList.add("zoom", "font-segoeui-b");
    minusZoomElement.id = "zoom-minus";
    minusZoomElement.innerText = "-";
    document.body.appendChild(minusZoomElement);
    minusZoomElement.addEventListener("click", function (event) {
        var currZoom = map.getCamera().zoom;
        map.setCamera({
            zoom: currZoom - 1
        });
    });
