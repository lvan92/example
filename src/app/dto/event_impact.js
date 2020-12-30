const createEventImpactDTO = (impact, eventId) => {
    let result = [];
    if (impact.length > 0) {
        impact.map(item => {
            let eventImpactData = {
                impact_id: item.impact_id,
                event_id: eventId,
                default_impact: item.default_impact
            };
            result.push(eventImpactData);
        });
    }

    return result;
};

const updateEventImpactDTO = (impact) => {
    let result = [];
    if (impact !== undefined) {
        impact.map(item => {
            let eventImpactData = {
                impact_id: item.impact_id !== undefined ? item.impact_id : null,
                default_impact: item.default_impact !== undefined ? item.default_impact : null
            };
            result.push(eventImpactData);
        });
    }

    return result;
};

module.exports = {
    createEventImpactDTO,
    updateEventImpactDTO,
};