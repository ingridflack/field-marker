import { useState } from "react";
import { GeoJSON, LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { DeleteModalType, Point } from "./interfaces/common";
import GlobalStyle from "./globalStyle";
import ModalConfirm from "./components/ModalConfirm";
import { PageTitle } from "./App.styles";
import Map from "./components/Map/Map";
import { getFieldCenter } from "./utils/map";

interface DeleteModal {
  show: boolean;
  id?: string | null;
  type?: DeleteModalType;
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
    <>
      <GlobalStyle />

      <PageTitle>Gestão de pontos no mapa</PageTitle>

      <Map />

      <ModalConfirm isOpen={deleteModal.show} onConfirm={handleDeleteModal} onClose={handleCloseModal} type={deleteModal.type} />
    </ >
  )
}

export default App
