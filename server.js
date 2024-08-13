import Fastify from "fastify";
import fastifyMiddie from "@fastify/middie";
import {
  getMessages,
  postMessage,
} from "./controllers/messages.controller.mjs";
import {
  getFriends,
  getFriend,
  postFriend,
} from "./controllers/friends.controller.mjs";

const f = Fastify({
  logger: true,
});
await f.register(fastifyMiddie);

f.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.url} ${delta}ms`);
});

f.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

f.get("/friends", getFriends);
f.get("/friends/:friendId", getFriend);
f.post("/friends", postFriend);

f.get("/messages", getMessages);
f.post("/messages", postMessage);

try {
  await f.listen({ port: 3000 });
} catch (err) {
  f.log.error(err);
  process.exit(1);
}
