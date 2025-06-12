const { z } = require('zod');

const MAX_LIMIT = 100;
const MAX_OFFSET = 10000;

const ADDRESS_MAX_LENGTH = 512;
const DELIVERY_INSTRUCTIONS_MAX_LENGTH = 512;

const createOrderSchema = z.object({
  body: z.object({
    cart: z.array(
      z.object({
        productId: z.string().uuid(),
        quantity: z.coerce
          .number()
          .int({ message: 'quantity must be an integer' })
          .min(1, { message: 'quantity cant be less than 1' }),
      })
    ),
    address: z.string().max(ADDRESS_MAX_LENGTH, {
      message: `address length cannot be greater than ${ADDRESS_MAX_LENGTH}`,
    }),
    deliveryInstructions: z
      .string()
      .max(DELIVERY_INSTRUCTIONS_MAX_LENGTH, {
        message: `address length cannot be greater than ${DELIVERY_INSTRUCTIONS_MAX_LENGTH}`,
      })
      .optional(),
  }),
});

const getCustomerOrderSchema = z.object({
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

module.exports = { createOrderSchema, getCustomerOrderSchema };
