<script setup lang="ts">
import { ref, nextTick } from "vue";
import type { ToDo } from "@/types/todo";
import useToDo from "@/composables/useTodo";
import IconDelete from "@/components/icons/IconDelete.vue";
import IconEdit from "@/components/icons/IconEdit.vue";

export interface Props {
  item: ToDo;
}
const props = defineProps<Props>();

const inputLabel = ref(props.item.label);
const inputLabelEle = ref<HTMLInputElement>();
const isLabelReadOnly = ref(true);
const isToDoDone = ref(props.item.isDone);

const { updateToDo, deleteToDo } = useToDo();

function edit() {
  isLabelReadOnly.value = false;
  nextTick(() => {
    inputLabelEle?.value?.focus();
  });
}
function labelChanged() {
  isLabelReadOnly.value = true;
  if (props.item.label !== inputLabel.value) {
    updateToDo({ id: props.item.id, patch: { label: inputLabel.value } });
  }
}
function handleToDoState() {
  updateToDo({ id: props.item.id, patch: { isDone: isToDoDone.value } });
}
</script>

<template>
  <label class="inline-flex" :for="item.id" data-testid="label-todo">
    <input
      v-model="isToDoDone"
      :id="item.id"
      class="mr-2 h-6 w-6 rounded border-gray-300 bg-gray-100 dark:ring-offset-gray-800"
      type="checkbox"
      @change="handleToDoState"
      data-testid="checkbox-todo"
    />
    <template v-if="isLabelReadOnly">
      <span>{{ inputLabel }}</span>
    </template>
    <template v-else>
      <input
        type="text"
        ref="inputLabelEle"
        v-model.lazy="inputLabel"
        @change="labelChanged"
        data-testid="edit-todo"
      />
    </template>
  </label>
  <div class="inline-flex pl-3">
    <button @click="edit" data-testid="edit-button" title="edit">
      <icon-edit class="w-5" />
    </button>
    <button
      @click="deleteToDo(item.id)"
      title="delete"
      data-testid="delete-todo"
    >
      <icon-delete class="ml-1 w-5" />
    </button>
  </div>
</template>
