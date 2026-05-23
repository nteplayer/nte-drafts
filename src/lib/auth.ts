import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

import { doc, setDoc } from 'firebase/firestore'

import { auth, db } from './firebase'

export const registerUser = async (
  email: string,
  password: string,
  nickname: string
) => {
  const response = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  )

  await setDoc(doc(db, 'users', response.user.uid), {
    uid: response.user.uid,
    email,
    nickname,
    role: 'user',
    createdAt: Date.now()
  })

  return response.user
}

export const loginUser = async (
  email: string,
  password: string
) => {
  const response = await signInWithEmailAndPassword(
    auth,
    email,
    password
  )

  return response.user
}

export const logoutUser = async () => {
  await signOut(auth)
}
