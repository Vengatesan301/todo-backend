// const mongoose = require("mongoose");

// const todoSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     completed: { type: Boolean, default: false },
//     deleted: { type: Boolean, default: false }, // Soft delete flag
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Todo", todoSchema);


const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);
