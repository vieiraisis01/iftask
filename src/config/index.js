import { getFirestore } from "firebase/firestore"
import firebase from "firebase/compat/app"
import "firebase/firestore"

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDjnrbya5Hhd_19jvC9YtQu0W-ehU2v3Z0",
    authDomain: "fir-iftask.firebaseapp.com",
    projectId: "fir-iftask",
    storageBucket: "fir-iftask.appspot.com",
    messagingSenderId: "59114433203",
    appId: "1:59114433203:web:62f533029b0f9151ae1ec6"
}

// Inicializa o Firebase se ainda não estiver inicializado
if (firebase?.apps?.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

// Obtém a instância do Firestore
let db = getFirestore(firebase.initializeApp(firebaseConfig))

// Exporta a instância do Firestore
export default db
