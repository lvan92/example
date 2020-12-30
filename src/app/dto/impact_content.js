const createImpactContentDTO = (impactReq, impactId) => {
    return {
        impact_id: impactId,
        language_id: impactReq.language_id,
        category_id: impactReq.category_id ,
        impact_name: impactReq.impact_name,
        impact_description: impactReq.impact_description,
        impact_achieve: impactReq.impact_achieve,
    }
};

const updateImpactContentDTO = (impact, impactReq) => {    
    return {
        language_id: impactReq.language_id !== undefined ? impactReq.language_id : impact.language_id,
        category_id: impactReq.category_id !== undefined ? impactReq.category_id : impact.category_id,
        impact_name: impactReq.impact_name !== undefined ? impactReq.impact_name : impact.impact_name,
        impact_description: impactReq.impact_description !== undefined ? impactReq.impact_description : impact.impact_description,
        impact_achieve: impactReq.impact_achieve !== undefined ? impactReq.impact_achieve : impact.impact_achieve,
        ispublish: impactReq.ispublish !== undefined ? impactReq.ispublish : impact.ispublish
    }
};

module.exports = {
    createImpactContentDTO,
    updateImpactContentDTO
}