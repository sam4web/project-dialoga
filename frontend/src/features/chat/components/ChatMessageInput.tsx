import Button from "@/components/ui/Button";
import { Paperclip, Send } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { closeFileUploadModal, selectFileUploadModalState, showFileUploadModal } from "../slice/index";
import ModalWrapper from "@/components/shared/ModalWrapper";
import FileUploadModal from "@/components/shared/FileUploadModal";

function ChatMessageInput() {
  const dispatch = useDispatch();
  const fileUploadModalState = useSelector(selectFileUploadModalState);

  return (
    <>
      {fileUploadModalState && (
        <ModalWrapper handleCloseAction={() => dispatch(closeFileUploadModal())}>
          <div className="mt-9 sm:mt-7">
            <FileUploadModal
              handleFileSubmit={(image) => {
                console.log(image);
                dispatch(closeFileUploadModal());
              }}
            />
          </div>
        </ModalWrapper>
      )}

      <div className="border-t border-zinc-400/50 absolute bottom-0 left-0 w-full bg-primary-light/70 dark:bg-zinc-900 z-[3]">
        <div className="flex items-center justify-between space-x-2 md:space-x-3 px-2.5 lg:px-4.5 pt-3 md:pt-4 pb-2 md:pb-3">
          <Button variant="icon" title="Upload File" onClick={() => dispatch(showFileUploadModal())}>
            <Paperclip />
          </Button>

          <form
            className="flex-1 flex items-center justify-between space-x-2"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
            }}
          >
            <input
              className="input-field rounded-lg text-base py-2 px-2.5 focus:outline outline-none w-full focus:placeholder:text-transparent dark:placeholder:text-gray-200/60 placeholder:text-gray-800/50"
              name="message"
              id="search"
              placeholder="Type a message..."
            />

            <Button
              variant="icon"
              type="submit"
              title="Send Message"
              className="!bg-primary !text-primary-light hover:opacity-85"
            >
              <Send />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChatMessageInput;
