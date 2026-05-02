const router = require("express").Router();
const axios = require("axios");

// create a new household
router.post("/api/households", () => {});

// join an existing household group?
router.post("/api/households/join", () => {});

// get current user's household
router.get("/api/households/me", () => {});

// list all members
router.get("/api/households/:id/members", () => {});

// ------------------------------------------------------ //

// list household items
router.get("/api/items", () => {});

// create a new item
router.post("/api/items", () => {});

// update item details
router.patch("/api/items/:id/status", () => {});

// remove item
router.delete("/api/items/:id", () => {});

// ------------------------------------------------------ //

// waste score, count by status
router.get("/api/dashboard/stats", () => {});

// items expiring in 24hrs
router.get("/api/dashboard/expiring", () => {});

module.exports = router;
