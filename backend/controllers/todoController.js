// const Todo = require("../models/todoModel");

// // Get all todos (excluding deleted ones)
// exports.getTodos = async (req, res) => {
//   try {
//     const todos = await Todo.find({ deleted: false });
//     res.json(todos);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Create a new todo
// exports.createTodo = async (req, res) => {
//   try {
//     console.log(req.body);
//     const newTodo = await Todo.create({ title: req.body.title });
//     res.status(201).json(newTodo);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Update a todo
// exports.updateTodo = async (req, res) => {
//   try {
//     const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedTodo);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Soft delete a todo
// exports.deleteTodo = async (req, res) => {
//   try {
//     await Todo.findByIdAndUpdate(req.params.id, { deleted: true });
//     res.json({ message: "Todo soft deleted" });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };



// const asyncHandler = require("express-async-handler");
// const Todo = require("../models/todoModel");

// // @desc Get all todos
// // @route GET /api/todos
// const getTodos = asyncHandler(async (req, res) => {
//   const todos = await Todo.find({});
//   res.json(todos);
// });

// // @desc Create a new todo
// // @route POST /api/todos
// const createTodo = asyncHandler(async (req, res) => {
//   const { title } = req.body;

//   if (!title) {
//     res.status(400);
//     throw new Error("Title is required");
//   }

//   const todo = await Todo.create({ title });
//   res.status(201).json(todo);
// });


// const updateTodo = asyncHandler(async (req, res) => {
//   const { title } = req.body;
//   const todo = await Todo.findById(req.params.id);

//   if (!todo) {
//     res.status(404);
//     throw new Error("Todo not found");
//   }

//   todo.title = title || todo.title;
//   const updatedTodo = await todo.save();
//   res.json(updatedTodo);
// });

// // @desc Delete a todo
// // @route DELETE /api/todos/:id
// const deleteTodo = asyncHandler(async (req, res) => {
//   const todo = await Todo.findById(req.params.id);

//   if (!todo) {
//     res.status(404);
//     throw new Error("Todo not found");
//   }

//   await todo.deleteOne();
//   res.json({ message: "Todo removed" });
// });

// module.exports = { getTodos, createTodo, updateTodo, deleteTodo };



const Todo = require("../models/todoModel");

// ✅ Get Todos with Filtering & Pagination
exports.getTodos = async (req, res) => {
  try {
    const { page = 1, limit = 5, search, sortBy } = req.query;
    const query = { isDeleted: false };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const todos = await Todo.find(query)
      .sort(sortBy ? { [sortBy]: 1 } : { createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Todo.countDocuments(query);
    res.json({ todos, total });
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos" });
  }
};

// ✅ Create Todo
exports.createTodo = async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: "Failed to create todo" });
  }
};

// ✅ Update Todo
exports.updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTodo) return res.status(404).json({ message: "Todo not found" });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo" });
  }
};

// ✅ Soft Delete Todo
exports.deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    if (!deletedTodo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo soft deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo" });
  }
};
