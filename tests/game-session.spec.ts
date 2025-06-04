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
  await page.goto("http://localhost:3000");
  
  // Verify session persistence
  await expect(page.getByTestId("continue-game-button")).toBeVisible();
  await expect(page.getByTestId("play-game-button")).toBeHidden();
  
  // Continue game with same players
  await page.getByTestId("continue-game-button").click();
  
  // Verify players are still present in leaderboard
  await page.getByTestId("hamburger-menu").click();
  for (const playerName of players) {
    await expect(page.locator('p.player-name').filter({ hasText: playerName })).toBeVisible();
  }
}); 