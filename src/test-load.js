const vm = require('vm');
const fs = require('fs');
const path = require('path');
const pluginCode = fs.readFileSync(path.join(__dirname,'../dist/index.cjs')).toString('utf-8');


const vmExports = {};
const vmModule = {exports: vmExports};
vm.runInNewContext(pluginCode, {
    module: vmModule,
    exports: vmExports,
});
console.log(vmModule);