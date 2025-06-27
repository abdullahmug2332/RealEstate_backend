import express from "express";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../Controllers/propertyController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/properties", upload.array("media", 10), createProperty);
router.get("/properties", getAllProperties);
router.get("/properties/:id", getPropertyById);
router.put("/properties/:id", updateProperty);
router.delete("/properties/:id", deleteProperty);

export default router;
