import styled from "styled-components";

export const Container = styled.div<{ $selected: boolean }>`
    background-color: ${({ $selected }) => $selected ? '#F5F6FA' : '#fff'};
    padding: 10px 16px;
    border-top: 1px solid #E7E8EF;
`

export const Title = styled.p`
    font-weight: 500;
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
    line-height: 21px;
    color: #20252B;
    margin: 0;
`

export const CreatedAt = styled.p`
    font-family: 'Courier New', Courier, monospace;
    font-size: 12px;
    line-height: 1;
    color: #627389;
    margin: 0;
    display: flex;
    align-items: center;
`

export const Label = styled.span`
    color: #556476;
    padding: 1px 3px;
    background-color: #fff;
    border-radius: 4px;
    margin-right: 8px;
`;