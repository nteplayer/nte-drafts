const firebaseConfig = {
    apiKey: "AIzaSyAa_zvBCLyFZKccIMtUfRs_2Tx__JXcTP4",
    authDomain: "nte-tournaments-7b0e3.firebaseapp.com",
    databaseURL: "https://nte-tournaments-7b0e3-default-rtdb.firebaseio.com", // Ссылка на твою будущую БД
    projectId: "nte-tournaments-7b0e3",
    storageBucket: "nte-tournaments-7b0e3.firebasestorage.app",
    messagingSenderId: "1022034023092",
    appId: "1:1022034023092:web:d269068348b24abed93de1"
};

// Инициализация (это уже есть в твоем файле js/app.js)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();
