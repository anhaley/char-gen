const { submitCharacterRequest, buildRequest } = require('./openAi');

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

describe('openAi', () => {
    describe('buildRequest', () => {
        it('should build a simple request from input', () => {
            const character = {
                charLevel: 5,
                charClass: 'Wizard',
            };

            const request = buildRequest(character);

            expect(request).toEqual('Level 5 Wizard');
        });

        it('should build a request with secondary options', () => {
            const character = {
                charLevel: 5,
                charClass: 'Fighter',
                secondaryOptions: {
                    'fighting style': 'archery',
                },
            };
            expect(buildRequest(character)).toEqual('Level 5 Fighter; fighting style: archery');
        });
    });
});
