import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./_app";

const app = express();
// app.use(cors({ origin: "http://localhost:3000" }));
app.use(
  cors({ origin: "https://main--marvelous-kashata-23b3f5.netlify.app/" })
);
app.use("/trpc", createExpressMiddleware({ router: appRouter }));

app.listen(4000);

export type AppRouter = typeof appRouter;
