import styled from "styled-components";

export const Container = styled.div`
    background-color: #fff;
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 401;
    max-width: 344px;
    border-radius: 8px;
    overflow: hidden;
`;

export const List = styled.div`
    max-height: 50vh;
    overflow: auto;
`;

export const Header = styled.h2`
    background-color: #20252B;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    line-height: 1;
    margin: 0;
    padding: 10px 16px;
    font-family: 'Courier New', Courier, monospace;
`

export const EmptyMessage = styled.p`
    text-align: center;
    font-weight: 600;
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
`