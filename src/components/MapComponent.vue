<template>
  <GoogleMap
    :api-key="googleMapApiKey"
    style="width: 100%; height: 100%"
    :center="props.marker"
    :zoom="2"
  >
    <Marker
      v-if="marker.lat && marker.lng"
      :options="{ position: props.marker }"
    />
  </GoogleMap>
</template>

<script setup>
import { GoogleMap, Marker } from "vue3-google-map";

const props = defineProps({
  marker: {
    type: Object,
    default: () => ({
      lat: 0,
      lng: 0
    })
  }
})

const googleMapApiKey = import.meta.env.GOOGLE_MAPS_API_KEY

</script>

<style></style>
