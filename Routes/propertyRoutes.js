import express from "express";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  markPropertyAsSold
} from "../Controllers/propertyController.js";
import upload from "../middleware/upload.js";

const router = express.Router();
router.delete("/properties/:id", deleteProperty);
router.get("/properties", getAllProperties);
router.get("/properties/:id", getPropertyById);
router.put("/properties/mark-sold", markPropertyAsSold);
router.post("/properties", upload.array("media", 10), createProperty);
router.put("/properties/:id", upload.array("media", 10), updateProperty);

export default router;
