import { HTMLAttributes } from "react";
import { ButtonVariant } from "../../interfaces/common";
import * as S from "./styles"

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    onClick: () => void;
    variant: ButtonVariant;
    children: React.ReactNode;
    icon: string;
}

const Button = ({ onClick, variant, children, icon, ...props }: ButtonProps) => {
    return (
        <S.Button onClick={onClick} variant={variant} {...props}>
            {children}
            {icon && <img src={icon} />}
        </S.Button>
    )
}

export default Button;