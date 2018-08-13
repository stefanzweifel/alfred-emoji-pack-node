const gemoji = require('gemoji')
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
Object.keys(gemoji.name).forEach(function(emoji) {

    let e = gemoji.name[emoji]
    let uuid = uuidv4();

    // Build JSON used by Alfred
    fileContent = {
        alfredsnippet: {
            snippet: e.emoji,
            uid: uuid,
            name: `${e.emoji} :${e.name}:`,
            keyword: `:${e.name}:`
        }
    }

    // append a file from string
    archive.append(JSON.stringify(fileContent, null, 2), { name: `${uuid}.json` });
});

archive.finalize();

console.log('✅ Done');
