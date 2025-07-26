import { contentModel } from "../models/contentModle";
import { Request, Response } from "express";
interface PostContentBody {
  type: string;
  link: string;
  title: string;
  tags: string;
  userId: string;
}
interface AuthenticatedRequest extends Request {
  userId?: string;
}
export const handlePostContent = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  console.log("create content");
  const { type, link, title, tags } = req.body;
  console.log(req.body);
  if (!type || !link || !title || !tags) {
    return res.status(400).json({
      message: "type , link , title, tags are required fields",
    });
  }
  try {
    const userId = req.userId;
    const newContent = {
      type,
      link,
      title,
      tags,
      userId,
    };

    const result = await contentModel.create(newContent);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

export const handleDeleteContent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { contentId } = req.body;
  if (!contentId) {
    return res.status(400).json({
      message: "Content ID required",
    });
  }
  const content = await contentModel.findOne({
    _id: contentId,
  });
  if (!content) {
    return res.status(404).json({
      message: "contentId not found",
    });
  }
  const result = await contentModel.deleteOne({
    _id: contentId,
  });

  return res.status(200).json(result);
};
export const handleGetAllContent = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.userId;
    const allContentOfUser = await contentModel
      .find({
        userId,
      })
      .populate("userId")
      .populate("tags");
    return res.status(200).json(allContentOfUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
    });
  }
};
