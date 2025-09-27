import logger from "../utils/logger.utils.js";
import { parse } from 'stack-trace';
import path from "path";

export const notFoundRoute = (req,res) => {
    logger.info(`route not found`);

    return res.status(404).json({
        status: "failed",
        message: "route not found"
    })
}

export const errorHandler = (err, req, res) => {
    let errorMessage = err.message;
    const stackFrames = parse(err);

    if (stackFrames[0]) {
        let fileName = path.basename(stackFrames[0].getFileName() ?? 'fileNotfound');
        let lineNumber = stackFrames[0].getLineNumber();
        let functionName = stackFrames[0].getFunctionName();

        let logMessage = `[CRITICAL]: Error happened in file::${fileName} Line::${lineNumber} FunctionName::${functionName} Message::${errorMessage}`;

        logger.warn(logMessage);
    }

    if (errorMessage.includes("Can't reach database server")) {
        errorMessage = "Database connection failed. Please verify that your database server is running and accessible."
    }
    res.status(500).send({
        status: "error",
        message: 'Something went wrong!',
        error: errorMessage
    });
}