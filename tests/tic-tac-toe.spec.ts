import { setupPlayers } from "./helpers/setup-players";
import { test, expect } from "@playwright/test";

test("Players are able to play the game tic tac toe", async ({ page }) => {
  const players = ["Inju", "Bart"];
  await setupPlayers(page, players);
  await expect(page.getByTestId('skip-game-button')).toBeVisible({ timeout: 5000 });
  await page.getByTestId("skip-game-button").click();
  await expect(page.getByTestId('skip-game-button')).toBeVisible({ timeout: 5000 });
  await page.getByTestId("skip-game-button").click();
  await expect(page.getByTestId('skip-game-button')).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Skip game" }).click();
  await expect(page.getByTestId('play-game-button')).toBeVisible({ timeout: 5000 });
  await page.getByRole("button", { name: "Play game" }).click();
  await page.locator(".cell").first().click();
  await page.locator(".board > div:nth-child(4)").click();
  await page.locator(".board > div:nth-child(2)").click();
  await page.locator("div:nth-child(5)").click();
  await page.locator(".board > div:nth-child(3)").click();
  await page.getByTestId("play-again-button").click();
  await page.locator(".cell").first().click();
  await page.locator(".board > div:nth-child(4)").click();
  await page.locator(".board > div:nth-child(3)").click();
  await page.locator("div:nth-child(5)").click();
  await page.locator("div:nth-child(7)").click();
  await page.locator("div:nth-child(6)").click();
});
