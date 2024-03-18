const { submitCharacterRequest } = require('./openAi');

exports.handler = async (event) => {
    return submitCharacterRequest(event.body);
}
