import { test, expect } from '@playwright/test';
import { setupPlayers } from './helpers/setup-players';
import { clickMultipleTimes, setupFastTimer, cleanupTimer } from './helpers/test-utils';

test('Players are able to play the game where that whistle', async ({ page }) => {
  // Setup fast timer before the game starts
  await setupFastTimer(page);
  
  const players = ['Inju', 'Bart'];
  await setupPlayers(page, players);
  
  // Wait for buttons to be visible before clicking
  await expect(page.getByTestId('skip-game-button')).toBeVisible({ timeout: 5000 });
  await page.getByTestId('skip-game-button').click();
  
  await expect(page.getByTestId('play-game-button')).toBeVisible({ timeout: 5000 });
  await page.getByTestId('play-game-button').click();

  await page.getByTestId('decrease-whistle-interval').first().click();
  
  // Decrease search time by clicking 8 times
  await clickMultipleTimes(page, 'decrease-search-time', 8);
  
  await page.getByTestId('test-sound-button').click();
  await page.getByTestId('start-search-button').click();
  
  await page.getByTestId('found-button').click();
  await expect(page.getByText('The hider drinks 5!')).toBeVisible();
  await page.getByTestId('play-again-button').click();
  await page.getByTestId('start-search-button').click();
  await expect(page.getByText('All seekers drink 10!')).toBeVisible();

  // Wait for 300ms (30 seconds in game time)
  await page.waitForTimeout(300);
  //expect

  // Cleanup timer after test
  await cleanupTimer(page);
});