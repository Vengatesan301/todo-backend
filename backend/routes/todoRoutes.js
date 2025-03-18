const express = require("express");
const router = express.Router();
const { getTodos, createTodo, updateTodo, deleteTodo } = require("../controllers/todoController");

router.post("/", createTodo);
router.get("/", getTodos);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);


module.exports = router;
