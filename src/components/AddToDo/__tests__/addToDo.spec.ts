import AddToDo from "@/components/AddToDo/addToDo.vue";
import { describe, it, expect, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";

const addToDo = vi.fn();

vi.mock("@/composables/useTodo", () => ({
  default: () => ({
    addToDo,
  }),
}));

describe("Given AddToDo", () => {
  describe("When user add a TODO on input add-todo-input", () => {
    it("Then it should enable add TODO button", async () => {
      const wrapper = shallowMount(AddToDo);

      const input = wrapper.find('[data-testid="add-todo-input"]');
      const button = wrapper.find('[data-testid="add-todo-button"]');

      await input.setValue("New ToDo");
      expect(button.element.disabled).toBe(false);
    });
  });
  describe('When user click on button "add"', () => {
    let wrapper;
    let addToDoInput;
    let addToDoButton;
    beforeEach(() => {
      wrapper = shallowMount(AddToDo);
      addToDoInput = wrapper.find('[data-testid="add-todo-input"]');
      addToDoButton = wrapper.find('[data-testid="add-todo-button"]');
    });

    afterEach(() => {
      wrapper.unmount();
    });
    it("Then addToDo should be called with paramatters", async () => {
      await addToDoInput.setValue("New ToDo");
      await addToDoButton.trigger("click");
      await wrapper.find("form").trigger("submit");

      expect(addToDo).toHaveBeenCalledWith({
        label: "New ToDo",
        id: expect.any(String),
        isDone: false,
      });
    });
    it("Then it should clear input", async () => {
      await addToDoInput.setValue("");
      expect(addToDoButton.element.disabled).toBe(true);
    });
    it("Then it should disable button add-todo-button", async () => {
      await addToDoInput.setValue("New ToDo");
      expect(addToDoButton.element.disabled).toBe(false);
    });
  });
});
