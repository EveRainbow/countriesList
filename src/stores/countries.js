import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api'

export const useCountriesStore = defineStore('countries', () => {
  const countriesList = ref([])

  function fetchCountriesList () {
    return api.countries.getCountriesList().then(data => {
      setCountriesList(data)
    })
  }

  function setCountriesList (data) {
    countriesList.value = data
    sessionStorage.setItem("countriesList", JSON.stringify(data))
  }

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

  return { fetchCountriesList, getCountriesList }
})
