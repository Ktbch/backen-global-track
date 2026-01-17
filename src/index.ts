// src/index.ts

import app from "./app";
import AppConfig from "./config.ts/config";



const port = Number(AppConfig.port);

app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${ port }`);
});
