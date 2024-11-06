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
    width: 100%;
    max-width: 344px;
`;

export const List = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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
`

export const EmptyMessage = styled.p`
    text-align: center;
    color: #556476;
    font-weight: 700;
    font-size: 12px;
    line-height: 1;
    max-width: 181px;
`