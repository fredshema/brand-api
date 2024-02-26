import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  rootDir: "./src",
  collectCoverage: true,
  coverageReporters: ["json-summary"],
  testTimeout: 60000,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
export default config;
