import Joi, { ObjectSchema } from "joi";

// Define the correct shape of a Favorites object received in JSON
export const favoriteSchema: ObjectSchema = Joi.object({
  romId: Joi.number().integer().required().messages({
    "any.required": "romId is required to toggle a favorite",
    "number.base": "romId must be a number",
    "number.integer": "romId must be a whole number"
  })
});