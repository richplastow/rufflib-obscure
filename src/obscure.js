// rufflib-obscure/src/obscure.js

// Assembles the `Obscure` class.


/* --------------------------------- Import --------------------------------- */

import Validate from 'rufflib-validate';

import { NAME, RX_SALT, VERSION } from './helpers/constants.js';


/* ---------------------------------- Class --------------------------------- */

// A RuffLIB library for roughly encrypting and decrypting strings.
//
// Typical usage:
//
//     import Obscure from 'rufflib-obscure';
//     
//     const obscure = new Obscure('Salt in here');
//     
//     const original = "Some 'printable' ASCII.";
//     const password = 'My-password';
//     const encrypted = obscure.encrypt(original, password);
//     const decrypted = obscure.decrypt(encrypted, password);
//     
//     console.log(original); // Some 'printable' ASCII.
//     console.log(encrypted); // ABC...xyz @TODO replace with real string
//     console.log(decrypted); // Some 'printable' ASCII.
//
export default class Obscure {
    static name = NAME; // make sure minification doesn’t squash the `name` property
    static VERSION = VERSION;

    constructor(salt) {

        // Validate the constructor arguments.
        const v = new Validate('new Obscure()', false);
        if (! v.string(salt, 'salt', RX_SALT)) return this.error = v.err;

        // Store the `salt`` argument.
        this.salt = salt;
    }

    toObject() {
        return {
            salt: this.salt,
        }
    }
}


/* ---------------------------------- Tests --------------------------------- */

// Runs basic tests on Obscure.
export function testObscureBasics(expect, Obscure) {
    const et = expect.that;
    expect.section('Obscure basics');

    // Is a class.
    et(`typeof Obscure // in JavaScript, a class is type 'function'`,
        typeof Obscure).is('function');
    et(`Obscure.name // minification should not squash '${NAME}'`,
        Obscure.name).is(NAME);
    et(`Obscure.VERSION // make sure we are testing ${VERSION}`,
        Obscure.VERSION).is(VERSION);
    et(`typeof new Obscure() // invalid invocation, but still an object`,
        typeof new Obscure()).is('object');

    // Invalid constructor arguments.
    et(`new Obscure()`,
        new Obscure()).hasError(
        `new Obscure(): 'salt' is type 'undefined' not 'string'`);
    et(`new Obscure('tabs\\tnot\\tallowed')`,
        new Obscure('tabs\tnot\tallowed')).hasError(
        `new Obscure(): 'salt' \"tabs\tnot\tallowed\" fails /^[ -~]{0,255}$/`);
    et(`new Obscure('Too long. '.repeat(26))`,
        new Obscure('Too long. '.repeat(26))).hasError(
        `new Obscure(): 'salt' \"Too long. T...ng. " fails /^[ -~]{0,255}$/`);

    // constructor arguments ok.
    et(`new Obscure('abc')`,
        new Obscure('abc')).has({ salt:'abc' });

}
