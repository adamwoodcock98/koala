const NewsAPI = require('../../models/news_api.js');
require('jest-fetch-mock').enableMocks();

describe('NewsAPI class', () => {
  it('calls fetch and loads news info', async () => {
    const api = new NewsAPI();
    fetch.mockResponseOnce(JSON.stringify({
      title: 'British politics in absolute disarray',
      description: 'Nothing new'
    }));

    api.getNewsInfo('q=politics&', (response) => {
      expect(response.description).toBe('British politics in absolute disarray');
    });
  });
});