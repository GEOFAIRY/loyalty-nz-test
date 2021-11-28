import { AnyRecord } from "dns";

const db = require("../resources/db");

export class CardModel {
    cardNumber: string;
    valid: boolean;
    type: string;
    balance: number;

    constructor(cardNumber: string, balance: number, callback: any) {
        this.cardNumber = cardNumber;
        this.type = this.checkType();
        this.valid = this.checkValid();
        this.balance = balance;

        if (this.valid) {
            this.commitCard(callback);
        } else {
            throw {
                name: "InvalidCard",
                message: "Invalid Card given",
            };
        }
    }

    checkValid(): boolean {
        // break down by digit
        var numberArray: string[] = this.cardNumber.split("");
        let total: number = 0;

        if (this.type === "Unknown") {
            return false;
        }

        if (numberArray.length !== 16) {
            if (numberArray.length !== 17) {
                return false;
            }
        }

        // double every second from end of string
        for (var i = numberArray.length - 2; 0 <= i; i -= 2) {
            numberArray[i] = (+numberArray[i] * 2).toString();

            // if result is double digits, split down
            if (+numberArray[i] >= 10) {
                var tempNumbers = numberArray[i].split("");
                numberArray[i] = tempNumbers[0];
                numberArray.push(tempNumbers[1]);
            }
        }

        numberArray.forEach((i) => {
            total += parseInt(i);
        });
        if (total % 10 !== 0) {
            return false;
        }

        return true;
    }

    checkType(): string {
        if (/^60141\d{11,12}$/.test(this.cardNumber)) {
            return "Fly Buys Black";
        } else if (/^6014352\d{9}$/.test(this.cardNumber)) {
            return "Fly Buys Red";
        } else if (
            BigInt(this.cardNumber) >= 6014355526000000 &&
            BigInt(this.cardNumber) <= 6014355529999999
        ) {
            return "Fly Buys Green";
        } else if (/^6014\d{12}$/.test(this.cardNumber)) {
            return "Fly Buys Blue";
        }
        return "Unknown";
    }

    async commitCard(callback: any) {
        const insertSql =
            "INSERT INTO CARD (cardNumber, type, balance) VALUES (?, ?, ?)";
        const data = [this.cardNumber, this.type, this.balance];

        await db.getPool().then(function (p: any) {
            p.query(insertSql, data, function (err: any, res: any) {
                if (err) throw err;
                callback();
            });
        });
    }

    static async getCards(cardNumber: string, callback: any) {
        const insertSql = "SELECT * FROM card WHERE (cardNumber = ?)";
        const data = [cardNumber];

        await db.getPool().then(async function (p: any) {
            await p.query(insertSql, data, function (err: any, res: any) {
                if (err) throw err;
                let card = res[0];
                if (card) {
                    callback({
                        cardNumber: card.cardNumber,
                        type: card.type,
                        balance: card.balance,
                    });
                } else {
                    throw {
                        name: "NotFound",
                        message: "Card Not Found",
                    };
                }
            });
        });
    }

    static async addBalance(balance: number, cardNumber: string, callback:any) {
        const insertSql = "UPDATE card SET Balance = ? WHERE cardNumber = ?";
        const data = [balance, cardNumber];

        await db.getPool().then(async function (p: any) {
            await p.query(insertSql, data, function (err: any, res: any) {
                if (err) throw err;
                callback();
            });
        });
    }
}
