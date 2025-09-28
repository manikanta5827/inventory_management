import { z } from 'zod';

export const inventorySchema = z.object({
    amount: z.coerce.number({ message: 'amount is required'})
            .int()
            .positive('amount should be more than 0')
})