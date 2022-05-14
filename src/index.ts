import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./routes/routes"
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import { connect } from "./database/connection"

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);


const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/api/v1/", router);
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
    connect();
    console.log(`Listening on port ${PORT}`);
});