const siteRouter = require('./site');
const apiProduct = require('./products');

function routes(app) {
    app.use('/api', apiProduct);
    app.use('/', siteRouter);
}

module.exports = routes;
