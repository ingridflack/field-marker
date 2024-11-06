import { Point } from "../../interfaces/common";
import ActionButton from "../ActionButton"
import { ButtonWrapper } from "./styles"
import trashIcon from "../../assets/icons/trash.svg"
import pinIcon from "../../assets/icons/pin.svg"

interface ActionButtonsProps {
    points: Point[];
    selectedPoint: string | null;
    onAdd: () => void;
    onDelete: (selectedPoint: string) => void;
    onDeleteAll: () => void;
}

const ActionButtons = ({ onAdd, onDelete, onDeleteAll, points, selectedPoint }: ActionButtonsProps) => {
    return (
        <ButtonWrapper>
            {selectedPoint &&
                <ActionButton
                    onClick={() => onDelete(selectedPoint)}
                    variant="delete"
                    icon={trashIcon}
                >
                    Deletar pin
                </ActionButton>
            }
            <ActionButton
                onClick={() => onAdd()}
                variant="add"
                icon={pinIcon}
            >
                Adicionar ponto
            </ActionButton>
            {points.length > 0 &&
                <ActionButton
                    onClick={() => onDeleteAll()}
                    variant="delete"
                    icon={trashIcon}
                >
                    Deletar todos
                </ActionButton>
            }
        </ButtonWrapper>
    );
}

export default ActionButtons;