﻿'use strict';
function getWSAddress() {
    var ishttps = 'https:' == document.location.protocol ? true : false;
    var host = window.location.host;
    var head = ishttps ? "wss://" : "ws://"
    return head + host;
}
var webSocket;
var wsMaxLag = 0;
var WsTest = function () {
    //thread safe
    if ($('#wsbutton').attr('disabled') == 'disabled') {
        return;
    }
    $('#wsbutton').attr('disabled', 'disabled');
    startWsTest();
}
var startWsTest = function () {
    //prepare
    var wsStartTime = new Date();
    webSocket = new WebSocket(getWSAddress() + "/Home/Pushing");
    webSocket.onopen = function () {
        $("#spanStatus").text("连接成功");
    };
    webSocket.onmessage = function (evt) {
        //show message
        $("#spanStatus").html('服务器时间: ' + evt.data);
        //get time
        var wslag = new Date() - wsStartTime;
        wsStartTime = new Date();
        //update max
        if (wslag > wsMaxLag) {
            wsMaxLag = wslag;
        }
        //log
        if (wslag > $('#wslagfilter').val()) {
            trig('WebSockeet', wslag + 'ms');
        }
        //update view
        $('#wsStatus').html('当前延迟: ' + wslag + 'ms');
        $("#wsmax").html('最大延迟: ' + wsMaxLag + 'ms');
    };
    webSocket.onerror = function (evt) {
        alert(evt.message);
    };
    webSocket.onclose = function () {
        $("#spanStatus").text("断开");
    };
};