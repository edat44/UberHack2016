/**
* init.js
*
* Set up boilerplate w/ options
*
*/

const fs     = require('fs-extra');
const path   = require('path');
const prompt = require('prompt');
const colors = require('colors/safe');

prompt.message   = '';
prompt.delimiter = '>';

console.log(colors.green('Welcome to this Angular-Express Boilerplate!'));
console.log('Which version would you like to install? (barebones or tutorial)');

let schema = {
    properties: {
        version: {
            pattern: new RegExp('(barebones|tutorial)', 'i'),
            message: 'Please enter "barebones" or "tutorial".'
        },
        'app name': {
            pattern: /^(\w+\s?)+$/,
            message: 'Must contain only words.'
        }
    }
}

prompt.start()
prompt.get(schema, prompt_callback);

function prompt_callback(err, result){

    // Copy source files
    console.log('Copying files from ' + result.version + '...');
    fs.copySync(path.join(__dirname, '../versions/' + result.version + '/src'), './src');

    // Replace "My App" with supplied app name
    console.log('Setting app name...');
    let items = [];
    fs.walk('./src')
        .on('data', file=>items.push(file))
        .on('end', ()=>{
            items.forEach(file_obj=>{
                if(!path.extname(file_obj.path)) return;
                let file_string = fs.readFileSync(file_obj.path, 'utf8')
                    .replace('My App', result['app name']);
                if(!file_string) return;
                fs.writeFileSync(file_obj.path, file_string, {encoding: 'utf8'});
            });
            console.log('Done! Now you can run `gulp` to spin up your test server and start the watchers.');
            process.exit(0);
        });

    // Exit
}
