// rufflib-obscure/src/docs/demo/demo-1.js

// The ‘main’ file for bundling the first Obscure demo.


/* --------------------------------- Import --------------------------------- */

import Validate from 'rufflib-validate';


/* ---------------------------------- Main ---------------------------------- */

// Runs ‘Demo 1’.
export function obscureDemo1(
    Obscure,
    $el,
) {
    // Validate the arguments.
    const v = new Validate('obscureDemo1()');
    if (! v.class(Obscure, 'Obscure', { _meta:{},
                name:    { kind:'string', rule:/^Obscure$/ },
                VERSION: { kind:'string', rule:/^0\.0\.1$/ } })
     || ! v.object($el, '$el', { _meta:{},
                $log:   { _meta: { inst: HTMLElement } },
                $form0: { _meta: { inst: HTMLElement } },
                $form1: { _meta: { inst: HTMLElement } } })
    ) return { error:v.err };
    const { $log, $form0, $form1 } = $el;
/*
    // Generate the top form.
    const schema0 = {
        _meta: { title:'Top Form' },
        outer: {
            _meta: { title:'Outer' },
            a_boolean: Obscure.boolean(false),
            another_boolean: Obscure.boolean(true),
        },
        foo: Obscure.boolean(true),
    }
    const f0 = new Obscure($form0, 'schema0', schema0);
    if (f0.error) throw Error(f0.error);
    $log.innerHTML = `new Obscure($form0, 'schema0', schema0) =>\n\n`;
    $log.innerHTML += JSON.stringify(f0.toObject(), null, 2);

    // Generate the second form.
    const schema1 = {
        _meta: { title:'Second Form' },
        outer: {
            _meta: { title:'Outer' },
            foo: Obscure.boolean(false),
            inner: {
                _meta: { title:'Inner' },
                bar: Obscure.boolean(false),
                baz: Obscure.boolean(true),
            },
            zub: Obscure.boolean(false),
        },
    }
*/
    const obscure = new Obscure('Salt in here.');
    if (obscure.error) throw Error(obscure.error);
}


/* ---------------------------------- Tests --------------------------------- */

// Runs tests on ‘Demo 1’.
export function testDemo1(expect, Obscure) {
    expect.section('Demo 1');
    const et = expect.that;

    // Basics.
    et(`typeof obscureDemo1`, typeof obscureDemo1).is('function');

    // Invalid arguments.
    et(`obscureDemo1()`,
        obscureDemo1()).hasError(
        `obscureDemo1(): 'Obscure' is type 'undefined' not 'function'`);
    et(`obscureDemo1(function () {})`,
        obscureDemo1(function () {})).hasError(
        `obscureDemo1(): 'Obscure.name' "" fails /^Obscure$/`);
    const $mock = document.createElement('div');

    // Working ok.
    et(`obscureDemo1(Obscure, { $log:$mock, $form0:$mock, $form1:$mock })`,
        obscureDemo1(Obscure, { $log:$mock, $form0:$mock, $form1:$mock })).is(undefined);
}
