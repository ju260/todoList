import { ref } from "vue";
import type { ToDo } from "@/types/todo";

const listToDo = ref<ToDo[]>([]);

export default () => {
  // this function is a fake api call, for a better simulation
  function callApi(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function addToDo({ id, label, isDone }: ToDo) {
    try {
      await callApi(1000);
      listToDo.value.push({ id, label, isDone });
    } catch (error) {
      console.error("error during addToDo", error);
      throw error;
    }
  }

  async function updateToDo({
    id,
    patch,
  }: {
    id: string;
    patch: Partial<ToDo>;
  }) {
    try {
      await callApi(1000);
      const updatedToDoIndex = listToDo.value.findIndex(
        (todo) => todo.id === id
      );
      if (updatedToDoIndex === -1) {
        console.error("no id corresponding in the to do list");
        return;
      }
      listToDo.value[updatedToDoIndex] = {
        ...listToDo.value[updatedToDoIndex],
        ...patch,
      };
    } catch (error) {
      console.error("error during updateToDo", error);
      throw error;
    }
  }

  const deleteToDo = async (id: string) => {
    try {
      await callApi(1000);
      listToDo.value = listToDo.value.filter((item) => item.id !== id);
    } catch (error) {
      console.error("error during deleteItem", error);
      throw error;
    }
  };

  return {
    listToDo,
    addToDo,
    updateToDo,
    deleteToDo,
  };
};
