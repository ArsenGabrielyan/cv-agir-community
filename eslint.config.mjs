import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const ignoreList = [
  "prisma/generated/**",
  "node_modules/**",
  ".next/**",
  "out/**",
  "build/**",
  "next-env.d.ts",
]

const eslintConfig = [
  { ignores: ignoreList },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.ts"],
    ...(process.env.CI && {
      languageOptions: {
        parserOptions: {
          project: "./tsconfig.json",
          tsconfigRootDir: __dirname
        }
      }
    }),
    rules: {
      "@typescript-eslint/no-misused-promises": process.env.CI
        ? "error"
        : "off"
    }
  }
];

export default eslintConfig;