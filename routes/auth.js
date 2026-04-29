const router = require("express").Router;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

router.post("/signup", async (req, res) => {
  const requiredBody = z.object({
    username: z.string().min(4).max(12),
    password: z
      .string()
      .min(4)
      .max(20)
      .regex(/[A-Z]/, "password must contain a upper case letter")
      .regex(/[a-z]/, "password must contain a lower case letter")
      .regex(/[!@#$%^&*()<>?:]/, "password must contain a special letter"),
  });
});

