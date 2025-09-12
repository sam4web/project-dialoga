type Props = {
  className?: string;
  children?: React.ReactNode;
};

function ModalOverlayWrapper({ children }: Props) {
  if (!children) return <div className="overlay" />;

  return (
    <div className="overlay">
      <div className="flex-center h-full px-3.5">{children}</div>
    </div>
  );
}

export default ModalOverlayWrapper;
