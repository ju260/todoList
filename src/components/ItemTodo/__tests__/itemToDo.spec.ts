import ItemToDo from "@/components/ItemToDo/itemToDo.vue";
import { describe, it, expect, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";

const updateToDo = vi.fn();
const deleteToDo = vi.fn();

vi.mock("@/composables/useTodo", () => ({
  default: () => ({
    updateToDo,
    deleteToDo,
  }),
}));

const item = {
  id: "44cdf430-b1d2-11ed-b797-37bcfc64458d",
  label: "To Do text",
  isDone: false,
};
let wrapper;
let label;
let checkbox;
let buttonEdit;
let buttonDelete;

describe("Given ItemToDo", () => {
  beforeEach(() => {
    wrapper = shallowMount(ItemToDo, { props: { item } });
    label = wrapper.find('[data-testid="label-todo"]');
    checkbox = wrapper.find('[data-testid="checkbox-todo"]');
    buttonEdit = wrapper.find('[data-testid="edit-button"]');
    buttonDelete = wrapper.find('[data-testid="delete-todo"]');
  });

  afterEach(() => {
    wrapper.unmount();
  });
  describe("When user click on a to do", () => {
    it("Then it enables checkbox", async () => {
      await label.trigger("click");
      expect(checkbox.element.checked).toBeTruthy();
    });
    it("Then it calls updateToDo", async () => {
      await checkbox.setChecked(true);
      await checkbox.trigger("change");
      await wrapper.vm.$nextTick();
      expect(updateToDo).toHaveBeenCalledWith({
        id: item.id,
        patch: { isDone: true },
      });
    });
  });
  describe("When user click on button edit", () => {
    it("Then we should see an input tag for the label to do instead of a span", async () => {
      await buttonEdit.trigger("click");
      const inputLabelEle = wrapper.find('[data-testid="edit-todo"]');
      expect(inputLabelEle.exists()).toBe(true);
    });
    it("Then if we change the text it should it calls updateToDo", async () => {
      await buttonEdit.trigger("click");
      const inputLabelEle = wrapper.find('[data-testid="edit-todo"]');
      await inputLabelEle.setValue("New ToDo");
      expect(updateToDo).toHaveBeenCalledWith({
        id: item.id,
        patch: { label: "New ToDo" },
      });
    });
  });
  describe("When user click on button delete", () => {
    it("Then it should call deleteToDo", async () => {
      await buttonDelete.trigger("click");
      expect(deleteToDo).toHaveBeenCalledWith(item.id);
    });
  });
});
