import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api'

export const useCountriesStore = defineStore('countries', () => {
  const countriesList = ref([])
  const getCountriesList = computed(() => {
    let countriesListFromSessionStorage = sessionStorage.getItem("countriesList")
    if (countriesListFromSessionStorage) {
      countriesListFromSessionStorage = JSON.parse(countriesListFromSessionStorage)
    }
    const result = countriesListFromSessionStorage && countriesListFromSessionStorage.length
      ? countriesListFromSessionStorage
      : countriesList.value
    return result
  })

  function fetchCountriesList () {
    return api.countries.getCountriesList().then(data => {
      countriesList.value = data
      sessionStorage.setItem("countriesList", JSON.stringify(data))
    })
  }

  return { fetchCountriesList, getCountriesList }
})
