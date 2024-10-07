import type { CodegenConfig } from "@graphql-codegen/cli";
import { DateTimeISOResolver, DateTimeResolver } from "graphql-scalars";

const config: CodegenConfig = {
    schema: "./../api/graphql/schema.graphql",
    documents: [
        "./src/graphql/**/*.tsx",
        "./src/graphql/**/*.ts",
        "./src/graphql/**/*.graphql",
        "./src/graphql/**/*.gql",
    ],
    generates: {
        "./src/graphql/__generated__/types.tsx": {
            plugins: [
                "typescript",
                "typescript-operations",
                "typescript-react-apollo",
            ],
            config: {
                strictScalars: true,
                withHooks: true,
                scalars: {
                    DateTime: DateTimeResolver.extensions.codegenScalarType,
                },
                // This might cause a bug in the future
                // See: https://github.com/dotansimha/graphql-code-generator/issues/3919#issuecomment-618595537
                maybeValue: "T",
            },
        },
    },
    watch: [
        "./src/graphql/**/*.{graphql,js,ts, tsx, gql}",
        "!./src/graphql/codegen__/**",
    ],
};

export default config;
