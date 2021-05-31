const {JSDOM} = require("jsdom");
const {window} = new JSDOM("");
const $ = require("jquery")(window);

const getCellId = require('../public/js/index').__get__('getCellId');
describe('getCellId', () => {
    document.body.innerHTML =
        '<div class="form-inline">' +
        '    <div class="form-check form-check-inline">' +
        '        <input class="form-check-input" type="radio" name="heavyRadios" id="heavyRadios1" value="heavyAndUrgent" checked="checked">' +
        '        <label class="form-check-label" for="heavyRadios1">' +
        '            重:高―緊:高' +
        '        </label>' +
        '    </div>' +
        '    <div class="form-check form-check-inline">' +
        '        <input class="form-check-input" type="radio" name="heavyRadios" id="heavyRadios2" value="heavyAndUnurgent">' +
        '        <label class="form-check-label" for="heavyRadios2">' +
        '            重:高―緊:低' +
        '        </label>' +
        '    </div>' +
        '    <div class="form-check form-check-inline">' +
        '        <input class="form-check-input" type="radio" name="heavyRadios" id="heavyRadios3" value="unheavyAndUrgent">' +
        '        <label class="form-check-label" for="heavyRadios3">' +
        '            重:低―緊:高' +
        '        </label>' +
        '    </div>' +
        '    <div class="form-check form-check-inline">' +
        '        <input class="form-check-input" type="radio" name="heavyRadios" id="heavyRadios4" value="unheavyAndUnurgent">' +
        '        <label class="form-check-label" for="heavyRadios4">' +
        '            重:低―緊:低' +
        '        </label>' +
        '    </div>' +
        '    <input class="form-control" type="text" name="" id="addText" value="">' +
        '    <button type="button" class="btn btn-primary form-control" id="btnAddTask">タスク追加</button>' +
        '</div>';
    it('getCellId', () => {
        expect(getCellId()).toEqual('heavyAndUrgent');
    });
});