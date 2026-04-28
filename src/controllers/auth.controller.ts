import type { NextFunction, Request, Response } from 'express';
import { authService } from '../services/auth.service.js';
import { clearRefreshTokenCookie, setRefreshTokenCookie } from '../utils/cookies.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.register(req.body);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.login(req.body);

    setRefreshTokenCookie(res, result.refreshToken);

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const tokenFromCookie = req.cookies?.refreshToken;

  // console.log(tokenFromCookie, 'uth/refresh-token');
  const result = await authService.refreshAccessToken(tokenFromCookie);

  setRefreshTokenCookie(res, result.refreshToken);

  res.status(200).json({
    success: true,
    message: 'Access token refreshed successfully',
    data: {
      user: result.user,
      accessToken: result.accessToken,
    },
  });
});

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  const tokenFromCookie = req.cookies?.refreshToken;

  await authService.logout(tokenFromCookie);

  clearRefreshTokenCookie(res);

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'User fetched successfully',
    data: req.user,
  });
});
