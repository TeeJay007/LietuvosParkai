<script setup lang="ts">
import Card from "./components/Card.vue";
import Map from "./components/Map.vue";
import Header from "./components/Header.vue";
import Search from "./components/Search.vue";
import Address from "./models/Address";
import parks from "./assets/parkai.json";
import markerImg from './assets/tree.svg';
import { ref } from "vue";
import L, { Icon, LeafletMouseEvent } from "leaflet";

//TODO: SHOULD ONLY LOAD VISIBLE PARKS FROM THE SERVER!!!!
const getParks = parks.map((park) => {
  const { country_code, postcode, road, town, village, city } = park.address;

  const address = [
    `${road || ""}`,
    `${town || village || city || ""}`,
    `${
      country_code
        ? postcode
          ? country_code.toUpperCase() + "-" + postcode
          : ""
        : ""
    }`,
  ]
    .filter((v) => v.length > 0)
    .join(", ");

  return {
    id: park.osmId,
    name: park.name,
    address,
    coordinates: {
      lat: park.coordinates.coordinates[1],
      lon: park.coordinates.coordinates[0],
    },
  };
});

let someParks = ref<Address[]>(getParks);

let map: null | L.Map = null;
const onMapLoad = (m: L.Map) => {
  map = m

  getParks.forEach(park => {
    const popUp = L.popup()
    .setContent(`
      <h1 class="text-xl font-bold text-center">${park.name}</h1>
      <p>${park.address}</p>
      <a href="#">Nurodymai keliaujant į čia.</a>
    `)

    L.marker([park.coordinates.lat, park.coordinates.lon], {
      icon: new Icon({
        iconUrl: markerImg,
        iconSize: [50, 50],
        popupAnchor:  [0, -30]
      })
    }).addTo(m).on('click', (e:LeafletMouseEvent) => {
      m.flyTo(e.latlng, 17)
    }).bindPopup(popUp);
  })
};

const handleZoom = (v: Address) => {
  if (map !== null) map.flyTo([v.coordinates.lat, v.coordinates.lon], 17);
};

const handleSearch = (search: string) => {
  if (search.length > 0)
    someParks.value = getParks.filter(
      (v) =>
        v.name.toLowerCase().includes(search) ||
        v.address.toLowerCase().includes(search)
    );
  else someParks.value = getParks;
};
</script>

<template>
  <div class="md:flex md:h-screen">
    <div class="md:min-h-screen flex flex-col">
      <Header />
      <Search @on-search="handleSearch" />
      <div
        class="
          flex flex-col
          md:border-r
          md:w-96
          md:overflow-y-auto md:overflow-x-hidden
          md:h-full
        "
      >
        <Card
          v-for="park in someParks"
          :key="park.id"
          :address="park"
          @zoom-to="handleZoom"
        />
      </div>
    </div>
    <div class="hidden md:flex flex-auto">
      <Map @on-map="onMapLoad" />
    </div>
  </div>
</template>
