# loyalty-nz-test

## API SPEC:

card#create 
Creates and validates a new flybuys card for the database
url: POST /api/v1/card request body: {"cardNumber": string, "balance": number}
return: 200 if created successfully

card#getCard
Gets information about a given card
url: GET /api/v1/card request query parameters: cardNumber
return: cardNumber, type, balance

card#updateBalance
Updates a given cards balance with a given balance
url: PATCH /api/v1/card request body: {"cardNumber": string, "balance": number}
return: 200 if updated successfully

## Models used:

Card {
  cardNumber: string;
  valid: boolean;
  type: string;
  balance: number;
}

## Tables
```
CREATE TABLE IF NOT EXISTS `flybuys`.`card` (
  `cardNumber` VARCHAR(17) NOT NULL,
  `balance` INT NOT NULL,
  `type` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`cardNumber`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
```

note: .env files should not be uploaded, this one is an example to show formatting.
