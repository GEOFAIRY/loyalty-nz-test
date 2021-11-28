import { CardModel } from "../models/card";

exports.createCards = async function (req: any, res: any) {
    try {
        new CardModel(req.body.cardNumber.replace(/\s/g, ""), req.body.balance, function() {
            res.status(200).send()
        });
        res.send()
    } catch (err: any) {
        if (err.name === "InvalidCard") {
            res.statusMessage = "Invalid Card";
            res.status(400).send();
        } else {
            res.statusMessage = "Internal Server Error";
            res.status(500).send();
        }
    }
};

exports.viewCard = async function (req: any, res: any) {
    try {
        await CardModel.getCards(req.query.cardNumber, function (data:any) {
            res.send(data);
        });
    } catch (err: any) {
        if (err.name === "NotFound") {
            res.status(404).send();
        } else {
            res.statusMessage = "Internal Server Error";
            res.status(500).send();
        }
    }
};

exports.addBalance = async function (req: any, res: any) {
    try {
        await CardModel.addBalance(req.body.balance, req.body.cardNumber, function() {
            res.status(200).send()
        });
    } catch (err: any) {
        if (err.name === "NotFound") {
            res.status(404).send();
        } else {
            res.statusMessage = "Internal Server Error";
            res.status(500).send();
        }
    }
};