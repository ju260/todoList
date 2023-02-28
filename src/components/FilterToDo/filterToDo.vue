<script setup lang="ts">
import useToDo from "@/composables/useTodo";
import { ref, watchEffect, computed } from "vue";
import type { ToDo } from "@/types/todo";

const { listToDo } = useToDo();
const toDoStateDone = ref(false);
const toDoStateUnDone = ref(false);

const emit = defineEmits<{
  (event: "filtered-list-to-do", listToDo: ToDo[]): void;
}>();

function filterByState(isDone: boolean): ToDo[] {
  return listToDo.value.filter((todo: ToDo) => todo.isDone === isDone);
}

const isOnlyToDoDoneVisible = computed<boolean>(
  () => toDoStateDone.value && !toDoStateUnDone.value
);
const isOnlyToDoUnDoneVisible = computed<boolean>(
  () => toDoStateUnDone.value && !toDoStateDone.value
);

watchEffect(() => {
  if (isOnlyToDoDoneVisible.value || isOnlyToDoUnDoneVisible.value) {
    return emit(
      "filtered-list-to-do",
      filterByState(isOnlyToDoDoneVisible.value)
    );
  }

  return emit("filtered-list-to-do", listToDo.value);
});
</script>

<template>
  <fieldset class="border-b-2 pb-1">
    <legend class="pb-1 text-sm">filter by:</legend>
    <input
      id="toDoStateDone"
      type="checkbox"
      v-model="toDoStateDone"
      data-testid="to-do-state-done"
    />
    <label class="mr-3 ml-1" for="toDoStateDone">done</label>
    <input
      id="toDoStateUnDone"
      type="checkbox"
      v-model="toDoStateUnDone"
      data-testid="to-do-state-undone"
    />
    <label class="mr-3 ml-1" for="toDoStateUnDone">UnDone</label>
  </fieldset>
</template>
