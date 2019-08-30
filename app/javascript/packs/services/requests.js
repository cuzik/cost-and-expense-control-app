import axios from 'axios'

const getHeader = () => {
  const tokenDOM = document.querySelector('meta[name="csrf-token"]')
  const token = tokenDOM ? tokenDOM.getAttribute('content') : ''
  return { headers: { 'X-CSRF-Token': token } }
}

export const walletList = () => (
  axios.get('/wallets.json')
)

export const entryList = () => (
  axios.get('/entries.json')
)

export const entryCreate = params => (
  axios.post('/entries.json', params, getHeader())
)
