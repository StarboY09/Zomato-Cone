import joi from "joi";

export const ValidateID = (id) => {
  const Schema = joi.object({
    _id: joi.string().required(),
  });

  return Schema.validateAsync(id);
};

export const ValidateCategory = (category) => {
  const Schema = joi.object({
    category: joi.string().required(),
  });

  return Schema.validateAsync(category);
};
