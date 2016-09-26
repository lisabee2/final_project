$(document).ready(function(){
  $('.hamburger').on('click', function(){
    $('nav').toggleClass('show');
      $('header').toggleClass('show');
  });
});