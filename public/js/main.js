$(document).ready(function() {
    var socket = io('http://192.168.1.59:9000');
    var slide = document.getElementById('slider1');

    slide.onchange = function() {
        console.log("slider");
        socket.emit('slider-changed', { value: slide.value });
    }
});
