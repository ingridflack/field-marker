import styled from "styled-components";
import { MapContainer as LeafletMapContainer } from "react-leaflet"

export const MapContainer = styled(LeafletMapContainer)`
    height: calc(100vh - 80px);
`;

export const Container = styled.div`
    position: relative;
`;