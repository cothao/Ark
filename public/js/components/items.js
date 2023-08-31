const grabData = async () => {
const items = await fetch('/items').then(res => {
  return res.json()
}).then(data => {
  return data
})
return items
}

const items = grabData()

export default items