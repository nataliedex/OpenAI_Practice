import express from "express";
import path from "path";
import dotenv from "dotenv";
import mainRoutes from "./route/mainRoutes";

dotenv.config();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));

app.use("/", mainRoutes);

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is currently running on PORT: ${process.env.PORT || 8000}`);
    
});
