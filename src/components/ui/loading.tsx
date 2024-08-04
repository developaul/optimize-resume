import { FC } from "react";
import { Loader2 } from "lucide-react";

interface Props {
  text: string;
}

const Loading: FC<Props> = ({ text }) => {
  return (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {text}
    </>
  );
};

export default Loading;
