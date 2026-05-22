// Загрузка систем костов для драфта
db.ref('costSystems').on('value', snapshot => {
    const systems = snapshot.val() || {};
    const select = document.getElementById('draft-system-select');
    select.innerHTML = '';
    for (let key in systems) {
        select.innerHTML += `<option value="${key}">${systems[key].name}</option>`;
    }
});

// Поиск ростеров игрока по никнейму (Пункт 7)
function searchPlayerRosters(playerNum) {
    const nick = document.getElementById(`p` + playerNum + `-nick`).value.trim();
    const currentSys = document.getElementById('draft-system-select').value;
    const select = document.getElementById(`p` + playerNum + `-rosters-select`);
    select.innerHTML = '<option>Loading...</option>';

    // Ищем пользователя с таким никнеймом
    db.ref('users').once('value').then(snapshot => {
        let userKey = null;
        snapshot.forEach(child => {
            if(child.val().username === nick) userKey = child.key;
        });

        if(!userKey) {
            alert('Player not found!');
            select.innerHTML = '<option>No rosters</option>';
            return;
        }

        // Загружаем ростеры этого пользователя для выбранной системы костов
        db.ref('rosters/' + userKey).once('value').then(rosterSnap => {
            select.innerHTML = '';
            let hasRosters = false;
            rosterSnap.forEach(r => {
                const data = r.val();
                if(data.systemId === currentSys) {
                    hasRosters = true;
                    select.innerHTML += `<option value="${r.key}">${data.name} (Cost: ${data.totalCost})</option>`;
                }
            });
            if(!hasRosters) select.innerHTML = '<option>No rosters for this system</option>';
        });
    });
}

// Логика BO2 и First Pick (FP)
function startBO2() {
    const p1 = document.getElementById('p1-nick').value;
    const p2 = document.getElementById('p2-nick').value;
    
    if(!p1 || !p2) return alert('Please load both players first.');

    // Смена FP в зависимости от карты/матча в рамках BO2
    document.getElementById('match-log').innerHTML = "🟢 BO2 Match Started!<br>Game 1: Player 1 has First Pick (FP).<br>Game 2: Player 2 has First Pick (FP).";
    
    document.getElementById('p1-fp').innerText = "Game 1: FIRST PICK (FP)";
    document.getElementById('p2-fp').innerText = "Game 2: FIRST PICK (FP)";
}
