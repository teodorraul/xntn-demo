import express, { Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import { root, schema } from "./resolvers/schema";

import cors from "cors";
import { ExnatonSyncer } from "sync";

const app = express();
const PORT = 4000;

let syncer = new ExnatonSyncer();
await syncer.syncWithExnaton();

// Allow all CORS requests
app.use(cors());

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
);

app.get("/healthcheck", (req: Request, res: Response) => {
    res.status(200).send("Health check OK");
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/graphql`);
});
