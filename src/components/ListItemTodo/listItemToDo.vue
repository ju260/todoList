<script setup lang="ts">
import itemToDo from "@/components/ItemToDo/itemToDo.vue";
import type { ToDo } from "@/types/todo";

export interface Props {
  listItemToDo: ToDo[];
}
const props = defineProps<Props>();
</script>

<template>
  <div>
    <ul class="grid grid-cols-1 gap-3">
      <li v-for="todo in listItemToDo" :key="todo.id">
        <item-to-do :item="todo" />
      </li>
    </ul>
  </div>
</template>
