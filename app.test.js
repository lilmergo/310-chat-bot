const {compare } = require('./app');
test( 'should output compared result', ()=> {
    const text = compare(prompts, replies, "im good");
    expect(text).toBe("I am glad to hear that! Could I please get your name?");
});
