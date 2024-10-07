import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { StrictMode, Suspense } from "react";
import { YourComponent } from "./routes/side";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { Flex, RadioCards, Text, Theme } from "@radix-ui/themes";
import { Router } from "./router";
import { globalStyle } from "@vanilla-extract/css";

const client = new ApolloClient({
    uri: `http://localhost:4000/graphql`,
    cache: new InMemoryCache(),
});

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
    <StrictMode>
        <ApolloProvider client={client}>
            <Suspense fallback="Loading">
                <Theme accentColor="blue" radius="large">
                    <Router />
                </Theme>
            </Suspense>
        </ApolloProvider>
    </StrictMode>
);
