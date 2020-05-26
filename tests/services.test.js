const services = require("../src/services");

test('Test getGlobalData() method', async () => {
  const data = await services.getGlobalData();
  await expect(data).not.toBeNull();
});

test('Test getGlobalData() cases property', async () => {
  const data = await services.getGlobalData();
  expect(data).toHaveProperty("cases");
});

test('Test getGlobalData() today cases property', async () => {
  const data = await services.getGlobalData();
  expect(data).toHaveProperty("todayCases");
});

test('Test getGlobalData() deaths property', async () => {
  const data = await services.getGlobalData();
  expect(data).toHaveProperty("deaths");
});

test('Test getGlobalData() today deaths property', async () => {
  const data = await services.getGlobalData();
  expect(data).toHaveProperty("todayDeaths");
});

test('Test getGlobalData() recovered property', async () => {
  const data = await services.getGlobalData();
  expect(data).toHaveProperty("recovered");
});