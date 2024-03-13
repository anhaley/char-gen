const { handler } = require('./index');

describe('handler', () => {
    it('should return the event body', async () => {
        const event = {
            body: {
                charClass: 'Wizard',
                level: 1,
                name: 'Gandalf'
            }
        };
        const result = await handler(event);
        expect(result).toEqual(event.body);
    });
});
