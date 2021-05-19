$(function () {

    $('#dropItem1').on('click', function(){
        positionText();
    });

    var positionText = function (){
        var left = $('#dropItem1').css('left');
        $('#saveItem1').val(left);
    }

    $('#addTsk').on('click', function(){
        addTsk();
    })

    var addTsk = function(){
        var addText = $('#addText').val();
        $("<div>",{
            id: 'item2',
            text: addText,
            class: 'movearea bg-warning rounded-lg p-2',
            cmanOMat: 'movearea'
        }).appendTo('#heavyMap');
    }
});