import { NextFunction, Request, Response } from "express"
import { authService, AuthService } from "../services/auth.services"
import { asyncHandler } from "../middlewares/async-handler"

class AuthController {

    private authService: AuthService

    constructor(authService: AuthService) {
        this.authService = authService
    }

    public register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    })

    public login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    })

    public forgetPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    })

    public emailVerification = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    })

    public logout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    })
}

export const authController = new AuthController(authService)