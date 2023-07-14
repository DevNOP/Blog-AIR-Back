"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_express2 = __toESM(require("express"));
var import_dotenv = __toESM(require("dotenv"));

// src/routes/user.routing.ts
var import_express = __toESM(require("express"));

// src/usecases/users/read-posts/read-post-service.ts
var ReadPostService = class {
  execute() {
    return [
      {
        title: "Hello World",
        content: "Hello World",
        author: "Hello World",
        date: "Hello World"
      }
    ];
  }
};
var read_post_service_default = new ReadPostService();

// src/usecases/users/read-posts/read-post-controller.ts
var ReadPostController = class {
  async execute(req, res) {
    const test = await read_post_service_default.execute();
    return res.send(test).status(200);
  }
};

// src/routes/user.routing.ts
var routerUser = import_express.default.Router();
var readPostController = new ReadPostController();
routerUser.get("/", readPostController.execute);

// src/interceptors/logs.ts
function logActionsUser(req, res, next) {
  console.log(`\u{1F440} ${req.method} - user${req.path}`);
  next();
}

// src/server.ts
var app = (0, import_express2.default)();
var port = process.env.PORT || 3e3;
import_dotenv.default.config();
app.use(import_express2.default.json());
app.use(import_express2.default.urlencoded({ extended: true }));
app.use("/user", logActionsUser, routerUser);
app.listen(port, () => {
  console.log(`\u{1F525} Server is  running at http://localhost:${port}`);
});
