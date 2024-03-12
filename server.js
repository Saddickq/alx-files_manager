import { express } from "express";
import { routes } from "routes/index";

const server = express();

server.use(express.json())

const port = process.env.PORT || 5000;

server.use('/', routes);

server.listen(port, () => {
    console.log(`server is running on port ${port}`);
});