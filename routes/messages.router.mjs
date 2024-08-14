import {
  getMessages,
  postMessage,
} from "../controllers/messages.controller.mjs";

async function messagesRoutes(f, options) {
  f.get("/messages", getMessages);
  f.post("/messages", postMessage);
}

export default messagesRoutes;
