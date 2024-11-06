import { useState } from "react";
import { CRS, DragEndEvent, GeoJSON, Icon, LatLng, LeafletMouseEvent, PolyUtil } from "leaflet";
import { MapContainer, Marker, GeoJSON as GeoJsonComponent, TileLayer, useMapEvents, ZoomControl } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import fieldGeoJson from "./assets/field.json";
import ButtonList from "./components/ButtonList";
import defaultPinIcon from "./assets/icons/default-pin.svg";
import selectedPinIcon from "./assets/icons/selected-pin.svg";
import { DeleteModalType, Point } from "./interfaces/common";
import PointsList from "./components/PointsList";
import GlobalStyle from "./globalStyle";
import ModalConfirm from "./components/ModalConfirm";

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

interface DeleteModal {
  show: boolean;
  id?: string | null;
  type?: DeleteModalType;
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

const getFieldCenter = () => {
  return PolyUtil.polygonCenter(fieldGeoJson.features[0].geometry.coordinates[0].map(([lat, lon]) => [lon, lat]), CRS.EPSG3857);
}

function App() {
  const [points, setPoints] = useState<Point[]>([]);
  const [deleteModal, setDeleteModal] = useState<DeleteModal>({ show: false });
  const [selectedPoint, setSelectPoint] = useState<string | null>(null);

  const handleAddPoint = (position?: LatLng) => {
    if (!position) {
      position = getFieldCenter();
    }

    setPoints((points) => [...points, {
      createdAt: new Date().toISOString(),
      position: GeoJSON.coordsToLatLng([position.lng, position.lat]),
      id: new Date().getTime().toString(),
    }]);

    setSelectPoint(null);
  }

  const handleOpenDeletePointModal = () => {
    setDeleteModal({
      show: true,
      type: 'delete',
      id: selectedPoint,
    });
  };

  const handleOpenDeleteAllModal = () => {
    setDeleteModal({
      show: true,
      type: 'delete-all',
    });
  };

  const handleCloseModal = () => {
    setDeleteModal({ show: false });
  };

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

  const handleDeleteModal = () => {
    if (!deleteModal.id) {
      handleDeleteAllPoints();
    } else {
      handleDeletePoint(deleteModal.id);
    }

    setDeleteModal({ show: false });
  }

  const handlePointDragEnd = (id: string, position: LatLng) => {
    setPoints((points) => points.map(point => {
      if (point.id === id) {
        return {
          ...point,
          position,
        }
      }

      return point;
    }));
  }

  return (
    <div>
      <GlobalStyle />

      <h1>Gestão de pontos no mapa</h1>

      <div style={{ position: "relative" }}>
        <MapContainer center={getFieldCenter()} zoom={15} scrollWheelZoom style={{ height: "600px" }} zoomControl={false}>
          <TileLayer
            attribution='&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png"
          />
          <MapPoints points={points} selectedPoint={selectedPoint} onPointDragEnd={handlePointDragEnd} onMapClick={handleAddPoint} onMarkerClick={handleSelectPoint} />
          <GeoJsonComponent data={fieldGeoJson} style={({ properties }) => properties} />
          <ZoomControl position="topright" />
        </MapContainer>

        <PointsList points={points} selectedPoint={selectedPoint} onSelectPoint={handleSelectPoint} />
        <ButtonList points={points} selectedPoint={selectedPoint} onAdd={handleAddPoint} onDelete={handleOpenDeletePointModal} onDeleteAll={handleOpenDeleteAllModal} />
      </div >

      <ModalConfirm isOpen={deleteModal.show} onConfirm={handleDeleteModal} onClose={handleCloseModal} type={deleteModal.type} />
    </div >
  )
}

export default App
