var busyModal = () => {
  $('#busy').addClass('is-active');
  $('.modal-close').click(function () {
    $('#busy').removeClass('is-active');
  });
};

var freeModal = () => {
  $('#free').addClass('is-active');
  $('.modal-close').click(function () {
    $('#free').removeClass('is-active');
  });
};

var shopHours = (time, context) => {
  var hoursDiv = $('.hours');
  hoursDiv.text(`We\'re sorry but we do not accept reservations ${context} ${time}!`);
  $('#hours').addClass('is-active');
  $('.modal-close').click(function () {
    $('#hours').removeClass('is-active');
  });
};

var artist = document.getElementById('artists');

$('#artists').on('change', function () {
  var artistPath = artist.options[artist.selectedIndex];
  var artistCal = $(artistPath).attr('data-cal');
  var calendarDiv = $('.calendar');
  var calendar = '<iframe id="cal" src="' + artistCal + '" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>';
  $(calendarDiv).html(calendar);
  calendarDiv.hide().slideDown(500);
});

$('#ham').on('click', function () {
  var hamburger = $('#ham');
  hamburger.toggleClass('is-active');
  var mobileNav = $('#mobile-nav');
  mobileNav.toggleClass('hidenav');
});

$('.submit').on('click', function () {
  function timeStringToFloat(time) {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
  }
  var artistSelected = artist.options[artist.selectedIndex].value;
  var name = $('#name').val();
  var phone = parseInt($('#phone').val().split('-').join(''));
  var email = $('#email').val();
  var idea = $('#idea').val();
  var date = $('#date').val();
  var time = $('#time').val();
  var floatTime = timeStringToFloat(time).toFixed(2);
  console.log(floatTime);
  if (artistSelected === '' || name === '' || phone === '' || email === '' || idea === '' || date === '' || time === '') {
    $('#artists').toggleClass('is-danger');
    $('#name').toggleClass('is-danger');
    $('#phone').toggleClass('is-danger');
    $('#email').toggleClass('is-danger');
    $('#idea').toggleClass('is-danger');
    $('#date').toggleClass('is-danger');
    $('#time').toggleClass('is-danger');
    requiredP = $('.required');
    $('.required').toggleClass('help is-danger');
    requiredP.text('This field is required');
  } else if (floatTime >= 20) {
    shopHours('8pm', 'after');
  } else if (floatTime <= 10) {
    shopHours('10am', 'before');
  } else {
    $.post('api/clients', {
      type: 'POST',
      name: name,
      phone: phone,
      email: email,
      idea: idea,
      date: date,
      time: time,
      ArtistId: artistSelected
    }).then(function (data) {
      console.log(data);
      if (data === 'Busy') {
        busyModal();
        console.log('Busy!');
      } else {
        freeModal();
        console.log('Success!');
      }
    });
  }
});