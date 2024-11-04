import { Variant } from "../../interfaces/common";
import { Button } from "./styles"


interface ActionButtonProps {
    onClick: () => void;
    variant: Variant;
    children: React.ReactNode;
    icon?: React.ReactNode;
}

const ActionButton = ({ onClick, variant, children, icon }: ActionButtonProps) => {
    return (
        <Button onClick={onClick} variant={variant}>
            {children}

            {icon && icon}
        </Button>
    )
}

export default ActionButton;