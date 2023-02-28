<script setup lang="ts">
import { ref } from "vue";
import { uuid } from "vue3-uuid";
import useToDo from "@/composables/useTodo";

const { addToDo } = useToDo();
const labelToDo = ref("");

async function saveToDo() {
  addToDo({ label: labelToDo.value, id: uuid.v1(), isDone: false });
  resetLabel();
}

function resetLabel() {
  labelToDo.value = "";
}
</script>

<template>
  <div>
    <form @submit.prevent="saveToDo">
      <label for="addToDoInput" class="block text-gray-700">add a TODO:</label>
      <div class="inline-flex w-full items-center">
        <input
          v-model="labelToDo"
          id="addToDoInput"
          type="text"
          data-testid="add-todo-input"
          class="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
        />
        <button
          :disabled="!labelToDo"
          type="submit"
          data-testid="add-todo-button"
          class="ml-1 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 disabled:opacity-25"
        >
          add
        </button>
      </div>
    </form>
  </div>
</template>
