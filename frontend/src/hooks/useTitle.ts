import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type Props = {
  title: string;
  template?: boolean;
};

const useTitle = ({ title, template }: Props) => {
  const location = useLocation();
  const pageTitle = template ? title.trim() + " | Dialoga" : title;

  useEffect(() => {
    document.title = pageTitle;
  }, [location, pageTitle]);
};

export default useTitle;
