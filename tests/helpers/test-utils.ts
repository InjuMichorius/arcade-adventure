import { Page } from '@playwright/test';

export async function clickMultipleTimes(page: Page, testId: string, times: number, options: { nth?: number } = {}) {
  for (let i = 0; i < times; i++) {
    const element = options.nth ? page.getByTestId(testId).nth(options.nth) : page.getByTestId(testId).first();
    await element.click();
  }
}

export async function setupFastTimer(page: Page) {
  // Override setInterval to run much faster (every 10ms instead of 1000ms)
  await page.addInitScript(() => {
    const win = window as any;
    win.originalSetInterval = win.setInterval;
    win.setInterval = (handler: TimerHandler, timeout?: number, ...args: any[]) => {
      const adjustedTimeout = timeout === 1000 ? 10 : timeout;
      return win.originalSetInterval(handler, adjustedTimeout, ...args);
    };
  });
}

export async function cleanupTimer(page: Page) {
  // Restore original setInterval
  await page.addInitScript(() => {
    const win = window as any;
    if (win.originalSetInterval) {
      win.setInterval = win.originalSetInterval;
    }
  });
} 