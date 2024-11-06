import React, { PropsWithChildren, useState } from "react";
import { DeleteModal, Point } from "../interfaces/common";
import { getFieldCenter } from "../utils/map";
import { GeoJSON, LatLng } from "leaflet";

type MapContextType = {
  points: Point[];
  selectedPoint: string | null;
  deleteModal: DeleteModal;
  setPoints: (points: Point[]) => void;
  setSelectPoint: (id: string | null) => void;
  onAddPoint: (position?: LatLng) => void;
  onOpenDeletePointModal: (id: string) => void;
  onOpenDeleteAllModal: () => void;
  onCloseModal: () => void;
  onDeletePoint: (id: string) => void;
  onPointDragEnd: (id: string, position: LatLng) => void;
  onSelectPoint: (id: string | null) => void;
  onDeleteModalConfirm: () => void;
};

const MapContext = React.createContext<MapContextType>({
  points: [],
  selectedPoint: null,
  deleteModal: { show: false },
  setPoints: () => { },
  setSelectPoint: () => { },
  onAddPoint: () => { },
  onOpenDeletePointModal: () => { },
  onOpenDeleteAllModal: () => { },
  onCloseModal: () => { },
  onDeletePoint: () => { },
  onPointDragEnd: () => { },
  onSelectPoint: () => { },
  onDeleteModalConfirm: () => { },
});

const MapProvider = ({ children }: PropsWithChildren) => {
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedPoint, setSelectPoint] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<DeleteModal>({ show: false });

  const onAddPoint = (position?: LatLng) => {
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

  const onOpenDeletePointModal = () => {
    setDeleteModal({
      show: true,
      type: 'delete',
      id: selectedPoint,
    });
  };

  const onOpenDeleteAllModal = () => {
    setDeleteModal({
      show: true,
      type: 'delete-all',
    });
  };

  const onCloseModal = () => {
    setDeleteModal({ show: false });
  };

  const onDeletePoint = (id: string) => {
    setPoints((points) => points.filter(point => point.id !== id));
    setSelectPoint(null);
  }

  const onDeleteAllPoints = () => {
    setPoints([]);
    setSelectPoint(null);
  }

  const onSelectPoint = (id: string | null) => {
    setSelectPoint(id);
  }

  const onDeleteModalConfirm = () => {
    if (!deleteModal.id) {
      onDeleteAllPoints();
    } else {
      onDeletePoint(deleteModal.id);
    }

    setDeleteModal({ show: false });
  }

  const onPointDragEnd = (id: string, position: LatLng) => {
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
    <MapContext.Provider value={{
      points,
      selectedPoint,
      setPoints,
      setSelectPoint,
      deleteModal,
      onAddPoint,
      onOpenDeletePointModal,
      onOpenDeleteAllModal,
      onCloseModal,
      onDeletePoint,
      onPointDragEnd,
      onSelectPoint,
      onDeleteModalConfirm
    }}>
      {children}
    </MapContext.Provider>
  );
}

export { MapContext, MapProvider };