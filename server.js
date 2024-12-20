import Fastify from "fastify";
const f = Fastify({
  logger: true,
});

await f.register(import("@fastify/middie"));

f.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`test`);
  console.log(`${req.method} ${req.url} ${delta}ms`);
});

await f.register(import("./routes/friends.router.mjs"));
await f.register(import("./routes/messages.router.mjs"));

try {
  await f.listen({ port: 3000 });
} catch (err) {
  f.log.error(err);
  process.exit(1);
}
