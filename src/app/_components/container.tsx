type Props = {
  children?: React.ReactNode;
  backgroundColor?: string;
};

const Container = ({ children, backgroundColor }: Props) => {
  return (
    <div
      className={`container ${backgroundColor ? `bg-${backgroundColor}` : ""}`}
    >
      {children}
    </div>
  );
};

export default Container;
