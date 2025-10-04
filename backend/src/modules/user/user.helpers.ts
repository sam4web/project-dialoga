import { ProfileImageRepository } from "../../database";
import { ApiError, bufferToDataURI } from "../../lib";

export const getProfileImageDataUri = async (profileImageId: string) => {
  const profileImageRepository = new ProfileImageRepository();
  const image = await profileImageRepository.findById(profileImageId);
  if (!image) {
    throw ApiError.conflict("Resource not found. No image document matches the requested ID.");
  }
  return bufferToDataURI(image);
};
