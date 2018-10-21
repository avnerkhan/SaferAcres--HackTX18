
function crimeAlert() {
  var description = document.getElementById('description');
  var location = document.getElementById('location');

  var file = document.getElementById('video');
  console.log(file.value);
  var card = '<div class="row"><div class="col s12 m7"><div class="card"><div class="card-image"><video class="responsive-video" controls><source src="'+file.value+'" type="video/mp4"></video><div class="card-content"><div class="row"><div class="col s6"><h6><b>Description </b></h6></div><div class="col s6 red-text">18% Crime Severity</div></div><p>'+description.value+'</p><h6><b>Location</b></h6><p>'+location.value+'</p><h6><b>Tags</b></h6><p>#bike #theft #man #stolen </p><h6><b>Suspect Description</b></h6><div class="row valign-wrapper"><div class="col s2"><img src="../static/img/thief.jpg" alt="" class="circle responsive-img"></div><div class="col s10"><span class="black-text">Black Jacket, bulk build.</span></div></div></div></div></div></div>';
  $("#cardList").append(card);



}
