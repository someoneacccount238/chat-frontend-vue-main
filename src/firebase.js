import 'firebase/firestore'
import { getFirestore } from "firebase/firestore";


import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { collection, query, where, getDocs } from "firebase/firestore";


import {ref, onUnmounted,computed} from 'vue' 

 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAtBK3NZpNRNcWwbrJNSqhZVQNvWG65YM",
  authDomain: "vue-chat-app-50cb6.firebaseapp.com",
  projectId: "vue-chat-app-50cb6",
  storageBucket: "vue-chat-app-50cb6.firebasestorage.app",
  messagingSenderId: "456014124478",
  appId: "1:456014124478:web:225150f797f8d8d27855ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// const messagesCollection =collection(firestore,'messages')

//change for new syntax
const messagesQuery = query(collection(firestore, "messages"))



export async function  useChat() {
  const messages = ref([])
  const querySnapshot = await getDocs(messagesQuery);

  const unsubscribe =querySnapshot.forEach(doc => ({ id: doc.id, ...doc.data() }))
  
  onUnmounted(unsubscribe)

  const sendMessage = text => {
    messagesCollection.add({
      userName: 'testName',
      userId: 'testUserId',
      userPhotoURL: 'testPhotoUrl',
      text:text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  return { messages, sendMessage }
}