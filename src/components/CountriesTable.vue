<template>
  <div
    v-if="isLoading"
    class="text-center"
  >
    <v-progress-circular
      indeterminate
      color="primary"
    />
  </div>
  <v-table
    v-else
    fixed-header
    height="100%"
    class="h-100"
  >
    <thead>
      <tr>
        <th class="text-left">
          Name
        </th>
        <th class="text-left">
          Capital
        </th>
        <th class="text-left">
          Population
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="country in countries.getCountriesList"
        :key="country.name"
        class="selectable"
        :class="country.name === props.selectedCountry?.name ? 'selected' : ''"
        @click="updateSelected(country)"
      >
        <td>{{ country.name }}</td>
        <td>{{ country.capital || '-' }}</td>
        <td>{{ country.population }}</td>
      </tr>
    </tbody>
  </v-table>
  <p
    v-if="!isLoading && !countries.getCountriesList?.length"
    class="text-center"
  >
    No data
  </p>
</template>

<script setup>
import { useCountriesStore } from "@/stores/countries"
import { onBeforeMount, ref } from "vue"

const props = defineProps({
  selectedCountry: {
    type: Object,
    default: () => null
  }
})

const emit = defineEmits(['updateSelected'])

const countries = useCountriesStore()
onBeforeMount(() => {
  if (!countries.getCountriesList.length) {
    fetchCountries()
  }
})

function updateSelected (country) {
  let newCountrySelected = null
  if (props.selectedCountry?.name !== country.name) {
    newCountrySelected = country
  }
  emit('updateSelected', newCountrySelected)
}

let isLoading = ref(false)
async function fetchCountries () {
  isLoading.value = true
  await countries.fetchCountriesList()
  isLoading.value = false
}

</script>

<style lang="scss" scoped>
$selectedColor: #ffc107;
  .selectable {
    cursor: pointer;
  }

  .selectable:hover > td {
    background: $selectedColor
  }

  .selected {
    background: $selectedColor
  }
</style>
