// rufflib-obscure/src/main-test.js
// (compare with rufflib-obscure/main-test.js)

// Entry point for running the unit tests in Obscure’s source files.
// Also used for building Obscure’s unit test distribution files.

import { testObscureBasics } from './obscure.js';

// Run each test. You can comment-out some during development, to help focus on
// individual tests. But make sure all tests are uncommented before committing.
export default function obscureTest(expect, Obscure) {
    testObscureBasics(expect, Obscure);

}
