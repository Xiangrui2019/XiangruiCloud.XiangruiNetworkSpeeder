'use strict';
var downMaxTime = 0;
var download = function () {
    //thread safe
    if ($('#downloadbutton').attr('disabled') == 'disabled') {
        return;
    }
    $('#downloadbutton').attr('disabled', 'disabled');
    startdownload();
};

var startdownload = function () {
    //prepare
    var st = new Date();
    $.get('/home/download?t=' + st.getMilliseconds(), function (data) {
        //get time
        var et = new Date();
        var downloadTime = et - st;
        //update max value
        if (downloadTime > downMaxTime) {
            downMaxTime = downloadTime;
        }
        //get speed
        var speed = 3.0 / downloadTime * 1000;
        var minspeed = 3.0 / downMaxTime * 1000;
        //log
        if (speed < $('#speedlagfilter').val()) {
            trig('下载', speed + 'MB/s');
        }
        //update view
        $('#downStatus').html('当前速度: ' + speed.toFixed(2) + 'MB/s');
        $('#downMax').html('最大速度: ' + minspeed.toFixed(2) + 'MB/s');
        setTimeout(startdownload, 0);
    });
}