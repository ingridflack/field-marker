import { describe, expect, it, vi } from "vitest";

import { render } from "@testing-library/react";
import { MapContext, MapContextType } from "../../MapContext/useMapContext";
import { Point } from "../../interfaces/common";
import PointListItem from ".";
import { LatLng } from "leaflet";


describe('PointListItem', () => {
    it("should match the snapshot", () => {
        const props = {
            point: {
                id: "1",
                createdAt: new Date().toISOString(),
                position: new LatLng(0, 0),
            },
            index: 0,
            selected: false,
            onSelectPoint: vi.fn(),

        }

        const { getByText } = render(
            <MapContext.Provider value={{
                points: [{
                    id: "1",
                    createdAt: new Date().toISOString(),
                    position: new LatLng(0, 0),
                }] as Point[],
                selectedPoint: null,
            } as MapContextType}>
                <PointListItem {...props} />
            </MapContext.Provider>
        );

        const pointTitle = getByText("Ponto nº 001");

        expect(pointTitle).toBeTruthy();

    })
});