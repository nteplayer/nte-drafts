// Конфигурация Firebase — Сюда нужно вставить твои данные из Firebase Console!
const firebaseConfig = {
    apiKey: "AIzaSyAa_zvBCLyFZKcclMtUfRs_2Tx__JXcTP4",
    authDomain: "nte-tournaments-7b0e3.firebaseapp.com",
    databaseURL: "https://nte-tournaments-7b0e3-default-rtdb.firebaseio.com",
    projectId: "nte-tournaments-7b0e3",
    storageBucket: "nte-tournaments-7b0e3.appspot.com",
    messagingSenderId: "1022034023092",
    appId: "1:1022034023092:web:d269068348b24abed93de1"
};

// Инициализация Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.database();

// Общая функция для выхода из аккаунта
function logout() {
    auth.signOut().then(() => {
        window.location.href = 'index.html';
    }).catch((error) => {
        alert(error.message);
    });
}
