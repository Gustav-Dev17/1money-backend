import { createConnection } from "typeorm";

createConnection().then(() => {
    console.log("Running db")
})
