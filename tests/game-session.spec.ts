import { test, expect } from "@playwright/test";
import { setupPlayers } from './helpers/setup-players';

test("Game session persists players when returning to main menu", async ({ page }) => {
  const players = ['Inju', 'Bart'];
  await setupPlayers(page, players);
  
  // Open leaderboard and verify players
  await page.getByTestId("hamburger-menu").click();
  for (const playerName of players) {
    await expect(page.locator('p.player-name').filter({ hasText: playerName })).toBeVisible();
  }
  
  // Go back to main menu
  await page.goto('/arcade-adventure/#/arcade-adventure');
  
  // Wait for the main menu to load by checking for the continue button
  await page.getByTestId("continue-game-button").waitFor({ state: 'visible' });
  
  // Verify session persistence
  await expect(page.getByTestId("continue-game-button")).toBeVisible();
  await expect(page.getByTestId("play-game-button")).toBeHidden();
  
  // Continue game with same players
  await page.getByTestId("continue-game-button").click();
  
  // Verify if the same players are still present in leaderboard
  await page.getByTestId("hamburger-menu").click();
  for (const playerName of players) {
    await expect(page.locator('p.player-name').filter({ hasText: playerName })).toBeVisible();
  }
}); 