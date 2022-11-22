# RuffLIB Obscure

__A RuffLIB library for roughly encrypting and decrypting strings.__

▶&nbsp; __Version:__ 0.0.1  
▶&nbsp; __Repo:__ <https://github.com/richplastow/rufflib-obscure>  
▶&nbsp; __Homepage:__ <https://richplastow.com/rufflib-obscure>  
▶&nbsp; __Tests:__ <https://richplastow.com/rufflib-obscure/test/run-browser-tests.html>  
▶&nbsp; __Demo 1:__ <https://richplastow.com/rufflib-obscure/demo/demo-1.html>  


### Typical usage:

```js
import Obscure from 'rufflib-obscure';

const foo = new Obscure('Salt in here');

const original = "Some 'printable' ASCII.";
const password = 'My-password';
const encrypted = foo.encrypt(original, password);
const decrypted = foo.decrypt(encrypted, password);

console.log(original); // Some 'printable' ASCII.
console.log(encrypted); // ABC...xyz @TODO replace with real string
console.log(decrypted); // Some 'printable' ASCII.

```


## Dev, Test and Build

Run the test suite in ‘src/docs/’, while working on this library:  
`npm test --src`  
`npm start --src --open --test`  

Build the minified and unminified bundles in ‘dist/’ and ‘docs/’:  
`npm run build`

Run the test suite in ‘docs/’, after a build:  
`npm test`  
`npm start --open --test`  
