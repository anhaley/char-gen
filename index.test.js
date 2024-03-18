const { handler } = require('./index');

const lucinda = {
    name: 'Lucinda Spellseer',
    level: 1,
    class: 'Wizard',
};

jest.mock('openai', () => 
    jest.fn().mockImplementation(() => ({
        chat: {
            completions: {
                create: jest.fn().mockResolvedValue({
                    choices: [
                        {
                            message: {
                                content: lucinda
                            }
                        }
                    ]
                })
            }
        }
    }))
);

describe('handler', () => {
    it('should return the API response', async () => {
        const event = {
            body: {
                charClass: 'Wizard',
                charLevel: 1,
            }
        };
        const result = await handler(event);
        expect(result).toEqual(lucinda);
    }, 10000);
});
