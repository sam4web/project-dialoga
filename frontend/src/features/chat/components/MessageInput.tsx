import { LoaderCircle, Paperclip, Send } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { closeFileUploadModal, selectFileUploadModalState, showFileUploadModal } from "@/app/slices";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FileUploadModal, ModalWrapper } from "@/components";
import { textMessageInputSchema, TTextMessageInputSchema } from "../types/index";
import { cx } from "@/utils";

interface Props {
  handleSubmit: (formData: FormData) => Promise<void>;
  isNew?: boolean;
}

function MessageInput({ isNew = false, handleSubmit }: Props) {
  const dispatch = useDispatch();
  const fileUploadModalState = useSelector(selectFileUploadModalState);
  const {
    register,
    handleSubmit: handleTextSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TTextMessageInputSchema>({
    resolver: zodResolver(textMessageInputSchema),
    mode: "onChange",
  });

  const onTextMessageSubmit: SubmitHandler<TTextMessageInputSchema> = async (data) => {
    const formData = new FormData();
    formData.append("text", data.message);
    await handleSubmit(formData);
    reset();
  };

  const onFileMessageSubmit = async (image: File) => {
    const formData = new FormData();
    formData.append("image", image);
    await handleSubmit(formData);
    dispatch(closeFileUploadModal());
  };

  return (
    <>
      {fileUploadModalState && !isNew && (
        <ModalWrapper handleCloseAction={() => dispatch(closeFileUploadModal())}>
          <div className="mt-9 sm:mt-7">
            <FileUploadModal handleFileSubmit={onFileMessageSubmit} />
          </div>
        </ModalWrapper>
      )}

      <div className="border-t border-zinc-400/50 absolute bottom-0 left-0 w-full bg-primary-light/70 dark:bg-zinc-900 z-[3]">
        <div className="flex items-center justify-between space-x-2 md:space-x-3 px-2.5 lg:px-4.5 pt-3 md:pt-4 pb-2 md:pb-3">
          {!isNew && (
            <Button variant="icon" title="Upload File" onClick={() => dispatch(showFileUploadModal())}>
              <Paperclip />
            </Button>
          )}
          <form className="flex-1 " onSubmit={handleTextSubmit(onTextMessageSubmit)}>
            <div className="w-full flex items-center justify-between space-x-2">
              <input
                className={cx(
                  "input-field rounded-lg text-base py-2 px-2.5 outline-none focus:outline focus:placeholder:text-transparent dark:placeholder:text-gray-200/60 placeholder:text-gray-800/50",
                  errors.message ? "border-red-400 outline-red-300" : ""
                )}
                id="message"
                placeholder="Type a message..."
                {...register("message")}
              />
              <Button
                variant="icon"
                type="submit"
                title="Send Message"
                className="!bg-primary !text-primary-light hover:opacity-90"
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? <LoaderCircle className="!size-5 animate-spin" /> : <Send />}
              </Button>
            </div>
            {errors.message && <p className="text-red-500 text-sm pt-1">{errors.message.message}</p>}
          </form>
        </div>
      </div>
    </>
  );
}

export default MessageInput;
