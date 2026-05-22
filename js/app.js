// Сюда вставляешь ТОЛЬКО блок конфигурации из Project Settings
const firebaseConfig = {
    apiKey: "AIzaSyAa_zvBCLyFZKcclMtUfRs_2Tx__JXcTP4",
    authDomain: "nte-tournaments-7b0e3.firebaseapp.com",
    databaseURL: "https://nte-tournaments-7b0e3-default-rtdb.firebaseio.com",
    projectId: "nte-tournaments-7b0e3",
    storageBucket: "nte-tournaments-7b0e3.firebasestorage.app",
    messagingSenderId: "1022034023092",
    appId: "1:1022034023092:web:d269068348b24abed93de1"
};

// Инициализация строго в старом стиле v8 для работы в браузере:
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// Список никнеймов с админ-правами (Пункт 4)
const ADMIN_NICKNAMES = ["AdminNick", "Dmitriy", "HostNTE"]; 

function handleSignUp() {
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const username = document.getElementById('auth-username').value.trim();

    if(!email || !password || !username) return alert('Please fill all fields');

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const isCostMaker = ADMIN_NICKNAMES.includes(username);
            
            db.ref('users/' + user.uid).set({
                username: username,
                email: email,
                isCostMaker: isCostMaker
            }).then(() => {
                alert('Account created successfully!');
                window.location.href = 'dashboard.html';
            });
        })
        .catch(error => alert(error.message)); // Если что-то не так, покажет окно с ошибкой
}

function handleLogin() {
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = 'dashboard.html';
        })
        .catch(error => alert(error.message));
}
