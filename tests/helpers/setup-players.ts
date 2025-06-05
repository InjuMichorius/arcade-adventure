import { Page, expect } from '@playwright/test';

export async function setupPlayers(
  page: Page,
  players: string[] = ['Inju', 'Bart', 'Storm', 'Mike']
) {
  try {
    // Navigate to the app and wait for load
    await page.goto('/arcade-adventure/#/arcade-adventure');

    // First wait for the loading state to finish
    const loadingElement = page.getByText('Loading...');
    await expect(loadingElement).toBeHidden({ timeout: 5000 });

    // Then wait for the play button to be rendered and clickable
    const playButton = page.getByTestId("play-game-button");
    await expect(playButton).toBeVisible({ timeout: 30000 });
    await expect(playButton).toBeEnabled();
    
    await playButton.click();

    // Wait for the manage players page to load
    const addPlayerButton = page.getByTestId("add-player-button");
    await expect(addPlayerButton).toBeVisible({ timeout: 5000 });

    // Add players
    for (const [index, playerName] of players.entries()) {
      await addPlayerButton.click();
      const nameInput = page.getByRole("textbox", { name: "Enter name..." }).nth(index);
      await expect(nameInput).toBeVisible();
      await nameInput.fill(playerName);
    }

    // Wait for start game button and click it
    const startGameButton = page.getByTestId("start-game-button");
    await expect(startGameButton).toBeVisible();
    await expect(startGameButton).toBeEnabled();
    await startGameButton.click();

  } catch (e) {
    // Capture debug info on failure
    console.error('Test failed:', e);
    page.screenshot({ path: 'test-failure.png' });
    throw e;
  }
}
