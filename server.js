import Fastify from "fastify";
import path from "node:path";
import fastifyView from "@fastify/view";
import ejs from "ejs";

const f = Fastify({
  logger: true,
});

const dirname = import.meta.dirname;

await f.register(fastifyView, {
  engine: {
    ejs,
  },
  root: path.join(dirname, "client"),
  layout: "layouts/layout.ejs",
});

await f.register(import("@fastify/middie"));
f.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.url} ${delta}ms`);
});

await f.register(import("@fastify/static"), {
  root: path.join(dirname, "public"),
  constraints: {},
});

await f.register(import("./routes/friends.router.mjs"));
await f.register(import("./routes/messages.router.mjs"));

try {
  await f.listen({ port: 3000 });
} catch (err) {
  f.log.error(err);
  process.exit(1);
}
