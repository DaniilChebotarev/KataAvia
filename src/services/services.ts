class AviaService {
  _apiBase = 'https://aviasales-test-api.kata.academy';

  async getResult(url: string) {
    const result = await fetch(url);
    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, recieved ${result.status}`);
    }

    const body = await result.json();
    return body;
  }

  async getId() {
    return this.getResult(`${this._apiBase}/search`);
  }
}

const aviaService = new AviaService();

export default aviaService;
