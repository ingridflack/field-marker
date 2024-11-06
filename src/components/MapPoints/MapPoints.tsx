import { DragEndEvent, Icon, LatLng, LeafletMouseEvent, Point } from "leaflet";
import { Marker, useMapEvents } from "react-leaflet";
import defaultPinIcon from "./assets/icons/default-pin.svg";
import selectedPinIcon from "./assets/icons/selected-pin.svg";

const defaultPin = new Icon({
    iconUrl: defaultPinIcon,
    iconAnchor: [16, 42],
})

const selectedPin = new Icon({
    iconUrl: selectedPinIcon,
    iconAnchor: [16, 42],
})

interface MapPointsProps {
    points: Point[];
    selectedPoint: string | null;
    onMapClick: (position: LatLng) => void;
    onMarkerClick: (id: string) => void;
    onPointDragEnd: (id: string, position: LatLng) => void;
}

const MapPoints = ({ points, selectedPoint, onPointDragEnd, onMapClick, onMarkerClick }: MapPointsProps) => {
    useMapEvents({
        click: (event: LeafletMouseEvent) => {
            onMapClick(event.latlng);
        }
    });

    const handleClick = (id: string) => () => {
        onMarkerClick(id);
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