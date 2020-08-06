const got = require('got');

jest.setTimeout(10 ** 4);

describe('bar', () => {
  test(`http://yifysubtitles.com should be alive`, async () => {
    const res = await got(`http://yifysubtitles.com`);
    expect(res.statusCode).toEqual(200);
  });
});
