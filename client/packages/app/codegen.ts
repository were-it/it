
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/api",
  documents: "graphql/**/*.graphql",
  generates: {
    "./generated.ts": {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-query'],
      config: {
        fetcher: "./lib/fetcher#fetcher",
      }
    }
  }
};

export default config;
