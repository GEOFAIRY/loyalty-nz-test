const express = require('express');
const bodyParser = require('body-parser')

module.exports = function () {
    // INITIALISE EXPRESS //
    const app = express();

    app.use(bodyParser.json())

    app.use((req: { method: any; path: any; }, res: any, next: () => void) => {
        console.log(`##### ${req.method} ${req.path} #####`);
        next();
    });
    app.rootUrl = '/api/v1';

    // ROUTES //
    require('../routes/card')(app);

    return app;
};