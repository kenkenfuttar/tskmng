$(function () {
    $('#btn_output').on('click', function () {
        positionWrite();
    });

    var positionWrite = function () {
        var left = $('#item1').css('left');
        alert(left);
        var blob = new Blob([left], { "type": "text/plain" });
        $('#btn_output').attr('href', window.URL.createObjectURL(blob));
    }
});