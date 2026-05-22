db.ref('costSystems').on('value', snapshot => {
    const systems = snapshot.val() || {};
    const select = document.getElementById('draft-system-select');
    if(select) {
        select.innerHTML = '';
        for (let key in systems) {
            select.innerHTML += `<option value="${key}">${systems[key].name}</option>`;
        }
    }
});

function searchPlayerRosters(playerNum) {
    const nick = document.getElementById(`p${playerNum}-nick`).value.trim();
    const currentSys = document.getElementById('draft-system-select').value;
    const select = document.getElementById(`p${playerNum}-rosters-select`);
    
    if(!nick) return alert('Enter nickname');
    select.innerHTML = '<option>Searching...</option>';

    db.ref('users').once('value').then(snapshot => {
        let userKey = null;
        snapshot.forEach(child => {
            if(child.val().username === nick) userKey = child.key;
        });

        if(!userKey) {
            alert('User not found!');
            select.innerHTML = '<option>No rosters</option>';
            return;
        }

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

function startBO2() {
    const p1 = document.getElementById('p1-nick').value;
    const p2 = document.getElementById('p2-nick').value;
    
    if(!p1 || !p2) return alert('Load both players first.');

    document.getElementById('match-log').innerHTML = "🟢 BO2 Match Active!<br>Game 1: Player 1 has First Pick (FP)<br>Game 2: Player 2 has First Pick (FP)";
    
    document.getElementById('p1-fp').innerText = "Game 1: FP";
    document.getElementById('p2-fp').innerText = "Game 2: FP";
}
