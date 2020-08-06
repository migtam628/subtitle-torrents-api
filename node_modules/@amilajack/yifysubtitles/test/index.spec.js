const fs = require('fs');
const path = require('path');
const pify = require('pify');
const pMap = require('p-map');
const yifysubtitles = require('..');

jest.setTimeout(10 ** 4);

const downloadDir = path.join(__dirname, 'tmp');

describe.skip('basic', () => {
  beforeEach(async () => {
    await pify(fs.mkdir)(downloadDir);
  });

  afterEach(async () => {
    await pify(fs.rmdir)(downloadDir);
  });

  afterAll(async () => {
    await pify(fs.rmdir)(downloadDir);
  });

  test('with imdbid not in api', async () => {
    const subtitles = await yifysubtitles('tt1234567', {
      path: downloadDir,
      langs: ['fr', 'en', 'nl']
    });

    expect(subtitles).toHaveLength(0);
  });

  test('opts.langs bad args', t => {
    expect(() => yifysubtitles('tt1156398', { langs: 'lol string' })).toThrow();
    expect(() => yifysubtitles('tt1156398', { langs: ['zz'] })).toThrow();
  });

  test('download zombieland subtitles in fr, en, nl + transform in vtt', async () => {
    const subtitles = await yifysubtitles('tt1156398', {
      path: downloadDir,
      langs: ['fr', 'en', 'nl']
    });

    expect(subtitles).toHaveLength(3);
    subtitles.forEach(subtitle =>
      t.regex(subtitle.path, /(\.vtt)$/, 'extension should be vtt')
    );

    const paths = subtitles.map(subtitle => subtitle.path);
    await pMap(paths, path =>
      t.notThrows(pify(fs.access)(path), 'file should exist')
    );
    await pMap(paths, path => pify(fs.unlink)(path));
  });

  test('download zombieland subtitles in fr, en, nl', async () => {
    const subtitles = await yifysubtitles('tt1156398', {
      path: downloadDir,
      langs: ['fr', 'en', 'nl'],
      format: 'srt'
    });

    expect(subtitles).toHaveLength(3);
    subtitles.forEach(subtitle =>
      t.regex(subtitle.path, /(\.srt)$/, 'extension should be srt')
    );

    const paths = subtitles.map(subtitle => subtitle.path);
    await pMap(paths, path =>
      t.notThrows(pify(fs.access)(path), 'file should exist')
    );
    await pMap(paths, path => pify(fs.unlink)(path));
  });
});
