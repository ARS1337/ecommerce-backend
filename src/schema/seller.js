const { z } = require('zod');

const USERNAME_MAX_LENGTH = 50;
const PASSWORD_MAX_LENGTH = 50;

const USERNAME_MIN_LENGTH = 4;
const PASSWORD_MIN_LENGTH = 8;

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

module.exports = { logInSchema };
