const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_ID",
    appId: "YOUR_APP_ID"
};

// Инициализация
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// Список администраторов, имеющих право создавать косты (Пункт 4)
// Можно редактировать прямо здесь или настроить чтение из БД
const ADMIN_NICKNAMES = ["AdminNick", "TournamentHost", "Player1"]; 

function handleSignUp() {
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const username = document.getElementById('auth-username').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Проверяем, есть ли ник в списке создателей костов
            const isCostMaker = ADMIN_NICKNAMES.includes(username);
            
            db.ref('users/' + user.uid).set({
                username: username,
                email: email,
                isCostMaker: isCostMaker
            });
            alert('Registered successfully!');
            window.location.href = 'dashboard.html';
        })
        .catch(error => alert(error.message));
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
