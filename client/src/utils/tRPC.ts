import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { inferRouterOutputs, inferRouterInputs } from "@trpc/server";
import { AppRouter } from "../../../server/src";

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:4000/trpc",
    }),
  ],
});

export type RouterOutput = inferRouterOutputs<AppRouter>;
export type RouterInput = inferRouterInputs<AppRouter>;
