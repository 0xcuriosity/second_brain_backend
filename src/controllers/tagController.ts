import { tagModel } from "../models/tagModel";
import { Request, Response } from "express";
interface PostTagBody extends Request {
  title: string;
}
export const handlePostTag = async (
  req: Request<{}, {}, PostTagBody>,
  res: Response
): Promise<Response> => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({
      message: "title is required",
    });
  }
  try {
    const tag = await tagModel.create({ title });
    console.log(tag);
    return res.status(200).json(tag);
  } catch (error) {
    return res.status(400).json({
      message: "tag already exists",
    });
  }
};

export const handleGetAllTags = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const allTags = await tagModel.find();
    return res.status(200).json(allTags);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
