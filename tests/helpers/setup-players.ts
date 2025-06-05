import { Page, expect } from '@playwright/test';

export async function setupPlayers(
  page: Page,
  players: string[] = ['Inju', 'Bart', 'Storm', 'Mike']
) {
  // Add console error handler
  page.on('console', msg => {
    console.log(`Browser ${msg.type()}: ${msg.text()}`);
  });

  page.on('pageerror', error => {
    console.log('Page error:', error.message);
  });

  try {
    // Navigate to the app and wait for load
    await page.goto('/arcade-adventure/#/arcade-adventure');
    
    // Debug info
    console.log('Current URL:', page.url());

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
    // If there's an error, capture debugging information before the page closes
    try {
      console.error('Test failed:', e);
      const url = page.url();
      console.log('Current URL:', url);
      
      page.screenshot({ path: 'test-failure.png' });
      console.log('Screenshot saved to test-failure.png');
      
      const content = await page.content();
      console.log('Page content:', content);
    } catch (debugError) {
      console.error('Failed to capture debug info:', debugError);
    }
    
    throw e;
  }
}
