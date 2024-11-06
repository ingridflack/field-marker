import { describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { ButtonVariant } from "../../interfaces/common";
import Button from ".";

describe("Button", () => {
    it("should match the snapshot", () => {
        const props = {
            onClick: vi.fn(),
            variant: 'add' as ButtonVariant,
            icon: "icon",
            children: "Button test"
        }

        const { container } = render(
            <Button {...props} />
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
            <Button {...props} />
        );

        const button = getByRole("button", { name: 'Button test' });

        fireEvent.click(button);

        expect(props.onClick).toHaveBeenCalled();
    });

})