exports.handler = async (event) => {
    const { charClass, level, name } = event.body;
    return { charClass, level, name };
}