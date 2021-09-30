<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Address from "../models/Address";

interface CardProps {
  address: Address;
  liked?: boolean;
}

const { address, liked } = withDefaults(defineProps<CardProps>(), {
  liked: false,
});

const emit =
  defineEmits<{
    (e: "zoom-to", address: Address): void;
  }>();

const like = ref(liked);

const onLike = () => {
  like.value = !like.value
  if(like.value === false)
    window.localStorage.removeItem(address.id)
  else
    window.localStorage.setItem(address.id, like.value.toString())
}

onMounted(() => {
  const isLiked = window.localStorage.getItem(address.id)
  like.value = isLiked !== null
})
</script>

<template>
  <div :class="['flex border-b justify-between', like ? 'order-first' : '']">
    <div class="flex flex-1">
      <button
        type="button"
        class="w-full text-left px-4"
        @click="emit('zoom-to', address)"
      >
      <div>
        <h1 class="font-bold text-xl truncate w-64" :title="address.name">
          {{ address.name }}
        </h1>
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="flex-none text-green-500 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            />
          </svg>
          <p class="truncate w-64" :title="address.address">
            {{ address.address }}
          </p>
        </div>
      </div>
      </button>
    </div>
    <div class="flex align-middle">
      <button
        type="button"
        class="text-red-600 px-4 py-6"
        @click="onLike"
        :title="like ? 'Unlike' : 'Like'"
      >
        <svg
          v-show="!like"
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <svg
          v-show="like"
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>