import { Request, Response, NextFunction } from "express";
import { authService } from "../../services/auth.service";
import { responseGenerator } from "common-utils-functionalities";

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = req;
    const { email, password, firstName, lastName, isAdmin } = body;

    const userCreated = await authService.signup({
      email,
      password,
      firstName,
      lastName,
      isAdmin,
    });
    return res.status(201).json(
      responseGenerator({
        data: userCreated,
        message: "User signed up successfully",
        statusCode: 201,
      })
    );
  } catch (error) {
    next(error);
  }
}

export async function signin(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = req;
    const { email, password } = body;

    const userCreated = await authService.signin(email, password);
    return res.status(200).json(
      responseGenerator({
        data: userCreated,
        message: "User signed in successfully",
        statusCode: 200,
      })
    );
  } catch (error) {
    next(error);
  }
}
