// src/index.ts
import express from "express";
import cors from "cors";
import AppConfig from "./config.ts/config";
import { AppErr } from "./utils/app-error";
import { ResponseHandler } from "./utils/response-handler";


const app = express();
app.use(cors());
app.use(express.json());



app.get("/", (req, res) => res.send("Backend is live"));

const port = Number(AppConfig.port);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof AppErr)
    {
        ResponseHandler.error(res, err.message, err.statusCode);
    }
    return ResponseHandler.error(res, "Internal server error", 500);
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${ port }`);
});
