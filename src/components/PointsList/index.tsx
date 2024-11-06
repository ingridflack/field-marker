import { Point } from "../../interfaces/common";
import PointListItem from "../PointListItem";
import { Container, EmptyMessage, Header, List } from "./styles";

interface PointsListProps {
    points: Point[];
    selectedPoint: string | null;
    onSelectPoint: (id: string) => void;
}

const PointsList = ({ points, selectedPoint, onSelectPoint }: PointsListProps) => {
    const isEmpty = points.length === 0;

    return (
        <Container>
            <Header>Listagem de pontos</Header>
            <List>
                {isEmpty && (
                    <EmptyMessage>Sem pontos de monitoramento para exibir no momento.</EmptyMessage>
                )}

                {points.map((point, index) => (
                    <PointListItem key={point.id} point={point} selected={point.id === selectedPoint} index={index} onSelectPoint={onSelectPoint} />
                ))}
            </List>
        </Container>
    );
}

export default PointsList;