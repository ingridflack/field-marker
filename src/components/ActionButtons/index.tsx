import { useContext } from "react";
import Button from "../Button"
import { ButtonWrapper } from "./styles"
import trashIcon from "../../assets/icons/trash.svg"
import pinIcon from "../../assets/icons/pin.svg"
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
                <Button
                    onClick={() => onOpenDeletePointModal(selectedPoint)}
                    variant="delete"
                    icon={trashIcon}
                >
                    Deletar pin
                </Button>
            }
            <Button
                onClick={() => onAddPoint()}
                variant="add"
                icon={pinIcon}
            >
                Adicionar ponto
            </Button>
            {points.length > 0 &&
                <Button
                    onClick={() => onOpenDeleteAllModal()}
                    variant="delete"
                    icon={trashIcon}
                >
                    Deletar todos
                </Button>
            }
        </ButtonWrapper>
    );
}

export default ActionButtons;