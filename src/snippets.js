const gemoji = require('gemoji');
const uuidv4 = require('uuid/v4');

module.exports = function () {

    let snippets = [];

    Object.keys(gemoji.name).forEach((emojiName) => {

        let emoji = gemoji.name[emojiName];
        let uuid = uuidv4();

        // Build JSON used by Alfred
        let snippetContent = {
            alfredsnippet: {
                snippet: emoji.emoji,
                uid: uuid,
                name: `${emoji.emoji} :${emoji.name}:`,
                keyword: `:${emoji.name}:`
            }
        };

        snippets.push(snippetContent);
    });

    // Remove Duplicate Snippets
    return snippets.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj.alfredsnippet.snippet).indexOf(obj.alfredsnippet.snippet) === pos;
    })
}
