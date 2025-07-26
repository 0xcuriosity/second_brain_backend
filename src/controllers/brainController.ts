import { linkModel } from "../models/linkModel";
import { Request, Response } from "express";
import { contentModel } from "../models/contentModle";
import { userModel } from "../models/userModel";
export const generateRandomString = (len: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghuijklmnopqrstuvwxyz0123456789";
  // 62 characters
  let result = "";
  for (let i: number = 0; i < len; i++) {
    result += characters[Math.floor(Math.random() * characters.length)];
  }
  return result;
};

export interface AuthenticatedRequest extends Request {
  userId?: string;
}
export const handleCreateSharableLink = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const share = req.body.share;
    if (share) {
      const hash = generateRandomString(20);
      const result = await linkModel.create({
        hash: hash,
        userId: req.userId,
      });
      return res.status(200).json(result);
    } else {
      const result = await linkModel.deleteOne({
        userId: req.userId,
      });
      return res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
    });
  }
};

export const handleViewSharableLink = async (req: Request, res: Response) => {
  console.log("object");
  try {
    const hash = req.params.shareLink;
    const link = await linkModel.findOne({
      hash,
    });
    if (!link) {
      return res.status(404).json({
        message: "link not found",
      });
    }
    // find the content now
    const content = await contentModel.find({
      userId: link.userId,
    });
    const user = await userModel.findOne({
      _id: link.userId,
    });
    if (!user) {
      return res.status(500).json({
        message: "user not found , ideally should not happen",
      });
    }
    return res.status(200).json({
      username: user?.username,
      content: content,
    });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({
    message: "server error",
  });
};
