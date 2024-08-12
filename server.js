import Fastify from "fastify";

const f = Fastify({
  logger: true,
});

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
