const categoryRoutes = require('./category.js');
const authRoutes = require('./auth');
const eventRoutes = require('./event');
const eventGroupRoutes = require('./eventGroup');
const tribeRoutes = require('./tribe');
const impactRoutes = require('./impact');
const countryRoutes = require('./country');
const sessionRoutes = require('./session');
const sponsorRoutes = require('./sponsor');
const soundRoutes = require('./sound');
const videoRoutes = require('./video');
const eventImpactRoutes = require('./eventImpact');
const eventContentRoutes = require('./eventContent');
const eventCountryRoutes = require('./eventCountry');
const sessionImpactRoutes = require('./sessionImpact');

const init = (app) => {
    app.use(categoryRoutes);
    app.use(eventRoutes);
    app.use(authRoutes);
    app.use(eventGroupRoutes);
    app.use(tribeRoutes);
    app.use(impactRoutes);
    app.use(countryRoutes);
    app.use(sessionRoutes);
    app.use(sponsorRoutes);
    app.use(soundRoutes);
    app.use(videoRoutes);
    app.use(eventImpactRoutes);
    app.use(eventContentRoutes);
    app.use(eventCountryRoutes);
    app.use(sessionImpactRoutes);
}

module.exports = {
    init,
};