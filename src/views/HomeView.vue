<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from "vue";
import addToDo from "@/components/AddToDo/addToDo.vue";
import useToDo from "@/composables/useTodo";
import type { ToDo } from "@/types/todo";

const listItemToDo = defineAsyncComponent(
  () => import("@/components/ListItemTodo/listItemToDo.vue")
);
const filterToDo = defineAsyncComponent(
  () => import("@/components/FilterToDo/filterToDo.vue")
);

const { listToDo } = useToDo();
const newList = ref<ToDo[]>(listToDo.value);

const isListToDoNotEmpty = computed<boolean>(() => !!listToDo.value.length);

function filteredListToDo(list: ToDo[]): void {
  newList.value = list;
}
</script>

<template>
  <main class="px-6 text-gray-900 antialiased">
    <div class="mx-auto max-w-xl py-12">
      <h1 class="text-2xl font-bold text-blue-500">TODO LIST</h1>
      <add-to-do class="mt-8" />
      <filter-to-do
        v-if="isListToDoNotEmpty"
        @filtered-list-to-do="filteredListToDo"
        class="mt-3"
      />
      <list-item-to-do
        class="mt-8 max-w-md"
        v-if="isListToDoNotEmpty"
        :listItemToDo="newList"
      />
    </div>
  </main>
</template>
