(function($) {
  $(function() {
    $('.tabs').tabs();
    $('.scrollspy').scrollSpy();
    M.updateTextFields();
    $('.carousel.carousel-slider').carousel({
       fullWidth: true,
       indicators: true,
     });
    $('.modal').modal();

    $('.sidenav').sidenav();
    $('.tooltipped').tooltip();

    $('.dropdown-trigger').dropdown();
    $('.datepicker').datepicker({autoClose: true});
    $('select').formSelect();
    $('.parallax').parallax();
    $('.timepicker').timepicker({
      vibrate: true,
      showClearBtn: true,
    });
    $(".button-collapse").sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space
