import styled from "styled-components";
import { Variant } from "../../interfaces/common";

export const Button = styled.button<{ variant: Variant }>`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    background-color: ${({ variant }) => variant === "add" ? "#2ecc71" : "red"};
    border-radius: 2px;
    padding: 8px 16px;
    cursor: pointer;
    color: ${({ variant }) => variant === "add" ? "#d5d5d5" : "#fff"};
    text-transform: uppercase;
`