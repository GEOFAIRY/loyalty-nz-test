// Kyran Stagg 28/11/2021
// program to validate flybuys card number via cli

import { CardController } from "./src/controllers/card"

function main() {
    const cardController:CardController = new CardController()
    cardController.start()
}

main()