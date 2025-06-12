const { z } = require('zod');

const MAX_LIMIT = 100;
const MAX_OFFSET = 10000;

const PRODUCT_NAME_MAX_LENGTH = 255;
const PRODUCT_DESCRIPTION_MAX_LENGTH = 512;
const PRODUCT_RATING_MAX = 5;
const PRODUCT_TAGS_MAX_LENGTH = 255;

const getAllProductSchema = z.object({
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
    priceGT: z.coerce
      .number()
      .nonnegative({ message: 'priceGT cannot be negative' })
      .optional(),
    priceLT: z.coerce
      .number()
      .nonnegative({ message: 'priceLT cannot be negative' })
      .optional(),
    category: z.string().optional(),
    tags: z.string().optional(),
  }),
});

const searchProductSchema = z.object({
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
    priceGT: z.coerce
      .number()
      .nonnegative({ message: 'priceGT cannot be negative' })
      .optional(),
    priceLT: z.coerce
      .number()
      .nonnegative({ message: 'priceLT cannot be negative' })
      .optional(),
    category: z.string().optional(),
    tags: z.string().optional(),
    search: z.string().optional(),
  }),
});

const getProductByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

const addProductSchema = z.object({
  body: z.object({
    name: z.string().max(PRODUCT_NAME_MAX_LENGTH, {
      message: `product name length cannot be greater than ${PRODUCT_NAME_MAX_LENGTH}`,
    }),
    description: z.string().max(PRODUCT_DESCRIPTION_MAX_LENGTH, {
      message: `product description length cannot be greater than ${PRODUCT_DESCRIPTION_MAX_LENGTH}`,
    }),
    image: z
      .string()
      .url({
        message: 'Invalid URL format',
      })
      .optional(),
    extraImages: z
      .array(
        z.string().url({
          message: 'Invalid URL format',
        })
      )
      .optional(),
    price: z.coerce
      .number()
      .nonnegative({ message: 'price cannot be negative' }),
    discountedPrice: z.coerce
      .number()
      .nonnegative({ message: 'discountedPrice cannot be negative' })
      .optional(),
    rating: z.coerce
      .number()
      .nonnegative({ message: 'rating cannot be negative' })
      .max(PRODUCT_RATING_MAX, {
        message: `rating cannot be greater than ${PRODUCT_RATING_MAX}`,
      })
      .optional(),
    tags: z
      .array(
        z.string().max(PRODUCT_TAGS_MAX_LENGTH, {
          message: `tags cannot have a length greater than ${PRODUCT_TAGS_MAX_LENGTH}`,
        })
      )
      .optional(),
    categoryId: z.string().uuid(),
  }),
});

const editProductSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    name: z
      .string()
      .max(PRODUCT_NAME_MAX_LENGTH, {
        message: `product name length cannot be greater than ${PRODUCT_NAME_MAX_LENGTH}`,
      })
      .optional(),
    description: z
      .string()
      .max(PRODUCT_DESCRIPTION_MAX_LENGTH, {
        message: `product description length cannot be greater than ${PRODUCT_DESCRIPTION_MAX_LENGTH}`,
      })
      .optional(),
    image: z
      .string()
      .url({
        message: 'Invalid URL format',
      })
      .optional(),
    extraImages: z
      .array(
        z.string().url({
          message: 'Invalid URL format',
        })
      )
      .optional(),
    price: z.coerce
      .number()
      .nonnegative({ message: 'price cannot be negative' })
      .optional(),
    discountedPrice: z.coerce
      .number()
      .nonnegative({ message: 'discountedPrice cannot be negative' })
      .optional(),
    rating: z.coerce
      .number()
      .nonnegative({ message: 'rating cannot be negative' })
      .max(PRODUCT_RATING_MAX, {
        message: `rating cannot be greater than ${PRODUCT_RATING_MAX}`,
      })
      .optional(),
    tags: z
      .array(
        z.string().max(PRODUCT_TAGS_MAX_LENGTH, {
          message: `tags cannot have a length greater than ${PRODUCT_TAGS_MAX_LENGTH}`,
        })
      )
      .optional(),
    categoryId: z.string().uuid().optional(),
  }),
});

const deleteProductByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

const getProductBySellerSchema = z.object({
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

module.exports = {
  getAllProductSchema,
  searchProductSchema,
  getProductByIdSchema,
  addProductSchema,
  editProductSchema,
  deleteProductByIdSchema,
  getProductBySellerSchema,
};
