export const mergeById = (data, newData) => {
  const ids = newData.map(item => item.id)
  return [...data.filter(item => !ids.includes(item.id)), ...newData]
}

export const deleteById = (data, target) => data.filter(({ id }) => id !== target)
