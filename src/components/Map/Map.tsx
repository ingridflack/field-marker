import { ContentWrapper } from "./styles";

import { MapContainer, GeoJSON as GeoJsonComponent, TileLayer, ZoomControl } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import ActionButtons from "../ActionButtons";
import PointsList from "../PointsList";
import fieldGeoJson from "../../assets/field.json";
import { getFieldCenter } from "../../utils/map";
import MapPoints from "../MapPoints/MapPoints";


const Map = () => {
    return (
        <ContentWrapper>
            <MapContainer center={getFieldCenter()} zoom={15} scrollWheelZoom style={{ height: "600px" }} zoomControl={false}>
                <TileLayer
                    attribution='&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png"
                />
                <MapPoints
                    points={points}
                    selectedPoint={selectedPoint}
                    onPointDragEnd={handlePointDragEnd}
                    onMapClick={handleAddPoint}
                    onMarkerClick={handleSelectPoint}
                />
                <GeoJsonComponent data={fieldGeoJson} style={({ properties }) => properties} />
                <ZoomControl position="topright" />
            </MapContainer>

            <PointsList
                points={points}
                selectedPoint={selectedPoint}
                onSelectPoint={handleSelectPoint}
            />

            <ActionButtons
                points={points}
                selectedPoint={selectedPoint}
                onAdd={handleAddPoint}
                onDelete={handleOpenDeletePointModal}
                onDeleteAll={handleOpenDeleteAllModal}
            />
        </ContentWrapper >
    )
}

export default Map;