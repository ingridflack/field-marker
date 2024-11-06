import { ButtonVariant } from "../../interfaces/common";
import { Button } from "./styles"


interface ActionButtonProps {
    onClick: () => void;
    variant: ButtonVariant;
    children: React.ReactNode;
    icon: string;
}

const ActionButton = ({ onClick, variant, children, icon }: ActionButtonProps) => {
    return (
        <Button onClick={onClick} variant={variant}>
            {children}

            {icon && <img src={icon} />}
        </Button>
    )
}

export default ActionButton;