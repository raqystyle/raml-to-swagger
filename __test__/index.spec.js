var ramlToSwagger = require('../src');

describe('converting', () => {
  it('should fail fast if json is wrong', () => {
    const testJson = '{"some": "json" "that-is": "wrong"}';
    const testData = {
      title: 'test',
      version: '2.0.0',
      securitySchemes: [],
      resources: [],
      schemas: [
        {
          TestSchema: testJson
        }
      ]
    };

    expect(() => {
      ramlToSwagger.convert(testData);
    }).toThrowError([
      'Unexpected string in JSON at position 16',
      [
        '{"some": "json" "that-is": "wrong"}',
        '---------------^'
      ].join('\n')
    ].join('\n'));
  });
});