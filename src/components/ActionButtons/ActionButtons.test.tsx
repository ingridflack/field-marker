import { describe, expect, it } from "vitest";
import ActionButtons from ".";
import { render } from "@testing-library/react";
import { MapContext, MapContextType } from "../../MapContext/useMapContext";
import { LatLng } from "leaflet";
import { Point } from "../../interfaces/common";


describe('ActionButtons', () => {
    it("should match the snapshot when the points list is empty", () => {
        const { getByRole, queryByRole } = render(
            <MapContext.Provider value={{
                points: [] as Point[],
                selectedPoint: null,
            } as MapContextType}>
                <ActionButtons />
            </MapContext.Provider>
        );

        const addPointbutton = getByRole("button", { name: 'Adicionar ponto' });
        const deleteAllButton = queryByRole("button", { name: 'Deletar todos' });
        const deletePointButton = queryByRole("button", { name: 'Deletar pin' });

        expect(addPointbutton).toBeTruthy();
        expect(deleteAllButton).toBeFalsy();
        expect(deletePointButton).toBeFalsy();
    })

    it("should match the snapshot when the points list is not empty and no selected point", () => {
        const { getByRole, queryByRole } = render(
            <MapContext.Provider value={{
                points: [
                    {
                        createdAt: "2021-09-01T00:00:00.000Z",
                        position: new LatLng(0, 0),
                        id: "1",
                        isSelected: false,
                    }
                ],
                selectedPoint: null,
            } as MapContextType}>
                <ActionButtons />
            </MapContext.Provider>
        );

        const addPointbutton = getByRole("button", { name: 'Adicionar ponto' });
        const deleteAllButton = getByRole("button", { name: 'Deletar todos' });
        const deletePointButton = queryByRole("button", { name: 'Deletar pin' });

        expect(addPointbutton).toBeTruthy();
        expect(deleteAllButton).toBeTruthy();
        expect(deletePointButton).toBeFalsy();
    })

    it("should match the snapshot when the points list is not empty and a point is selected", () => {
        const { getByRole, queryByRole } = render(
            <MapContext.Provider value={{
                points: [
                    {
                        createdAt: "2021-09-01T00:00:00.000Z",
                        position: new LatLng(0, 0),
                        id: "1",
                        isSelected: true,
                    }
                ],
                selectedPoint: '1',
            } as MapContextType}>
                <ActionButtons />
            </MapContext.Provider>
        );

        const addPointbutton = getByRole("button", { name: 'Adicionar ponto' });
        const deleteAllButton = getByRole("button", { name: 'Deletar todos' });
        const deletePointButton = queryByRole("button", { name: 'Deletar pin' });

        expect(addPointbutton).toBeTruthy();
        expect(deleteAllButton).toBeTruthy();
        expect(deletePointButton).toBeTruthy();
    })
});