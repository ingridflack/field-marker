import { Point } from "../../interfaces/common";
import ActionButton from "../ActionButton"
import { ButtonWrapper } from "./styles"

interface ButtonListProps {
    points: Point[];
    selectedPoint: string | null;
    onAdd: () => void;
    onDelete: (selectedPoint: string) => void;
    onDeleteAll: () => void;
}

const ButtonList = ({ onAdd, onDelete, onDeleteAll, points, selectedPoint }: ButtonListProps) => {
    return (<ButtonWrapper>
        {selectedPoint && <ActionButton onClick={() => onDelete(selectedPoint)} variant="delete">Deletar pin</ActionButton>}
        <ActionButton onClick={() => onAdd()} variant="add">Adicionar ponto</ActionButton>
        {points.length > 0 && <ActionButton onClick={() => onDeleteAll()} variant="delete">Deletar todos</ActionButton>}
    </ButtonWrapper>);

}

export default ButtonList;