async function checkAdminStatus(user) {
    const doc = await db.collection("permissions").doc(user.displayName).get();
    if (doc.exists && (doc.data().role === 'admin' || doc.data().role === 'cost_maker')) {
        document.getElementById('admin-panel').classList.remove('hidden');
    }
}

function createDraftSystem(settings) {
    // Logic for Point 5: custom draft rules
    const draftConfig = {
        bans: settings.bans || 2,
        picks: settings.picks || 4,
        costLimit: settings.costLimit || 50
    };
    console.log("Draft system created:", draftConfig);
}
