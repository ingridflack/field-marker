import { CRS, PolyUtil } from "leaflet";
import fieldGeoJson from "../assets/field.json";

export const getFieldCenter = () => {
    return PolyUtil.polygonCenter(fieldGeoJson.features[0].geometry.coordinates[0].map(([lat, lon]) => [lon, lat]), CRS.EPSG3857);
}