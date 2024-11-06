import { Point } from "../../interfaces/common";
import { Container, CreatedAt, Label, Title } from "./styles";
import grainIcon from "../../assets/icons/grain-icon.svg"

interface PointListItemProps {
    point: Point;
    index: number;
    selected: boolean;
    onSelectPoint: (id: string) => void;
}

const PointListItem = ({ point, index, selected, onSelectPoint }: PointListItemProps) => {
    return (
        <Container $selected={selected} onClick={() => onSelectPoint(point.id)}>
            <Title> <img src={grainIcon} alt="Grain icon" /> Ponto nº {`${index + 1}`.padStart(3, "0")}</Title>
            <CreatedAt>
                <Label>Criado em:</Label> {new Date(point.createdAt).toLocaleString()}
            </CreatedAt>
        </Container>
    );
}

export default PointListItem;