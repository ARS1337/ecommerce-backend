const { z } = require('zod');

const NAME_MAX_LENGTH = 50;
const USERNAME_MAX_LENGTH = 50;
const PASSWORD_MAX_LENGTH = 50;
const DETAILS_MAX_LENGTH = 255;

const NAME_MIN_LENGTH = 4;
const USERNAME_MIN_LENGTH = 4;
const PASSWORD_MIN_LENGTH = 8;

const signUpSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(NAME_MIN_LENGTH, {
        message: `name must be atleast ${NAME_MIN_LENGTH} characters long`,
      })
      .max(NAME_MAX_LENGTH, {
        message: `name cannot be greater than ${NAME_MAX_LENGTH} characters`,
      }),
    userName: z
      .string()
      .min(USERNAME_MIN_LENGTH, {
        message: `userName must be atleast ${USERNAME_MIN_LENGTH} characters long`,
      })
      .max(USERNAME_MAX_LENGTH, {
        message: `userName cannot be greater than ${USERNAME_MAX_LENGTH} characters`,
      }),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, {
        message: `name must be atleast ${PASSWORD_MIN_LENGTH} characters long`,
      })
      .max(PASSWORD_MAX_LENGTH, {
        message: `name cannot be greater than ${PASSWORD_MAX_LENGTH} characters`,
      }),
  }),
});

const logInSchema = z.object({
  body: z.object({
    userName: z
      .string()
      .min(USERNAME_MIN_LENGTH, {
        message: `userName must be atleast ${USERNAME_MIN_LENGTH} characters long`,
      })
      .max(USERNAME_MAX_LENGTH, {
        message: `userName cannot be greater than ${USERNAME_MAX_LENGTH} characters`,
      }),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, {
        message: `name must be atleast ${PASSWORD_MIN_LENGTH} characters long`,
      })
      .max(PASSWORD_MAX_LENGTH, {
        message: `name cannot be greater than ${PASSWORD_MAX_LENGTH} characters`,
      }),
  }),
});

const setDetailsSchema = z.object({
  body: z.object({
    details: z.string().max(DETAILS_MAX_LENGTH, {
      message: `details cannot be greater than ${DETAILS_MAX_LENGTH} characters`,
    }),
  }),
});

module.exports = { signUpSchema, logInSchema, setDetailsSchema };
