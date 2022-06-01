const axios = require("axios");
const nock = require("nock");

const { rest } = require("msw");
const { setupServer } = require("msw/node");

const handlers = [];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("request should be intercepted", async () => {
  const FAKE_URL = "https://fake-url.com";

  const RESPONSE_STATUS = 200;
  const RESPONSE_DATA = {
    value: 1,
  };

  nock(FAKE_URL).get("/").reply(RESPONSE_STATUS, RESPONSE_DATA);

  const request = await axios.get(FAKE_URL);

  expect(request.data).toEqual(RESPONSE_DATA);

  expect(request.status).toEqual(RESPONSE_STATUS);
});
