import { CloudUpload } from "lucide-react";
import Button from "../ui/Button";
import { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_UPLOAD_SIZE_MB } from "@/config/constants";

type Props = {
  handleFileSubmit: (image: File) => void;
};

const fileSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_UPLOAD_SIZE_MB, "Max image size is 1MB.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

type TFileSchema = z.infer<typeof fileSchema>;

function FileUploadModal({ handleFileSubmit }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TFileSchema>({
    resolver: zodResolver(fileSchema),
  });

  const onSubmit: SubmitHandler<TFileSchema> = (data) => {
    handleFileSubmit(data.image);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setValue("image", file, { shouldValidate: true });
  };

  const imageFile = watch("image");
  const fileName = imageFile instanceof File ? imageFile.name : null;

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
      <div className="border-2 rounded-xl border-dashed border-zinc-500/30 dark:border-zinc-700 px-3 py-5 sm:pt-7 sm:pb-8">
        <div className="flex-center flex-col text-center">
          <CloudUpload className="text-gray-600/65 dark:text-zinc-500/75 size-11 sm:size-13 mb-2" />
          <span className="text-color-light mb-5">
            <p className="text-base sm:text-lg">Upload an Image</p>
            <p className="text-sm font-light opacity-85 max-w-80">
              Please upload an image file that is less than 1MB in size. Other file types are not permitted.
            </p>
          </span>
          <Button variant="outline" type="button" onClick={() => fileInputRef?.current?.click()}>
            Choose file
          </Button>

          {fileName && <p className="text-color-light opacity-75 mt-3.5 text-sm italic">File Selected: {fileName}</p>}
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="images/*"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      </div>
      <p className="text-red-500 text-sm pt-1.5"> {errors.image && (errors.image.message as string)}</p>
      <div className="text-right mt-3">
        <Button variant="primary" type="submit" className="!py-1.5 !px-2" disabled={!imageFile}>
          Upload Image
        </Button>
      </div>
    </form>
  );
}

export default FileUploadModal;
