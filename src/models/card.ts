export class CardModel {
    cardNumber: string;
    valid: boolean;
    type: string;

    constructor(cardNumber: string) {
        this.cardNumber = cardNumber;
        this.valid = this.checkValid();
        this.type = this.checkType();
    }

    checkValid(): boolean {
        // break down by digit
        var numberArray: string[] = this.cardNumber.split("");
        let total: number = 0;

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
            return "Fly Buys Blue"
        }
        return "Unknown";
    }
}
