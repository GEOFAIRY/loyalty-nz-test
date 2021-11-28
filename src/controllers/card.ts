import { CardView } from "../views/card";
import { CardModel } from "../models/card";

export class CardController {
    static cards?: Array<CardModel> = new Array();
    static cardView: CardView = new CardView();

    start(): void {
        CardController.cardView.start();
    }

    static createCards(input: string[]) {
        let cardsArray = this.cards;
        input.forEach((cardNumber) => {
            cardsArray?.push(new CardModel(cardNumber.replace(/\s/g, "")));
        });
    }

    static viewCards() {
        CardController.cardView.printInfo(CardController.cards);
    }
}
