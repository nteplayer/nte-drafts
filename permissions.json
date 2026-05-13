// Check if user has "Cost Maker" rights
async function checkPermissions(userEmail) {
    const doc = await db.collection('permissions').doc(userEmail).get();
    if (doc.exists && doc.data().role === 'cost_maker') {
        showAdminPanel();
    }
}
