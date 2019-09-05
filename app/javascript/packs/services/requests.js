import axios from 'axios'

const getHeader = () => {
  const tokenDOM = document.querySelector('meta[name="csrf-token"]')
  const token = tokenDOM ? tokenDOM.getAttribute('content') : ''
  return { headers: { 'X-CSRF-Token': token } }
}

export const wallets = () => (
  axios.get('/wallets.json')
)

export const entries = params => (
  axios.get('/entries.json', { params })
)

export const places = () => (
  axios.get('/places.json')
)

export const entryCreate = params => (
  axios.post('/entries', params, getHeader())
)

export const walletCreate = params => (
  axios.post('/wallets', params, getHeader())
)

export const placeCreate = params => (
  axios.post('/places', params, getHeader())
)
