import Fastify from "fastify";
const f = Fastify({
  logger: true,
});

await f.register(import("@fastify/middie"));

await f.register(import("./routes/friends.router.mjs"));
await f.register(import("./routes/messages.router.mjs"));

f.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.url} ${delta}ms`);
});

try {
  await f.listen({ port: 3000 });
} catch (err) {
  f.log.error(err);
  process.exit(1);
}
