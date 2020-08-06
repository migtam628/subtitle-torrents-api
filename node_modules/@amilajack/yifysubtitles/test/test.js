const yifysubtitles = require('..');

jest.setTimeout(10 ** 4);

describe('basic', () => {
  test('basic', async () => {
    const res = await yifysubtitles('tt1156398', {
      langs: ['fr', 'en', 'zh'],
      path: '/tmp'
    });
    for (const r of res) {
      expect(r).toEqual({
        fileName: expect.any(String),
        lang: expect.any(String),
        langShort: expect.any(String),
        path: expect.any(String)
      });
    }
  });
});
