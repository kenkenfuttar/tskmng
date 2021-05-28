const {JSDOM} = require("jsdom");
const {window} = new JSDOM("");
const $ = require("jquery")(window);

const getOption = require('../public/js/index').__get__('getOption');
describe('getOption', () => {
    document.body.innerHTML =
        '<div class="form-inline">' +
        '    <div class="form-check form-check-inline">' +
        '        <input class="form-check-input" type="radio" name="heavyRadios" id="heavyRadios1" value="option1" checked="checked">' +
        '        <label class="form-check-label" for="heavyRadios1">' +
        '            重:高―緊:高' +
        '        </label>' +
        '    </div>' +
        '    <div class="form-check form-check-inline">' +
        '        <input class="form-check-input" type="radio" name="heavyRadios" id="heavyRadios2" value="option2">' +
        '        <label class="form-check-label" for="heavyRadios2">' +
        '            重:高―緊:低' +
        '        </label>' +
        '    </div>' +
        '    <div class="form-check form-check-inline">' +
        '        <input class="form-check-input" type="radio" name="heavyRadios" id="heavyRadios3" value="option3">' +
        '        <label class="form-check-label" for="heavyRadios3">' +
        '            重:低―緊:高' +
        '        </label>' +
        '    </div>' +
        '    <div class="form-check form-check-inline">' +
        '        <input class="form-check-input" type="radio" name="heavyRadios" id="heavyRadios4" value="option4">' +
        '        <label class="form-check-label" for="heavyRadios4">' +
        '            重:低―緊:低' +
        '        </label>' +
        '    </div>' +
        '    <input class="form-control" type="text" name="" id="addText" value="">' +
        '    <button type="button" class="btn btn-primary form-control" id="btnAddTask">タスク追加</button>' +
        '</div>';
    it('getOption', () => {
        expect(getOption()).toEqual('option1');
    });
});