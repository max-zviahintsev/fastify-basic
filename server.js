import Fastify from "fastify";
import path from "node:path";
import FastifyVite from "@fastify/vite";

const f = Fastify({
  logger: {
    transport: {
      target: "@fastify/one-line-logger",
    },
  },
});

await f.register(import("@fastify/middie"));
f.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.url} ${delta}ms`);
});

const dirname = import.meta.dirname;
await f.register(import("@fastify/static"), {
  root: path.join(dirname, "public"),
  prefix: "/site/",
  constraints: {},
});

await f.register(import("./routes/friends.router.mjs"));
await f.register(import("./routes/messages.router.mjs"));

await f.register(FastifyVite, {
  root: import.meta.url,
  renderer: "@fastify/react",
});

await f.vite.ready();

try {
  await f.listen({ port: 3000 });
} catch (err) {
  f.log.error(err);
  process.exit(1);
}
