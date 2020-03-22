const assert = require('assert');
const HelloWorld = artifacts.require('HelloWorld');

contract('Hello World', () => {
  beforeEach(async () => {
    this.helloWorld = await HelloWorld.new();
  });

  it('should have initial message', async () => {
    const message = await this.helloWorld.getMessage();

    assert.equal(message, 'Hello world!');
  });

  it('should allow to set message', async () => {
    await this.helloWorld.setMessage('Goodbye.');

    const message = await this.helloWorld.getMessage();

    assert.equal(message, 'Goodbye.');
  });
});
