import { describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { ButtonVariant } from "../../interfaces/common";
import ActionButton from ".";

describe("ActionButton", () => {
    it("should match the snapshot", () => {
        const props = {
            onClick: vi.fn(),
            variant: 'add' as ButtonVariant,
            icon: "icon",
            children: "Button test"
        }

        const { container } = render(
            <ActionButton {...props} />
        );

        expect(container).toMatchSnapshot();
    });

    it("should call onClick function", () => {
        const props = {
            onClick: vi.fn(),
            variant: 'add' as ButtonVariant,
            icon: "icon",
            children: "Button test"
        }

        const { getByRole } = render(
            <ActionButton {...props} />
        );

        const button = getByRole("button", { name: 'Button test' });

        fireEvent.click(button);

        expect(props.onClick).toHaveBeenCalled();
    });

})