import { firestore } from '@/firebase.js'

export const createVisit = async ({length, mounthYear, roomId, start }) => {
  const res = await firestore.collection('visits').add({
    length,
    mounthYear,
    roomId,
    start,
  })
  return res.id
}
export const updateVisit = async ({id, roomId, start, mounthYear, length }) => {
  const res = await firestore.collection('visits').doc(id).set({
    length,
    mounthYear,
    roomId,
    start,
  })
}
export const getVisitsByMouth = async ({ mounthYear }) => {
  const res = await firestore.collection('visits').where('mounthYear', '==', mounthYear).get()
  if(res.empty) return []
  return res.docs.map(item => { 
    return { id: item.id, ...item.data() }
  })
}