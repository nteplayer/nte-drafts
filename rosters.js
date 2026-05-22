let currentUser = null;
let currentSystems = {};

// Опции для 6 конст
const constOptions = [1, 2, 3, 4, 5, 6];
function populateSelects() {
    ['slot1', 'slot2', 'slot3'].forEach(id => {
        const el = document.getElementById(id);
        el.innerHTML = '';
        constOptions.forEach(c => el.innerHTML += `<option value="${c}">Constellation ${c}</option>`);
    });
}

auth.onAuthStateChanged(user => {
    if (user) {
        currentUser = user;
        populateSelects();
        
        // Проверка прав создателя костов (Пункт 4)
        db.ref('users/' + user.uid).once('value').then(snapshot => {
            const data = snapshot.val();
            document.getElementById('user-display').innerText = data.username;
            if (data.isCostMaker) {
                document.getElementById('cost-maker-panel').style.display = 'block';
            }
        });

        // Загрузка доступных систем костов
        db.ref('costSystems').on('value', snapshot => {
            currentSystems = snapshot.val() || {};
            const select = document.getElementById('select-cost-system');
            select.innerHTML = '';
            for (let key in currentSystems) {
                select.innerHTML += `<option value="${key}">${currentSystems[key].name}</option>`;
            }
            calculateRosterCost();
        });
    } else {
        window.location.href = 'index.html';
    }
});

function saveCostSystem() {
    const name = document.getElementById('system-name').value;
    if(!name) return alert('Enter system name');
    
    const sysId = db.ref('costSystems').push().key;
    db.ref('costSystems/' + sysId).set({
        name: name,
        creator: currentUser.uid,
        costs: {
            1: parseInt(document.getElementById('c1-cost').value),
            2: parseInt(document.getElementById('c2-cost').value),
            3: parseInt(document.getElementById('c3-cost').value),
            4: parseInt(document.getElementById('c4-cost').value),
            5: parseInt(document.getElementById('c5-cost').value),
            6: parseInt(document.getElementById('c6-cost').value)
        },
        synergy13: document.getElementById('synergy-1-3').checked
    });
    alert('System saved!');
}

function calculateRosterCost() {
    const sysId = document.getElementById('select-cost-system').value;
    if (!sysId || !currentSystems[sysId]) return;

    const system = currentSystems[sysId];
    const s1 = document.getElementById('slot1').value;
    const s2 = document.getElementById('slot2').value;
    const s3 = document.getElementById('slot3').value;

    let total = (system.costs[s1] || 0) + (system.costs[s2] || 0) + (system.costs[s3] || 0);

    // Логика связи конст / Синергия (Пункт 6)
    // Если выбрана 1 и 3 конста и создатель костов включил синергию:
    const selectedSlots = [s1, s2, s3];
    if (system.synergy13 && selectedSlots.includes("1") && selectedSlots.includes("3")) {
        total -= 2; // Например, снижаем кост за синергию
    }

    document.getElementById('total-cost-display').innerText = total;
    return total;
}

function saveRoster() {
    const name = document.getElementById('roster-name').value;
    const sysId = document.getElementById('select-cost-system').value;
    if(!name) return alert('Enter roster name');

    const s1 = document.getElementById('slot1').value;
    const s2 = document.getElementById('slot2').value;
    const s3 = document.getElementById('slot3').value;
    const cost = calculateRosterCost();

    db.ref('rosters/' + currentUser.uid).push({
        name: name,
        systemId: sysId,
        slots: [s1, s2, s3],
        totalCost: cost
    });
    alert('Roster saved successfully!');
}
