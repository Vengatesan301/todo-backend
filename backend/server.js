// require("dotenv").config();
// const express = require("express");
// const connectDB = require("./config/db");
// const todoRoutes = require("./routes/todoRoutes");
// const errorHandler = require("./middleware/errorMiddleware");
// const cors = require("cors");

// const app = express();
// connectDB();

// app.use(cors());
// app.use(express.json());
// app.use("/api/todos", todoRoutes);
// // app.use("/api/todos", require("./routes/todoRoutes"));
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const todoRoutes = require("./routes/todoRoutes");

// dotenv.config();
// connectDB();

// const app = express();

// // Middleware
// app.use(cors()); // Enable CORS
// app.use(express.json()); // Parse JSON body

// // Routes
// app.use("/api/todos", todoRoutes);

// // Error handling middleware (optional)
// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Connect to Database
connectDB();

// Routes
app.use("/api/todos", require("./routes/todoRoutes"));
app.use("/api/auth", authRoutes);


app.use(require("./middleware/errorMiddleware"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
