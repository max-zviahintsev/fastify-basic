import Fastify from "fastify";
import fastifyMiddie from "@fastify/middie";

const f = Fastify({
  logger: true,
});
await f.register(fastifyMiddie);

const friends = [
  {
    id: 0,
    name: "Einstein",
  },
  {
    id: 1,
    name: "Newton",
  },
];

f.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.url} ${delta}ms`);
});

f.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

f.get("/friends", function (request, reply) {
  reply.send(friends);
});

f.get("/friends/:friendId", function (request, reply) {
  const friendId = Number(request.params.friendId);
  const friend = friends[friendId];

  if (friend) {
    reply.send(friend);
  } else {
    reply.statusCode = 404;
    throw new Error("Invalid friend id");
  }
});

f.post("/friends", async function messages(request, reply) {
  if (!request.body.name) {
    reply.statusCode = 400;
    throw new Error("Bad request");
  }

  const newFriend = {
    name: request.body.name,
    id: friends.length,
  };
  friends.push(newFriend);
  reply.send(newFriend);
});

f.get("/messages", function (request, reply) {
  reply.send("Hello Albert!");
});

f.post("/messages", async function messages(request, reply) {
  return { test: "updating messages" };
});

try {
  await f.listen({ port: 3000 });
} catch (err) {
  f.log.error(err);
  process.exit(1);
}
