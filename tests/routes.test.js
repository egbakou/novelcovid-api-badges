const services = require("../src/services");

test('Test deaths route data', async () => {
  const {deaths} = await services.getGlobalData();
  expect(deaths).not.toBeNull();
});