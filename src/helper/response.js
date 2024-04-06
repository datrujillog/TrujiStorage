import { response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const errorResponse = (res = response, error) => {
  if (error.hasOwnProperty("code") || error.hasOwnProperty("errors")) {
    if (error.code === "P2002") {
      return res.status(400).json({
        ok: false,
        errors: Object.keys(error.meta.target).map((field) => ({
          message: `The ${field} ${error.meta.target[field]} is already in use`,
          field,
        })),
      });
    }
    if (error.code === "P2025") {
      return res.status(400).json({
        ok: false,
        errors: [{ message: error.message || error.errors }],
      });
    }

    return res.status(400).json({
      ok: false,
      errors: [{ message: error.message || error.errors }],
    });
  }
  return res.status(500).json({
    ok: false,
    errors: [{ message: error.message || error }],
  });
};

const authResponse = async (res = response, status, ok, message, data) => {
  const { payload, token } = data;
  let exp;
  try {
    exp = jwt.verify(data.token.token, config.jwtSecret).exp;
  } catch (error) {
    return errorResponse(res, error);
  }

  return res.status(status).json({ ok, message, payload, token, exp });
};

const Responsee = async (res = response, status, ok, message, data) => {
  try {
    const { payload, token } = data;
    return res.status(status).json({ ok, message, payload, token });
  } catch (error) {
    return errorResponse(res, error);
  }
};

export { errorResponse, authResponse, Responsee };
