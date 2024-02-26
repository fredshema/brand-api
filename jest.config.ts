import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  rootDir: "./src",
  collectCoverage: true,
  coverageDirectory: "../coverage",
  testTimeout: 60000,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
export default config;
