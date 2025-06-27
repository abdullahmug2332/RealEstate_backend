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
    status,
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
      commission, createdAt, soldAt, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    status,
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
    if (results.length === 0) return res.status(404).json({ error: "Property not found" });

    const property = {
      ...results[0],
      media: JSON.parse(results[0].media || "[]"),
    };

    res.status(200).json(property);
  });
};

// Update Property
export const updateProperty = (req, res) => {
  const { id } = req.params;

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
    media,
    soldout,
    soldByUs,
    buyerName,
    sellerName,
    commission,
    createdAt,
    soldAt,
    status,
  } = req.body;

  const query = `
    UPDATE properties SET 
      price = ?, location = ?, type = ?, measurement = ?, unit = ?, 
      rooms = ?, bath = ?, front = ?, back = ?, description = ?, media = ?, 
      soldout = ?, soldByUs = ?, buyerName = ?, sellerName = ?, commission = ?, 
      createdAt = ?, soldAt = ?, status = ?
    WHERE id = ?
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
    status,
    id,
  ];

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.status(200).json({ message: "Property updated" });
  });
};

// Delete Property
export const deleteProperty = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM properties WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Property not found" });

    res.status(200).json({ message: "Property deleted" });
  });
};
