import { test, expect } from "@playwright/test";
import { setupPlayers } from './helpers/setup-players';

test('Players are able to play the game draw', async ({ page }) => {
    const players = ['Inju', 'Bart'];
  await setupPlayers(page, players);

  // Wait for game instructions to be visible and extract sip amount
  const instructionsLocator = page.locator('.game-instructions li', {
    has: page.locator('.fa-whiskey-glass')
  });
  await expect(instructionsLocator).toBeVisible({ timeout: 5000 });
  
  // Extract sip amount from the instruction text
  const instructionText = await instructionsLocator.textContent();
  await expect.soft(instructionsLocator).toHaveText(/\d+ sips/);
  const sipAmount = Number(instructionText?.match(/(\d+) sips/)?.[1] ?? 0);
  
  // Wait for the play game button to be visible before clicking
  await expect(page.getByTestId('start-game-button')).toBeVisible({ timeout: 5000 });
  await page.getByTestId('start-game-button').click();
  
  await page.getByTestId('reveal-words-button').click();
  
  // Select a random word choice (there are 3 choices, indexed 0-2)
  const randomIndex = Math.floor(Math.random() * 3);
  await page.getByTestId(`word-choice-${randomIndex}`).click();
  
  await page.getByTestId('start-drawing-button').click();
  
  // Draw a single dot in the center of the canvas
  const canvas = page.getByTestId('drawing-canvas');
  const canvasBounds = await canvas.boundingBox();
  if (!canvasBounds) throw new Error('Canvas not found');
  
  const centerX = canvasBounds.x + canvasBounds.width / 2;
  const centerY = canvasBounds.y + canvasBounds.height / 2;
  await page.mouse.move(centerX, centerY);
  await page.mouse.down();
  await page.mouse.up();
  
  // Get canvas data before clearing
  const canvasBeforeClear = await canvas.evaluate((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    return imageData.data.some(pixel => pixel !== 0);
  });
  await expect(canvasBeforeClear).toBeTruthy();
  
  // Clear the canvas
  await page.getByTestId('clear-canvas-button').click();
  
  // Verify canvas is cleared
  const canvasAfterClear = await canvas.evaluate((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    return imageData.data.some(pixel => pixel !== 0);
  });
  await expect(canvasAfterClear).toBeFalsy();
  
  await page.getByTestId('word-guessed-button').click();
  
  // Select both players to drink (using nth to select checkboxes)
  const checkboxes = page.locator('input[type="checkbox"]');
  await checkboxes.first().click();
  await checkboxes.nth(1).click();
  
  await page.getByTestId('drink-button').click();
  // Check if the points text shows the correct sip amount
  await expect(page.locator('.draw-container .points-text').first()).toContainText(sipAmount.toString());

  await page.getByTestId('play-again-button').click();
  await page.getByTestId('hamburger-menu').click();
  // Check points in the navbar avatar preview
  await expect(page.locator('.navbar-container .points-text').first()).toContainText(sipAmount.toString());
});