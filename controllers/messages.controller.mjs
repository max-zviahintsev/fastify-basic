function getMessages(request, reply) {
  reply.sendFile("images/cat.jpg");
}

function testView(request, reply) {
  reply.view("pages/index.ejs", { text: "Max" });
}

function postMessage(request, reply) {
  return { test: "updating messages" };
}

export { getMessages, postMessage, testView };
