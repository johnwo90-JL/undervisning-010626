import { Router } from "express";
import { CardModel } from "../models/card.model.js";
import { getCardsQuery } from "../schema/card.schema.js";

export const cardsRouter = Router();


/**
 * 
 * @param {typeof CardModel} dataModel Datamodell vi ønsker å bruke
 * @param {number} limit Maks antall vi ønsker å hente ut
 * @param {number} page Hvilken "side" vi ønsker å hente ut
 */
async function paginate(url, where, order, dataModel, limit, page) {
    if (page<0) throw new Error("Paginate argument `page` must be > 0!");

    const data = await dataModel.findAndCountAll({
        where,
        order,
        limit,
        offset: limit * page
    });

    const totalPages = Math.ceil(data.count / limit) - 1;

    const result = {
        metadata: {
            totalEntries: data.count,
            totalPages,

            count: data.rows.length,
            
            _this: url,
            _next: page < totalPages ? url.replace(/page=\d+/gi, `page=${page+1}`) : null,
            _prev: page > 0 ? url.replace(/page=\d+/gi, `page=${page-1}`) : null,
        },
        data: data.rows
    }

    return result;
}


// `/`
async function getCards(req, res) {
    const query = await getCardsQuery.parseAsync(req.query);

    return res.json(await paginate(req.originalUrl, {}, [], CardModel, query.limit, query.page));
}

// `/top`
async function getCardsSortedByValue(req, res) {
    const query = await getCardsQuery.parseAsync(req.query);

    return res.json(await paginate(req.originalUrl, {}, [
        ["avg", "DESC"]
    ], CardModel, query.limit, query.page));
}

cardsRouter.get("/", getCards);
cardsRouter.get("/top", getCardsSortedByValue);