import { Point } from "../../interfaces/common";
import { Container, CreatedAt, Label, Title } from "./styles";

interface PointListItemProps {
    point: Point;
    index: number;
    selected: boolean;
}

const PointListItem = ({ point, index, selected }: PointListItemProps) => {
    return (
        <Container $selected={selected}>
            <Title>Ponto nº {`${index + 1}`.padStart(3, "0")}</Title>
            <CreatedAt>
                <Label>Criado em:</Label> {new Date(point.createdAt).toLocaleString()}
            </CreatedAt>
        </Container>
    );
}

export default PointListItem;