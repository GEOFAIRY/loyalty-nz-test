import { CardController } from "../controllers/card";

import * as readline from "readline";
import { CardModel } from "../models/card";

// class to handle card input/output
export class CardView {
    input: string[];
    rl: readline.ReadLine;

    constructor() {
        this.input = [];

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

    start(): void {
        console.log(
            "Input flybuys card number(s) on one line each. Leave a blank line to get results:\n"
        );
        this.rl.prompt();

        this.rl.on("line", (cmd: string) => {
            if (cmd === "" || cmd === "done") {
                CardController.createCards(this.input);
                CardController.viewCards();
                process.exit(0);
            }
            this.input.push(cmd);
        });

        this.rl.on("close", function (cmd: string) {
            process.exit(0);
        });
    }

    printInfo(cards?: CardModel[]): void {
        if (typeof cards !== "undefined") {
            cards.forEach((card) => {
                console.log(
                    `${card.type}: ${card.cardNumber} (${
                        card.valid ? "valid" : "invalid"
                    })`
                );
            });
        }
    }
}
