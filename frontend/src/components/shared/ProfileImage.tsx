import { cx } from "@/utils";

interface Props {
  className?: string;
  alt: string;
}

function ProfileImage({ className, alt }: Props) {
  return (
    <img
      src={"https://picsum.photos/500/500"}
      alt={alt}
      className={cx("size-13 shadow-sm rounded-full object-cover object-center", className ? className : "")}
    />
  );
}

export default ProfileImage;
