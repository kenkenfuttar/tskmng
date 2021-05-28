import { add, sub } from '../public/js/mylib';

test('add 1 + 2', () => {
  expect(add(1, 2)).toBe(3);
});

const subb = require('../public/js/mylib').__get__('subb');
describe('subb', () => {
  it('subb 1 - 2', () => {
    expect(subb(1, 2)).toEqual(-1);
  });
});