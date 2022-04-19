const fetch = require("node-fetch");

class NewsAPI {
  async getNewsInfo(query, callback) {
    const response = await fetch(`https://content.guardianapis.com/search?${query}api-key=565a3b14-672a-41b6-83e5-634caa6e8967`);
    try {
      checkStatus(response);
    } catch (error) {
      console.error(error);
    
      const errorBody = await error.response.text();
      console.error(`Error body: ${errorBody}`);
    }
    const data = await response.json();
    callback(data.response.results);
  }
}

module.exports = NewsAPI;

class HTTPResponseError extends Error {
	constructor(response, ...args) {
		super(`HTTP Error Response: ${response.status} ${response.statusText}`, ...args);
		this.response = response;
	}
}

const checkStatus = response => {
	if (response.ok) {
		return response;
	} else {
		throw new HTTPResponseError(response);
	}
}