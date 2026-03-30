import Joi, { ObjectSchema } from 'joi';

export const getItemListSchema: ObjectSchema = Joi.object({
  page: Joi.string().required().messages({
    'any.required': 'Page must contain at least one ROM',
    'string.empty': 'Page cannot be empty',
  }),
});

export const addItemListSchema: ObjectSchema = Joi.object({
  page: Joi.string().required().messages({
    'any.required': 'Page must contain at least one ROM',
    'string.empty': 'Page cannot be empty',
  }),
  title: Joi.string().required().messages({
    'any.required': 'Title is required',
    'string.empty': 'Title cannot be empty',
  }),
});

export const deleteItemListSchema: ObjectSchema = Joi.object({
  page: Joi.string().required().messages({
    'any.required': 'Page must contain at least one ROM',
    'string.empty': 'Page cannot be empty',
  }),
  title: Joi.string().required().messages({
    'any.required': 'Title is required',
    'string.empty': 'Title cannot be empty',
  }),
});

export const clearItemListSchema: ObjectSchema = Joi.object({
  page: Joi.string().required().messages({
    'any.required': 'Page must contain at least one ROM',
    'string.empty': 'Page cannot be empty',
  }),
});
