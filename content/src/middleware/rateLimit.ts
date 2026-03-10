import type { Request, Response, NextFunction } from "express";

const requests: Record<string, number[]> = {};

const rateLimit = (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();
    const ONE_MINUTE = 60000;

    if (!requests[ip]) {
        requests[ip] = [];
    }

    requests[ip] = requests[ip].filter((timeStamp: number) => (
        now - timeStamp < ONE_MINUTE
    ));

    if (requests[ip].length >= 3) {
        return res.status(429).json({
            error: "Too many tasks created. Limit is 3 per minute."
        });
    }

    requests[ip].push(now);

    next();
};

module.exports = rateLimit;