<script lang="ts" setup>
import { ref } from "vue";
import { onMounted } from "@vue/runtime-core";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const mapRef = ref<HTMLDivElement | null>(null);

let map: L.Map | null = null;

const emit =
  defineEmits<{
    (e: "on-map", map: L.Map): void;
  }>();

onMounted(() => {
  if (mapRef.value !== null && map === null) map = new L.Map(mapRef.value);

  if (map !== null) {
    map.fitBounds([
      [56.583, 20.794],
      [53.851, 26.718],
    ]);

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    emit("on-map", map);
  }
});
</script>

<template>
  <div class="h-full w-full" ref="mapRef"></div>
</template>