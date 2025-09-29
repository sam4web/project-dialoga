import z from "zod";

export const updateProfileSchema = z.object({
  fullname: z.string().min(1, "Fullname is required."),
  email: z.email("Enter a valid email address."),
  statusMessage: z.string().min(1, "Status message is required."),
});

export type TUpdateProfileSchema = z.infer<typeof updateProfileSchema>;

export interface IUserSettings {
  readReceipts: boolean;
  onlineStatus: boolean;
  typingIndicator: boolean;
}

export interface IUser {
  _id: string;
  fullname: string;
  email: string;
  statusMessage: string;
  createdAt: Date;
  updatedAt: Date;
  settings: IUserSettings;
  profileImage: string | null;
}

export interface IUpdateUserDTO extends Partial<IUserSettings> {
  fullname?: string;
  email?: string;
  statusMessage?: string;
}
