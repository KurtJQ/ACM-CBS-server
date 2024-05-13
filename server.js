import express from "express";
import cors from "cors";
import student from "./routes/student.js";
import cashier from "./routes/cashier.js";
import transaction from "./routes/transaction.js";

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/cashier", cashier);
app.use("/student", student);
app.use("/transaction", transaction);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
