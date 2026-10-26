import { describe, expect, test } from "vitest";
import { buildApp } from "./app.js";

describe("project config validation", () => {
  test("parses valid nested config and strips unknown keys", async () => {
    const app = buildApp();
    const res = await app.inject({
      method: "POST",
      url: "/api/projects",
      payload: { name: "p", config: { retries: 3 }, extra: "x" },
    });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ name: "p", config: { retries: 3 } });
  });

  test("rejects invalid project config", async () => {
    const app = buildApp();
    const res = await app.inject({
      method: "POST",
      url: "/api/projects",
      payload: { name: "p", config: { retries: "three" } },
    });
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });
});
