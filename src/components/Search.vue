<script lang="ts" setup>
import { ref } from "vue";

let timerID: number = 0;

const emit =
  defineEmits<{
    (e: "on-search", search: string): void;
  }>();

const search = ref("");
const onSearch = () => {
  clearTimeout(timerID);
  timerID = setTimeout(() => {
    emit("on-search", search.value.trim().toLowerCase());
  }, 500);
};
</script>
<template>
  <div>
    <input
      @input="onSearch"
      v-model="search"
      class="p-4 border-b w-full"
      type="text"
      placeholder="Ieškoti..."
    />
  </div>
</template>