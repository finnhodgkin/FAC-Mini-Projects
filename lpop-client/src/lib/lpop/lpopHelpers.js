export const getChecked = (list) => list.filter(name => name.isChecked)

export const getUnchecked = (list) => list.filter(name => !name.isChecked)

export const check = (item) => ({...item, isChecked: true})

export const toggleCheck = (item) => ({...item, isChecked: !item.isChecked})

export const uncheckAll = (list) => list.map(item => ({...item, isChecked: false}))

export const findById = (list, id) => list.find(item => item.id === id)

export const removeName = (list, id) => {
  const removeIndex = list.findIndex(item => item.id === id)
  return [
    ...list.slice(0, removeIndex),
    ...list.slice(removeIndex + 1)
  ]
}

export const addName = (list, item) => [...list, item]

export const validateAdd = (input) => input.replace(/[^a-z]/gi, '').length > 1

export const generateId = () => Math.floor(Math.random() * 100000)

export const updateList = (list, updatedItem) => {
  const updatedIndex = list.findIndex(item => item.id === updatedItem.id)
  return [
    ...list.slice(0, updatedIndex),
    updatedItem,
    ...list.slice(updatedIndex + 1)
  ]
}
