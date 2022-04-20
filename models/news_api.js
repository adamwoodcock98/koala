const fetch = require("node-fetch");

class NewsAPI {
  async getNewsInfo(query, callback) {
    const response = await fetch(`https://content.guardianapis.com/search?${query}api-key=565a3b14-672a-41b6-83e5-634caa6e8967`);
    const data = await response.json();
    callback(data);
  }
}

module.exports = NewsAPI;