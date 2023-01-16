import request from '@/api/request'

export const getCountriesList = () => {
  return request({
    url: 'https://restcountries.com/v2/all?fields=name,capital,population,latlng',
    method: 'GET'
  })
}
