import { Request, Response, NextFunction } from "express";

type asyncControllerType = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void>

export const asyncHandler = (controller: asyncControllerType) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await controller(req, res, next);
            next();
        } catch (error) {
            console.log(error);
        }
    }
}