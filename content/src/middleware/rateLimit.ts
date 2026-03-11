import type { Request, Response, NextFunction } from "express";

const requests: Record<string, number[]> = {};

const rateLimit = (req: Request, res: Response, next: NextFunction) => {
    const clientId = req.headers["x-client-id"] as string;
    const now = Date.now();
    const ONE_MINUTE = 60000;

    if (!clientId) {
        res.status(400).json({Error: "Client ID missing"});
    }

    if (!requests[clientId]) {
        requests[clientId] = [];
    }

    requests[clientId] = requests[clientId].filter((timeStamp: number) => (
        now - timeStamp < ONE_MINUTE
    ));

    if (requests[clientId].length >= 3) {
        return res.status(429).json({
            error: "Too many tasks created. Limit is 3 per minute."
        });
    }

    requests[clientId].push(now);

    next();
};

module.exports = rateLimit;