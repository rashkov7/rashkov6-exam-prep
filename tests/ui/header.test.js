const { test, expect } = require('@playwright/test');

test('Check header', async ({ page }) => {
    await page.goto('http://localhost:8090'); 
    const homeLink = await page.$('a');
    const text = await homeLink.textContent();
    expect(text).toBe('Home');
  });
  
