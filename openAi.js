const OpenAI = require('openai');
const { readFileSync } = require('fs');
const { OPENAI_API_KEY } = require('./secrets');
const aria = require('./prompts/aria1.json');

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const systemPrompt = readFileSync('./prompts/system.txt', 'utf8');

const MODEL = 'gpt-3.5-turbo';

const config = {
    model: MODEL,
    temperature: 1.5,
    max_tokens: 1500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
};

exports.submitCharacterRequest = async ({
    charName,
    charLevel,
    charClass,
    ...rest
}) => {
    const secondaryOptions = rest ?? null;
    const response = await openai.chat.completions.create({
        ...config,
        messages: [
          {
            "role": "system",
            "content": systemPrompt,
          },
          {
            "role": "user",
            "content": "Level 10 fighter",
          },
          {
            "role": "assistant",
            "content": JSON.stringify(aria)
          },
          {
            "role": "user",
            "content": this.buildRequest({
                charLevel,
                charClass,
                secondaryOptions
            }),
          },
        ],
      });
      const { choices, ...metadata } = response;
      console.log(metadata);
      return choices[0].message.content;
};

exports.buildRequest = ({ charLevel, charClass, secondaryOptions }) => {
    let result = `Level ${charLevel} ${charClass}`;
    if (secondaryOptions){
        result += (Object.entries(secondaryOptions).reduce((acc, [key, value]) => {
            acc.push(`; ${key}: ${value}`);
            return acc;
        }, []).join(''));
    }
    return result;
};
