import { linkModel } from "../models/linkModel";
import { Request, Response } from "express";
interface AuthenticatedRequest extends Request {
  userId?: string;
}
export const handleCreateLink = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const { hash } = req.body;
  if (!hash) {
    return res.status(400).json({
      message: "hash required",
    });
  }

  try {
    const userId = req.userId;
    const link = await linkModel.create({
      hash,
      userId,
    });
    return res.status(200).json(link);
  } catch (error) {
    return res.status(500).json({
      message: "server Error",
      error,
    });
  }
};
