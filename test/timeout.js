import { strict as assert } from 'node:assert';
import * as Diff3 from '../index.mjs';

export function testTimeout(t, func) {
  t.test('with timeout', t => {  
    const originalDateNow = Date.now;
    const timeout = 1000;

    let time = 0;
    Date.now = () =>  {
      const res = time;
      time += timeout + 1;
      return res;
    };
    assert.throws(() => func(timeout), new Diff3.TimeoutError());

    Date.now = () =>  0;
    assert.doesNotThrow(() => func(timeout));

    Date.now = originalDateNow;
  });
}
