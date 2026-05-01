const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { userSchema } = require("../db/schema");

const SECRET = process.env.TOKEN;

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

  const parsedBody = requiredBody.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(400).json({
      error: parsedBody.error,
    });
  }

  const { username, password } = req.body;
  const existingUser = await userSchema.findOne({ username });
  if (existingUser) {
    return res.status(409).json({
      message: "username already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  try {
    await userSchema.create({
      username,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "signed up",
    });
  } catch (error) {
    return res.status(500).json({
      error: `error: ${error.message}`,
    });
  }
});

router.post("/signin", async (req, res) => {
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

  const parsedBody = requiredBody.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(409).json({
      error: parsedBody.error,
    });
  }

  const { username, password } = req.body;

  const existingUser = await userSchema.findOne({
    username,
  });
  if (!existingUser) {
    return res.status(404).json({
      error: "user not signed up",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password,
  );
  if (!isPasswordCorrect) {
    return res.status(401).json({
      error: "incorrect password",
    });
  }

  const token = jwt.sign(
    {
      username,
    },
    SECRET,
    { expiresIn: "7d" },
  );
  res.status(200).json({
    message: "signed in",
    token,
  });
});

module.exports = router;
