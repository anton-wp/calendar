import { firestore } from '@/firebase.js'

export const getRooms = async () => {
  const res = await firestore.collection('rooms').get()
  if(res.empty) return []
  return res.docs.map(item => { 
    return { id: item.id, ...item.data() }
  })
}
export const createRoom = async ({ name }) => {
  const res = await firestore.collection('rooms').add({
    name
  })
  return res.id
}