import { IconType } from "react-icons";
import { Button } from "@/components/ui/button";
import { Icon } from "@mui/material";
interface ActionBtnProps {
  icon: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}
const ActionBtn: React.FC<ActionBtnProps> = ({
  icon: Icon,
  onClick,
  disabled,
}) => {
  return (
    <Button
    onClick ={onClick}
    disabled={disabled}
      className={`flex
       items-center
       p-1
        justify-center 
        rounded
         cursor-pointer
          w-[40px]
           h-[30px]
            text-slate-700
             border
              border-slate-400
            ${disabled && "opacity-50 cursor-not-allowed"}
            `}
    >
      <Icon size={30} color="white" />
    </Button>
  );
};
export default ActionBtn;
