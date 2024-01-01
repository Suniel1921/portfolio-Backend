const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 2000;
const dbConnection = require("./config/database");
const contactRouter = require("./routes/contactRoute");
const userRouter = require ("./routes/userRoute");
const cors = require ('cors');

//connecting with databse
dbConnection();

//middleware
app.use(express.json());
app.use(cors());


//routers
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send("welcome to my portfolio website !😊");
});

app.listen(PORT, () => {
  console.log(`Server is running on port no : ${PORT}`);
});
