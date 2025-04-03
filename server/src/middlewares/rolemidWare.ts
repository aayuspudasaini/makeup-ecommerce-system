import { Request, Response, NextFunction } from "express";

export const authorizeRoles = (roles: string[]) => {
   return (req: Request, res: Response, next: NextFunction) => {
      const userRole = req.user?.role; // Assuming `req.user` is populated by authentication middleware
      if (!roles.includes(userRole)) {
         return res
            .status(403)
            .json({ success: false, message: "Access denied" });
      }
      next();
   };
};
