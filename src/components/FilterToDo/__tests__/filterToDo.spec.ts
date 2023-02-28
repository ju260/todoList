import FilterToDo from "@/components/FilterToDo/filterToDo.vue";
import { describe, it, expect, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";

const listToDo = {
  value: [
    {
      id: "44cdf430-b1d2-11ed-b797-37bcfc64458d",
      label: "To Do 1",
      isDone: false,
    },
    {
      id: "46a3ecb0-b1d2-11ed-b797-37bcfc64458d",
      label: "To Do 2",
      isDone: false,
    },
    {
      id: "486c50a0-b1d2-11ed-b797-37bcfc64458d",
      label: "To Do 3",
      isDone: true,
    },
  ],
};

const listToDoWithUnDoneState = [
  {
    id: "44cdf430-b1d2-11ed-b797-37bcfc64458d",
    label: "To Do 1",
    isDone: false,
  },
  {
    id: "46a3ecb0-b1d2-11ed-b797-37bcfc64458d",
    label: "To Do 2",
    isDone: false,
  },
];

const listToDoWithDoneState = [
  {
    id: "486c50a0-b1d2-11ed-b797-37bcfc64458d",
    label: "To Do 3",
    isDone: true,
  },
];

vi.mock("@/composables/useTodo", () => ({
  default: () => ({
    listToDo,
  }),
}));

describe("Given FilterToDo", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(FilterToDo);
  });

  afterEach(() => {
    wrapper.unmount();
  });
  describe("When user click on checkbox #toDoStateDone", () => {
    it("Then it should emit 'filtered-list-to-do' with an array of TODO done", async () => {
      wrapper.vm.toDoStateDone = true;
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted()["filtered-list-to-do"][1]).toEqual([
        listToDoWithDoneState,
      ]);
    });
  });
  describe("When user click on checkbox #toDoStateUnDone", () => {
    it("Then it should emit 'filtered-list-to-do' with an array of TODO undone", async () => {
      wrapper.vm.toDoStateUnDone = true;
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted()["filtered-list-to-do"][1]).toEqual([
        listToDoWithUnDoneState,
      ]);
    });
  });
  describe("When user click on both checkbox #toDoStateUnDone and  #toDoStateDone", () => {
    it("Then it should emit 'filtered-list-to-do' with a full array of TODO", async () => {
      wrapper.vm.toDoStateDone = true;
      wrapper.vm.toDoStateUnDone = true;
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted()["filtered-list-to-do"][1]).toEqual([
        listToDo.value,
      ]);
    });
  });
  describe("When user reset both checkboxs", () => {
    it("Then it should emit 'filtered-list-to-do' with a full array of TODO", async () => {
      wrapper.vm.toDoStateDone = true;
      wrapper.vm.toDoStateUnDone = true;
      wrapper.vm.toDoStateDone = false;
      wrapper.vm.toDoStateUnDone = false;
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted()["filtered-list-to-do"][1]).toEqual([
        listToDo.value,
      ]);
    });
  });
});
