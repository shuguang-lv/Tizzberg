// Suppose we have a `/list` API, which returns an array `items`.

//   // fetchList is provided for you

//   const fetchList = (since?: number) => Promise<{items: Array<{id: number}>}>

// 1. for initial request, we just fetch `fetchList`. and get the last item id from response.
// 2. for next page, we need to call `fetchList(lastItemId)`.
// 3. repeat above process.

// The `/list` API only gives us 5 items at a time, with server-side filtering, it might be less than 5. But if none returned, it means nothing to fetch any more and we should stop.

// You are asked to create a function that could return arbitrary amount of items.

//   const fetchListWithAmount = (amount: number = 5) { }

/**
 * Using async/await loop
 */
export async function fetchListWithAmount(amount = 5, fetchListFn) {
  let cursor
  const result = []

  while (result.length < amount) {
    const { items } = await fetchListFn(cursor)
    if (items.length > 0) {
      result.push(...items)
      cursor = items[items.length - 1].id
    } else {
      break
    }
  }
  
  return result.slice(0, amount)
}
