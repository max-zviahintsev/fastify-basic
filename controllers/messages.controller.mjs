function getMessages(request, reply) {
  reply.send("Hello Albert!");
}

function postMessage(request, reply) {
  return { test: "updating messages" };
}

export { getMessages, postMessage };
