Development Environment:
Node => v9.2.0
NPM  => v6.0.0

Please follow below mentioned steps to reproduce an issue.

`git clone https://github.com/Satish-Lakhani/react-ssr.git`

`cd react-ssr`

`npm i`

`npm run cbd`

Note: Once server starts, copy assets directory from src/ to dist/.
`cp -r src/assets/ dist/`

Then hit: http://localhost:3000,

which will throw below mentioned error.

```
here i'm... /home/satish/source/dist/assets/img/test.png:1
(function (exports, require, module, __filename, __dirname) { �PNG
                                                              ^

SyntaxError: Invalid or unexpected token
    at createScript (vm.js:80:10)
    at Object.runInThisContext (vm.js:152:10)
    at Module._compile (module.js:605:28)
    at Object.Module._extensions..js (module.js:652:10)
    at Module.load (module.js:560:32)
    at tryModuleLoad (module.js:503:12)
    at Function.Module._load (module.js:495:3)
    at Module.require (module.js:585:17)
    at require (internal/module.js:11:18)
    at Login.render (/home/satish/source/dist/client/components/login/Login.js:44:55)
^Cevents.js:136
      throw er; // Unhandled 'error' event

Thanks
