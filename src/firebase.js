import { initializeApp } from 'firebase'

const app = initializeApp({
  apiKey: "a",
  authDomain: "a",
  databaseURL: "https://vuefirecrud-ea4bf.firebaseio.com",
  projectId: "vuefirecrud-ea4bf",
  storageBucket: "vuefirecrud-ea4bf.appspot.com",
  messagingSenderId: "a"
})

export const db = app.database();
export const namesRef = db.ref('names');