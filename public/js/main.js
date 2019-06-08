var artist = document.getElementById('artists');

$('#artists').on('change', function() {
  var artistPath = artist.options[artist.selectedIndex];
  var artistCal = $(artistPath).attr('data-cal');
  var calendarDiv = $('.calendar');
  var calendar = '<iframe src="' + artistCal + '" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>';
  $(calendarDiv).html(calendar);
  calendarDiv.hide().slideDown(500);
});

$('#ham').on('click', function() {
  var mobileNav = $('#mobilenav');
  mobileNav.hide().slideDown(500);
  console.log('I\'ve been clicked');
});

$('.submit').on('click', function () {
  var artistSelected = artist.options[artist.selectedIndex].value;
  var name = $('#name').val();
  var phone = parseInt($('#phone').val().split('-').join(''));
  var email = $('#email').val();
  var idea = $('#idea').val();
  var date = $('#date').val();
  var time = $('#time').val();
  $.post('api/clients', {
    type: 'POST',
    name: name,
    phone: phone,
    email: email,
    idea: idea,
    date: date,
    time: time,
    ArtistId: artistSelected
  }).then(function(data) {
    console.log(data);
    //change to a modal
    alert('Thanks for your submission!');
  });
});