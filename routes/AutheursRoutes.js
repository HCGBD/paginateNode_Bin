const express  = require("express")
const AutheursControllers = require("../controllers/AutheursControllers")

const routes =  express.Router();

routes.post("/",AutheursControllers.create)
routes.get("/",AutheursControllers.list)
routes.get("/:_id",AutheursControllers.listById)
routes.put("/:_id",AutheursControllers.update)
routes.delete("/:_id",AutheursControllers.deleteA)


module.exports = routes