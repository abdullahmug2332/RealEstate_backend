import db from "../db.js";

// Create Property
export const createProperty = (req, res) => {
  const {
    price,
    location,
    type,
    measurement,
    unit,
    rooms,
    bath,
    front,
    back,
    description,
    soldout,
    soldByUs,
    buyerName,
    sellerName,
    commission,
    createdAt,
    soldAt,
  } = req.body;

  const files = req.files || [];

  const media = files.map((file) => {
    const type = file.mimetype.startsWith("image")
      ? "image"
      : file.mimetype.startsWith("video")
      ? "video"
      : "other";
    return { type, src: file.filename };
  });

  const query = `
    INSERT INTO properties (
      price, location, type, measurement, unit, rooms, bath, front, back, 
      description, media, soldout, soldByUs, buyerName, sellerName, 
      commission, createdAt, soldAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    price,
    location,
    type,
    measurement,
    unit,
    rooms,
    bath,
    front,
    back,
    description,
    JSON.stringify(media),
    soldout,
    soldByUs,
    buyerName,
    sellerName,
    commission,
    createdAt,
    soldAt,
  ];

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.status(201).json({ message: "Property created", id: result.insertId });
  });
};

// Get All Properties
export const getAllProperties = (req, res) => {
  const query = "SELECT * FROM properties";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    // Parse media JSON back
    const parsed = results.map((item) => ({
      ...item,
      media: JSON.parse(item.media || "[]"),
    }));

    res.status(200).json(parsed);
  });
};

// Get Single Property
export const getPropertyById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM properties WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0)
      return res.status(404).json({ error: "Property not found" });

    const property = {
      ...results[0],
      media: JSON.parse(results[0].media || "[]"),
    };

    res.status(200).json(property);
  });
};

// Update Property
export const updateProperty = (req, res) => {
  const id = req.params.id;
  const {
    price,
    location,
    type,
    measurement,
    unit,
    rooms,
    bath,
    front,
    back,
    description,
    soldout,
    soldByUs,
    buyerName,
    sellerName,
    commission,
    soldAt,
    createdAt,
    oldMedia,
  } = req.body;

  let oldMediaParsed = [];
  try {
    oldMediaParsed = JSON.parse(oldMedia || "[]");
  } catch (e) {
    console.log("Error parsing oldMedia", e);
  }

  // Merge old and new media
  const newMedia = Array.isArray(req.files)
    ? req.files.map((file) => ({
        type: file.mimetype.startsWith("image") ? "image" : "video",
        src: file.filename,
      }))
    : [];

  const finalMedia = [...oldMediaParsed, ...newMedia];

  const sql = `
    UPDATE properties SET
      price = ?, location = ?, type = ?, measurement = ?, unit = ?, rooms = ?, bath = ?, front = ?, back = ?,
      description = ?, media = ?, soldout = ?, soldByUs = ?, buyerName = ?, sellerName = ?, commission = ?,
      soldAt = ?, createdAt = ?
    WHERE id = ?`;

  const soldoutBool = soldout === "true" || soldout === "1" || soldout === 1;
  const soldByUsBool =
    soldByUs === "true" || soldByUs === "1" || soldByUs === 1;

  const values = [
    price,
    location,
    type,
    measurement,
    unit,
    rooms,
    bath,
    front,
    back,
    description,
    JSON.stringify(finalMedia),
    soldoutBool,
    soldByUsBool,
    buyerName || null,
    sellerName || null,
    commission || null,
    soldAt || null,
    createdAt || null,
    id,
  ];

  console.log(typeof soldout, soldout);

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Property updated successfully" });
  });
};

// Delete Property
export const deleteProperty = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM properties WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Property not found" });

    res.status(200).json({ message: "Property deleted" });
  });
};

// Mark Property as Sold
export const markPropertyAsSold = (req, res) => {
  const { id, soldByUs, sellerName, buyerName, commission, soldAt } = req.body;
  console.log(soldByUs);
  if (!id) {
    return res.status(400).json({ error: "Property ID is required" });
  }

  const soldout = true;
  const soldByUsBool = soldByUs === true ? 1 : 0;

  const query = `
    UPDATE properties
    SET soldout = ?, soldByUs = ?, sellerName = ?, buyerName = ?, commission = ?, soldAt = ?
    WHERE id = ?
  `;

  const values = [
    soldout,
    soldByUsBool,
    sellerName || null,
    buyerName || null,
    commission || null,
    soldAt || null,
    id,
  ];

  db.query(query, values, (err, result) => {
    if (err)
      return res.status(500).json({ error: "Database error", details: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json({ message: "Property marked as sold successfully" });
  });
};
