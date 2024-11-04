import { LatLng } from "leaflet";

export interface Point {
    createdAt: string;
    position: LatLng;
    id: string;
    isSelected?: boolean;
}

export type Variant = "delete" | "add";
