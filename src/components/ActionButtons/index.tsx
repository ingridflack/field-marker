import ActionButton from "../ActionButton"
import { ButtonWrapper } from "./styles"
import trashIcon from "../../assets/icons/trash.svg"
import pinIcon from "../../assets/icons/pin.svg"
import { useContext } from "react";
import { MapContext } from "../../MapContext/useMapContext";

const ActionButtons = () => {
    const {
        points,
        selectedPoint,
        onAddPoint,
        onOpenDeleteAllModal,
        onOpenDeletePointModal,
    } = useContext(MapContext);

    return (
        <ButtonWrapper>
            {selectedPoint &&
                <ActionButton
                    onClick={() => onOpenDeletePointModal(selectedPoint)}
                    variant="delete"
                    icon={trashIcon}
                >
                    Deletar pin
                </ActionButton>
            }
            <ActionButton
                onClick={() => onAddPoint()}
                variant="add"
                icon={pinIcon}
            >
                Adicionar ponto
            </ActionButton>
            {points.length > 0 &&
                <ActionButton
                    onClick={() => onOpenDeleteAllModal()}
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