const cards = require('../controllers/card')

module.exports = function (app:any) {
    app.route(app.rootUrl + '/card')
        .get(cards.viewCard)
        .patch(cards.addBalance)
        .post(cards.createCards)
}