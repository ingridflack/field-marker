import styled from "styled-components";
import { ButtonVariant } from "../../interfaces/common";

export const Button = styled.button<{ variant: ButtonVariant }>`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    background-color: ${({ variant }) => variant === "add" ? "#FFF" : "#D20200"};
    border-radius: 4px;
    padding: 8px 16PX;
    cursor: pointer;
    color: ${({ variant }) => variant === "add" ? "#556476" : "#fff"};
    text-transform: uppercase;
    width: 100%;
    max-width: 163px;
    font-size: 12px;
    line-height: 15.6px;
    font-weight: 700;
    white-space: nowrap;
    
    img {
        margin-left: 8px;
    }
`