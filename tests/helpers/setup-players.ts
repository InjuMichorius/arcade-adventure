import { Page } from '@playwright/test';

export async function setupPlayers(page: Page, players: string[] = ['Inju', 'Bart', 'Storm', 'Mike']) {
    await page.goto("http://localhost:3000");
    await page.getByTestId("play-game-button").click();
    
    for (const playerName of players) {
        await page.getByTestId("add-player-button").click();
        await page.getByRole("textbox", { name: "Enter name..." }).nth(players.indexOf(playerName)).fill(playerName);
    }

    await page.getByTestId("start-game-button").click();
} 