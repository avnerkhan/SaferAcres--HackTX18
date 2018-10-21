function login() {
  window.open("home.html", "_self");
}
function crimeAlert() {
  var description = document.getElementById('description');
  var file = document.getElementById('video');
  console.log(file.value);
  $(function() {
    var params = {
        // Request parameters
        "partition": "{string}",
        "externalId": "{string}",
        "callbackUrl": "{string}",
        "metadata": "{string}",
        "language": "{string}",
        "videoUrl": "{string}",
        "fileName": "{string}",
        "indexingPreset": "{string}",
        "streamingPreset": "Default",
        "linguisticModelId": "{string}",
        "privacy": "{string}",
        "externalUrl": "{string}",
        "assetId": "{string}",
        "priority": "{string}",
    };

    // var url = "https://api.videoindexer.ai/northeurope/Accounts/c0053fba-cc8d-4204-829e-956248f954c2/Videos?AccessToken?"
    // $.post(url, function(data){
    //   console.log(data)
    // })

    $.ajax({
        url: "https://api.videoindexer.ai/northeurope/Accounts/c0053fba-cc8d-4204-829e-956248f954c2/Videos?AccessToken?" + $.param(params),
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Content-Type","multipart/form-data");
        },
        type: "POST",
        // Request body
        data: "{body}",
    })
    .done(function(data) {
        alert("success");
    })
    .fail(function() {
        alert("error");
    });
});

}
