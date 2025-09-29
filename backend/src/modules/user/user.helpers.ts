import ProfileImageRepository from "../../database/repositories/ProfileImageRepository";
import ApiError from "../../lib/errors/ApiError";

export const getProfileImageDataUri = async (profileImageId: string) => {
  const profileImageRepository = new ProfileImageRepository();
  const image = await profileImageRepository.findById(profileImageId);
  if (!image) {
    throw ApiError.conflict("Resource not found. No image document matches the requested ID.");
  }
  const base64Image = image.data.toString("base64");
  return `data:${image.contentType};base64,${base64Image}`;
};
