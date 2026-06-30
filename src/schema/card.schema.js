import z from "zod";

export const CardSchema = z.object({
    id: z.uuidv4().optional(),
    idProduct: z.number(),
    idCategory: z.number(),
    avg: z.number().optional().nullable(),
    low: z.number().optional().nullable(),
    trend: z.number().optional().nullable(),
    avg1: z.number().optional().nullable(),
    avg7: z.number().optional().nullable(),
    avg30: z.number().optional().nullable(),
    "avg-foil": z.number().optional().nullable(),
    "low-foil": z.number().optional().nullable(),
    "trend-foil": z.number().optional().nullable(),
    "avg1-foil": z.number().optional().nullable(),
    "avg7-foil": z.number().optional().nullable(),
    "avg30-foil": z.number().optional().nullable(),
});


export const getCardsQuery = z.object({
    limit: z.coerce.number().min(0),
    page:  z.coerce.number().min(0),
})