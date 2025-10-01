export interface IProfileImage {
  _id: string;
  name: string;
  data: Buffer | BinaryType;
  contentType: string;
}

export interface IUpdateProfileImageDTO extends IProfileImage {}
