const createSessionImpactDTO = (impact, sessionId) => {
    let result = [];
    if (impact.length > 0) {
        impact.map(item => {
            let eventImpactData = {
                impact_id: item.impact_id,
                session_id: sessionId,
                default_impact: item.default_impact
            };
            result.push(eventImpactData);
        });
    }

    return result;
};

module.exports = {
    createSessionImpactDTO,
}