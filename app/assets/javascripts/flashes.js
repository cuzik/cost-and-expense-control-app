//= require toastr/toastr

var flashMessages = {
  kinds: {
    'notice': toastr.info,
    'error': toastr.error,
    'alert': toastr.warning,
    'success': toastr.success
  },
  show: function(messages) {
    for(var i = 0; i < messages.length; i++) {
      var kind = messages[i][0]
      var msg = messages[i][1]

      if(msg === '') return false;

      flashMessages.kinds[kind](msg)
    }
  }
}

toastr.options = {
  'closeButton': true,
  'debug': false,
  'newestOnTop': false,
  'progressBar': false,
  'positionClass': 'toast-bottom-right',
  'preventDuplicates': false,
  'onclick': null,
  'showDuration': '300',
  'hideDuration': '1000',
  'timeOut': '5000',
  'extendedTimeOut': '1000',
  'showEasing': 'swing',
  'hideEasing': 'linear',
  'showMethod': 'fadeIn',
  'hideMethod': 'fadeOut'
}
