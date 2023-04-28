const {mockedResponse} = require('../src/hooks/useProducts.mock');

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show products page at the beginning', async () => {
    await expect(element(by.text('Postcards'))).toBeVisible();
    await expect(element(by.id('productsListTestID'))).toBeVisible();
  });
});
