$(function () {

    $('#dropItem1').on('click', function () {
        // TODO:削除予定
        positionText();
    });

    var positionText = function () {
        // 関数廃止
    }

    $('#btnAddTsk').on('click', function () {
        addTsk();
    })

    var addTsk = function () {
        var option = $('input[name="heavyRadios"]:checked').val();
        switch (option) {
            case "option1":
                var id = "heavyAndUrgent";
                break;
            case "option2":
                var id = "heavyAndUnurgent";
                break;
            case "option3":
                var id = "unheavyAndUrgent";
                break;
            case "option4":
                var id = "unheavyAndUnurgent";
                break;
        };
        var addText = $('#addText').val();
        
        // 新しいタグを作る
        $("<div>", {
            id: 'item2',
            text: addText,
            class: 'bg-warning rounded-lg p-2'
        }).appendTo('#' + id);
    }
});