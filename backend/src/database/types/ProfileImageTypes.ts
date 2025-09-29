export interface IProfileImage extends Document {
  _id: string;
  name: string;
  data: Buffer | BinaryType;
  contentType: string;
}

export interface IUpdateProfileImageDTO extends IProfileImage {}
