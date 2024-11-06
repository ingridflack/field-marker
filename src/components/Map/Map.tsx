import { GeoJSON as GeoJsonComponent, TileLayer, ZoomControl } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import ActionButtons from "../ActionButtons";
import PointsList from "../PointsList";
import fieldGeoJson from "../../assets/field.json";
import { getFieldCenter } from "../../utils/map";
import MapPoints from "../MapPoints/MapPoints";
import ModalConfirm from "../ModalConfirm";
import * as S from "./styles";

const Map = () => {
    return (
        <S.Container>
            <S.MapContainer center={getFieldCenter()} zoom={15} scrollWheelZoom zoomControl={false}>
                <TileLayer
                    attribution='&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png"
                />
                <MapPoints />
                <GeoJsonComponent data={fieldGeoJson as unknown as GeoJSON.GeoJsonObject} style={(feature) => feature?.properties} />
                <ZoomControl position="topright" />
            </S.MapContainer>

            <PointsList />
            <ActionButtons />

            <ModalConfirm />
        </S.Container>
    )
}

export default Map;