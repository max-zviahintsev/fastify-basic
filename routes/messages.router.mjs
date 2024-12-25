import {
  getMessages,
  postMessage,
  testView,
} from "../controllers/messages.controller.mjs";

async function messagesRoutes(f, options) {
  f.get("/messages", getMessages);
  f.get("/", testView);
  f.post("/messages", postMessage);
}

export default messagesRoutes;
