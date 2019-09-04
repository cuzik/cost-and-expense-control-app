import axios from 'axios'

const getHeader = () => {
  const tokenDOM = document.querySelector('meta[name="csrf-token"]')
  const token = tokenDOM ? tokenDOM.getAttribute('content') : ''
  return { headers: { 'X-CSRF-Token': token } }
}

export const wallets = () => (
  axios.get('/wallets.json')
)

export const entryList = () => (
  axios.get('/entries.json')
)

export const entryCreate = params => (
  axios.post('/entries', params, getHeader())
)

export const walletCreate = params => (
  axios.post('/wallets', params, getHeader())
)
