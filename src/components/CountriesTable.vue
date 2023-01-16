<template>
  <v-table fixed-header>
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
</template>

<script setup>
import { useCountriesStore } from "@/stores/countries"
import { onMounted } from "vue"

const props = defineProps({
  selectedCountry: {
    type: Object,
    default: () => null
  }
})

const emit = defineEmits(['updateSelected'])

const countries = useCountriesStore()
onMounted(() => {
  if (!countries.getCountriesList.length) {
    countries.fetchCountriesList()
  }
})

function updateSelected (country) {
  let newCountrySelected = null
  if (props.selectedCountry?.name !== country.name) {
    newCountrySelected = country
  }
  emit('updateSelected', newCountrySelected)
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
