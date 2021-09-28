import { firestore } from '@/firebase.js'

export const createVisit = async ({length, mounthYear, roomId, start, name }) => {
  const res = await firestore.collection('visits').add({
    length,
    mounthYear,
    roomId,
    start,
    name
  })
  return res.id
}
export const updateVisit = async ({ id, roomId, start }) => {
  const res = await firestore.collection('visits').doc(id).update({
    roomId,
    start
  })
}
export const getVisitsByMouth = async ({ mounthYear }) => {
  const res = await firestore.collection('visits').where('mounthYear', '==', mounthYear).get()
  if(res.empty) return []
  return res.docs.map(item => { 
    return { id: item.id, ...item.data() }
  })
}