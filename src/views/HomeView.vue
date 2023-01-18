<template>
  <div style="height: 70px">
    <p class="text-h4 pt-3 text-center">
      List of countries
    </p>
  </div>
  <div class="screenHeightWrapper d-flex justify-space-between">
    <div class="w-50">
      <CountriesTable
        :selected-country="selectedCountry"
        @update-selected="updateSelectedCountry"
      />
    </div>
    <div class="w-50">
      <MapComponent :marker="marker" />
    </div>
  </div>
</template>

<script setup>
import CountriesTable from '@/components/CountriesTable.vue';
import MapComponent from '@/components/MapComponent.vue';
import { ref, computed } from "vue"

let selectedCountry = ref(null)
function updateSelectedCountry (country) {
  selectedCountry.value = country
}
const marker = computed(() => {
  let marker = {
    lat: 0,
    lng: 0
  }
  if (selectedCountry.value) {
    if (!selectedCountry.value.latlng) {
      alert(`There is no coordinates for ${selectedCountry.value.name}`)
    }
    let [lat, lng] = selectedCountry.value.latlng || [0, 0]
    marker = { lat, lng }
  }
  return marker
})

</script>
