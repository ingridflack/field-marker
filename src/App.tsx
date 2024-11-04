import { useState } from "react";
import { CRS, GeoJSON, Icon, LatLng, LeafletMouseEvent, PolyUtil } from "leaflet";
import { MapContainer, Marker, GeoJSON as GeoJsonComponent, TileLayer, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import fieldGeoJson from "./assets/field.json";
import ButtonList from "./components/ButtonList";
import defaultPinIcon from "./assets/icons/default-pin.svg";
import selectedPinIcon from "./assets/icons/selected-pin.svg";
import { Point } from "./interfaces/common";

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
  onClick: (position: LatLng) => void;
  selectedPoint: string | null;
  onMapClick: (position: LatLng) => void;
  onMarkerClick: (id: string) => void;
}

const MapPoints = ({ points, selectedPoint, onMapClick, onMarkerClick }: MapPointsProps) => {
  const map = useMapEvents({
    click: (event: LeafletMouseEvent) => {
      onMapClick(event.latlng);
    }
  });

  // @TODO: Update the selected point position after dragging it.

  return points.map(({ id, position }) => {
    const isSelected = selectedPoint === id;

    return (
      <Marker
        key={id}
        icon={isSelected ? selectedPin : defaultPin}
        position={position}
        draggable={isSelected}
        eventHandlers={{
          click: () => {
            onMarkerClick(id);
          }
        }}
      />
    )
  })
}

function App() {
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedPoint, setSelectPoint] = useState<string | null>(null);

  const handleAddPoint = (position?: LatLng) => {
    if (!position) {
      position = PolyUtil.polygonCenter(fieldGeoJson.features[0].geometry.coordinates[0].map(([lat, lon]) => [lon, lat]), CRS.EPSG3857);
    }

    setPoints((points) => [...points, {
      createdAt: new Date().toISOString(),
      position: GeoJSON.coordsToLatLng([position.lng, position.lat]),
      id: new Date().getTime().toString(),
    }]);

    setSelectPoint(null);
  }

  const handleDeletePoint = (id: string) => {
    setPoints((points) => points.filter(point => point.id !== id));
    setSelectPoint(null);
  }

  const handleDeleteAllPoints = () => {
    setPoints([]);
    setSelectPoint(null);
  }

  const handleSelectPoint = (id: string) => {
    setSelectPoint(id);
  }

  return (
    <div>
      <h1>Gestão de pontos no mapa</h1>

      <div style={{ position: "relative" }}>
        <MapContainer center={fieldGeoJson.features[0].geometry.coordinates[0].map(([lat, lon]) => [lon, lat])[0]} zoom={13} scrollWheelZoom={false} style={{ height: "600px" }}>
          <TileLayer
            attribution='&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png"
          />

          <MapPoints points={points} selectedPoint={selectedPoint} onMapClick={handleAddPoint} onMarkerClick={handleSelectPoint} />

          <GeoJsonComponent data={fieldGeoJson} style={({ properties }) => properties} />
        </MapContainer>

        <ButtonList points={points} selectedPoint={selectedPoint} onAdd={handleAddPoint} onDelete={handleDeletePoint} onDeleteAll={handleDeleteAllPoints} />
      </div >
    </div >
  )
}

export default App
