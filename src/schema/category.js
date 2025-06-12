const { z } = require('zod');

const MAX_LIMIT = 100;
const MAX_OFFSET = 10000;

const getCategoriesSchema = z.object({
  query: z.object({
    limit: z.coerce
      .number()
      .int({ message: 'Limit must be an integer' })
      .nonnegative({ message: 'Limit cannot be negative' })
      .max(MAX_LIMIT, { message: `Limit cannot exceed ${MAX_LIMIT}` })
      .optional(),
    offset: z.coerce
      .number()
      .int({ message: 'Offset must be an integer' })
      .nonnegative({ message: 'Offset cannot be negative' })
      .max(MAX_OFFSET, { message: `Offset cannot exceed ${MAX_OFFSET}` })
      .optional(),
  }),
});

module.exports = { getCategoriesSchema };
