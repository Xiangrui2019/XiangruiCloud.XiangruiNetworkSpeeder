'use strict';
var pingMaxlag = 0;
var ping = function () {
    //thread safe
    if ($('#pingbutton').attr('disabled') == 'disabled') {
        return;
    }
    $('#pingbutton').attr('disabled', 'disabled');
    startping();
};
var startping = function () {
    //prepare
    var startTime = new Date();
    $.get('/Home/Ping', function (data) {
        //get time
        var endtime = new Date();
        var lag = endtime - startTime;
        //update max value
        if (lag > pingMaxlag) {
            pingMaxlag = lag;
        }
        //log
        if (lag > $('#pinglagfilter').val()) {
            trig('HTTP Get请求', lag + 'ms');
        }
        //update view
        $('#httpStatus').html('当前延迟: ' + lag + 'ms');
        $('#httpMax').html('最大延迟: ' + pingMaxlag + 'ms');
        setTimeout(startping, 30);
    });
}
