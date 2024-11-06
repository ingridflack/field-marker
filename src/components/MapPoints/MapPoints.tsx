import { DragEndEvent, Icon, LeafletMouseEvent } from "leaflet";
import { Marker, useMapEvents } from "react-leaflet";
import defaultPinIcon from "./../../assets/icons/default-pin.svg";
import selectedPinIcon from "./../../assets/icons/selected-pin.svg";
import { useContext } from "react";
import { MapContext } from "../../MapContext/useMapContext";

const defaultPin = new Icon({
    iconUrl: defaultPinIcon,
    iconAnchor: [16, 42],
})

const selectedPin = new Icon({
    iconUrl: selectedPinIcon,
    iconAnchor: [16, 42],
})

const MapPoints = () => {
    const {
        points,
        selectedPoint,
        onAddPoint,
        onSelectPoint,
        onPointDragEnd,
    } = useContext(MapContext);

    useMapEvents({
        click: (event: LeafletMouseEvent) => {
            onAddPoint(event.latlng);
        }
    });

    const handleClick = (id: string) => () => {
        const isPointSelected = selectedPoint === id;
        onSelectPoint(isPointSelected ? null : id);
    }

    const handleDragEnd = (id: string) => (event: DragEndEvent) => {
        onPointDragEnd(id, event.target.getLatLng());
    }

    return points.map(({ id, position }) => {
        const isSelected = selectedPoint === id;

        return (
            <Marker
                key={id}
                icon={isSelected ? selectedPin : defaultPin}
                position={position}
                draggable={isSelected}
                eventHandlers={{
                    click: handleClick(id),
                    dragend: handleDragEnd(id),
                }}
            />
        )
    })
}

export default MapPoints;