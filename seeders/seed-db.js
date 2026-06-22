import prices from "./price-guide.seed-data.json" with {type: "json"};
import cardInfo from "./card-info.seed-data.json" with {type: "json"};

import { CardSchema } from "../src/schema/card.schema.js"
import { CardModel } from "../src/models/card.model.js";
import { db } from "../src/providers/db.provider.js";
import { UserAccessLevel, UserModel } from "../src/models/user.model.js";
import { RefreshTokenModel } from "../src/models/refresh-token.model.js";

await db.sync();

await UserModel.create({
    email: "foo@bar.com",
    password: "test1234",
    role: UserAccessLevel.ADMIN,
    lastLogin: Date.now(),
});

for (const price of prices.priceGuides) {
    const result = CardSchema.safeParse(price);
    if (!result.success) {
        console.log(`Entry validation failed with error: ${result.error}`);
        process.exit(1)
    }
}

for (const card of cardInfo.products) {
    const result = CardSchema.safeParse(card);
    if (!result.success) {
        console.log(`Entry validation failed with error: ${result.error}`);
        process.exit(1)
    }
}

function addCard(priceElement) {
    const { idProduct, idCategory } = priceElement;

    if (idProduct === undefined) {
        console.error("(Add card) Failed on:");
        console.log(priceElement);
        process.exit(1);
    }

    const card = {
        ...priceElement,
        ...cardInfo.products.find(e => e.idProduct === idProduct),
    };

    return card;
}

const cards = prices.priceGuides.map((e, i) => addCard(e));
CardModel.bulkCreate(cards);

// cards.forEach(async e => {
//     if (e.idProduct === undefined) {
//         console.error("Failed on:");
//         console.log(e);
//         process.exit(1);
//     }
//     // console.log(`Creating entry with idProduct ${e.idProduct}`);
//     await CardModel.create(e);
// });
