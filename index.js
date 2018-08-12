const emoji = require('emojilib')
const uuidv4 = require('uuid/v4');
const fs = require('fs');
const archiver = require('archiver');

let output = fs.createWriteStream('Emoji Pack 2.0.alfredsnippets');
let archive = archiver('zip');

archive.on('error', function(err){
    throw err;
});
archive.pipe(output);

// Loop through Emojis and Generate JSON Files
Object.keys(emoji.lib).forEach(function(key) {

    let e = emoji.lib[key];
    let uuid = uuidv4();

    // Build JSON used by Alfred
    fileContent = {
        alfredsnippet: {
            snippet: e.char,
            uid: uuid,
            name: `${e.char} ${e.keywords.join(' ')}`,
            keyword: `${e.keywords.join(' ')}`
        }
    }

    // append a file from string
    archive.append(JSON.stringify(fileContent, null, 2), { name: `${uuid}.json` });
});

archive.finalize();

console.log('✅ Done');
