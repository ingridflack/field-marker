import { LatLng } from "leaflet";

export interface Point {
    createdAt: string;
    position: LatLng;
    id: string;
    isSelected?: boolean;
}

export type ButtonVariant = "delete" | "add";

export type DeleteModalType = "delete-all" | "delete";

export interface DeleteModal {
    show: boolean;
    id?: string | null;
    type?: DeleteModalType;
}
