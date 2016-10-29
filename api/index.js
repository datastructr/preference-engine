import express      from 'express';
import morgan       from 'morgan';
import bodyParser   from 'body-parser';
import cookieParser from 'cookie-parser';
import path         from 'path'

let logger = require(path.normalize('./cats'));

const app = express();

logger.debug("Overriding 'Express' logger");
app.use(morgan({ "stream": logger.stream }));

// request 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.listen(3000, () => {
console.log(`API ===> ��  Express Server listening on ${config.api.host}:${config.api.port}`);
});