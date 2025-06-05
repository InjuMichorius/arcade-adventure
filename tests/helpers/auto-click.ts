import { Page } from "@playwright/test";

export async function clickMultipleTimes(
  page: Page,
  testId: string,
  times: number,
  options: { nth?: number } = {}
) {
  for (let i = 0; i < times; i++) {
    const element = options.nth
      ? page.getByTestId(testId).nth(options.nth)
      : page.getByTestId(testId).first();
    await element.click();
  }
}
