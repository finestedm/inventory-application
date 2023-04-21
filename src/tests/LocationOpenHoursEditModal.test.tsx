import { test, expect } from "@playwright/test";
import { mount } from "vitest";
import { MyComponent } from "./MyComponent";

test("validates opening and closing hours", async () => {
  const component = mount(MyComponent);

  // Verify that component is initially rendered with default values
  expect(await component.find("[data-testid='opening-hours']").textContent()).toEqual("09:00");
  expect(await component.find("[data-testid='closing-hours']").textContent()).toEqual("18:00");

  // Enter valid opening and closing hours and verify that component updates correctly
  await component.find("[data-testid='opening-hours-input']").fill("10:00");
  await component.find("[data-testid='closing-hours-input']").fill("19:00");
  expect(await component.find("[data-testid='opening-hours']").textContent()).toEqual("10:00");
  expect(await component.find("[data-testid='closing-hours']").textContent()).toEqual("19:00");

  // Enter invalid opening and closing hours and verify that error message is displayed
  await component.find("[data-testid='opening-hours-input']").fill("20:00");
  await component.find("[data-testid='closing-hours-input']").fill("10:00");
  expect(await component.find("[data-testid='error-message']").textContent()).toEqual("Invalid hours");

  // Reset component to default values
  await component.find("[data-testid='reset-button']").click();
  expect(await component.find("[data-testid='opening-hours']").textContent()).toEqual("09:00");
  expect(await component.find("[data-testid='closing-hours']").textContent()).toEqual("18:00");
});
