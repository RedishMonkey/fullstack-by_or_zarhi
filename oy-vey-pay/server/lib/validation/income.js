const { z } = require('zod');
const { userIdValidation } = require('./user');

const incomeIdValidation = z.string().regex(/^[0-9a-fA-F]{24}/, {
    message: 'Invalid income id'
});

const incomeSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    amount: z.number().positive(),
    tag: z.enum(['salary', 'bonus', 'gift', 'other']),
    currency: z.enum(['ILS', 'USD', 'EUR']),
})

module.exports = {
    incomeIdValidation,
    incomeSchema,
}