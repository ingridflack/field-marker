import "leaflet/dist/leaflet.css";
import GlobalStyle from "./globalStyle";
import { PageTitle } from "./App.styles";
import Map from "./components/Map/Map";
import { MapProvider } from "./MapContext/useMapContext";

function App() {
  return (
    <>
      <GlobalStyle />

      <PageTitle>Gestão de pontos no mapa</PageTitle>

      <MapProvider>
        <Map />
      </MapProvider>
    </ >
  )
}

export default App
