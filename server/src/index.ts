import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./_app";

const app = express();
app.use(cors({ origin: "http://localhost:3001" }));
app.use("/trpc", createExpressMiddleware({ router: appRouter }));

app.listen(3002);

export type AppRouter = typeof appRouter;
