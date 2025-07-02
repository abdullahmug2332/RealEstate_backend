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
    // New rental fields
    rentedOut,
    rentedByUs,
    tenantName,
    landlordName,
    rentAmount,
    rentedAt,
    soldAmount,
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
      soldAt = ?, createdAt = ?, rentedOut = ?, rentedByUs = ?, tenantName = ?, landlordName = ?, rentAmount = ?,
      rentedAt = ?, soldAmount = ?
    WHERE id = ?`;

  const soldoutBool = soldout === "true" || soldout === "1" || soldout === 1;
  const soldByUsBool =
    soldByUs === "true" || soldByUs === "1" || soldByUs === 1;
  const rentedOutBool =
    rentedOut === "true" || rentedOut === "1" || rentedOut === 1;
  const rentedByUsBool =
    rentedByUs === "true" || rentedByUs === "1" || rentedByUs === 1;

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
    rentedOutBool,
    rentedByUsBool,
    tenantName || null,
    landlordName || null,
    rentAmount || null,
    rentedAt || null,
    soldAmount || null,
    id,
  ];

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
  const { id, soldByUs, sellerName, buyerName, commission, soldAt,soldAmount } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Property ID is required" });
  }

  const soldout = true;
  const soldByUsBool = soldByUs === true ? 1 : 0;

  const query = `
    UPDATE properties
    SET soldout = ?, soldByUs = ?, sellerName = ?, buyerName = ?, commission = ?, soldAt = ?,soldAmount=?
    WHERE id = ?
  `;

  const values = [
    soldout,
    soldByUsBool,
    sellerName || null,
    buyerName || null,
    commission || null,
    soldAt || null,
    soldAmount || null ,
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

// Mark Property as Rented
export const markPropertyAsRented = (req, res) => {
  const {
    id,
    rentedByUs,
    landlordName,
    tenantName,
    commission,
    rentedAt,
    rentAmount,
  } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Property ID is required" });
  }

  const rentedOut = true;
  const rentedByUsBool = rentedByUs === true ? 1 : 0;

  const query = `
    UPDATE properties
    SET rentedOut = ?, rentedByUs = ?, landlordName = ?, tenantName = ?, commission = ?, rentedAt = ?, rentAmount = ?
    WHERE id = ?
  `;

  const values = [
    rentedOut,
    rentedByUsBool,
    landlordName || null,
    tenantName || null,
    commission || null,
    rentedAt || null,
    rentAmount || null,
    id,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json({ message: "Property marked as rented successfully" });
  });
};

// Get Property Stats
export const getPropertyStats = (req, res) => {
  const soldCountQuery = `
    SELECT COUNT(*) AS soldCount FROM properties 
    WHERE type = 'sale' AND soldout = true AND soldByUs = true
  `;

  const rentedCountQuery = `
    SELECT COUNT(*) AS rentedCount FROM properties 
    WHERE type = 'rent' AND rentedOut = true AND rentedByUs = true
  `;

  const soldDealsQuery = `
    SELECT COUNT(*) AS totalSoldDeals FROM properties 
    WHERE soldOut = true AND soldByUs = true
  `;

  const rentedDealsQuery = `
    SELECT COUNT(*) AS totalRentedDeals FROM properties 
    WHERE rentedOut = true AND rentedByUs = true
  `;

  const commissionQuery = `
    SELECT SUM(commission) AS totalCommission FROM properties 
    WHERE soldOut = true AND soldByUs = true OR rentedOut = true AND rentedByUs = true
  `;

  // Step 1
  db.query(soldCountQuery, (err, soldCountResult) => {
    if (err) return res.status(500).json({ error: "Database error (soldCount)" });

    // Step 2
    db.query(rentedCountQuery, (err, rentedCountResult) => {
      if (err) return res.status(500).json({ error: "Database error (rentedCount)" });

      // Step 3
      db.query(soldDealsQuery, (err, soldDealsResult) => {
        if (err) return res.status(500).json({ error: "Database error (soldDeals)" });

        // Step 4
        db.query(rentedDealsQuery, (err, rentedDealsResult) => {
          if (err) return res.status(500).json({ error: "Database error (rentedDeals)" });

          // Step 5
          db.query(commissionQuery, (err, commissionResult) => {
            if (err) return res.status(500).json({ error: "Database error (commission)" });

            const totalSoldDeals = soldDealsResult[0].totalSoldDeals || 0;
            const totalRentedDeals = rentedDealsResult[0].totalRentedDeals || 0;

            res.status(200).json({
              soldPropertiesByUs: soldCountResult[0].soldCount,
              rentedPropertiesByUs: rentedCountResult[0].rentedCount,
              totalSoldDeals,
              totalRentedDeals,
              totalDeals: totalSoldDeals + totalRentedDeals,
              totalCommission: commissionResult[0].totalCommission || 0,
            });
          });
        });
      });
    });
  });
};

// Get Stats of graphs 
export const getTimeBasedStats = (req, res) => {
  const { filter } = req.query;

  if (!["year", "month", "week"].includes(filter)) {
    return res.status(400).json({ error: "Invalid filter type" });
  }

  let saleGroupBy = "", rentGroupBy = "", labelMap = [];

  if (filter === "year") {
    saleGroupBy = "MONTH(soldAt)";
    rentGroupBy = "MONTH(rentedAt)";
    labelMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  } else if (filter === "month") {
    saleGroupBy = "DAY(soldAt)";
    rentGroupBy = "DAY(rentedAt)";
    labelMap = Array.from({ length: 31 }, (_, i) => `${i + 1}`);
  } else if (filter === "week") {
    saleGroupBy = "WEEKDAY(soldAt)";
    rentGroupBy = "WEEKDAY(rentedAt)";
    labelMap = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  }

  const saleQuery = `
    SELECT ${saleGroupBy} AS label, COUNT(*) AS sold 
    FROM properties 
    WHERE soldByUs = true AND type = 'sale' AND soldAt IS NOT NULL
    GROUP BY ${saleGroupBy}
  `;

  const rentQuery = `
    SELECT ${rentGroupBy} AS label, COUNT(*) AS rented 
    FROM properties 
    WHERE rentedByUs = true AND type = 'rent' AND rentedAt IS NOT NULL
    GROUP BY ${rentGroupBy}
  `;

  db.query(saleQuery, (err, saleResults) => {
    if (err) return res.status(500).json({ error: "Error fetching sales" });

    db.query(rentQuery, (err, rentResults) => {
      if (err) return res.status(500).json({ error: "Error fetching rents" });

      const dataMap = {};

      saleResults.forEach(row => {
        const name = (filter === "week")
          ? labelMap[row.label] || `${row.label}`
          : labelMap[row.label - 1] || `${row.label}`;

        dataMap[name] = { name, sold: row.sold, rented: 0 };
      });

      rentResults.forEach(row => {
        const name = (filter === "week")
          ? labelMap[row.label] || `${row.label}`
          : labelMap[row.label - 1] || `${row.label}`;

        if (dataMap[name]) {
          dataMap[name].rented = row.rented;
        } else {
          dataMap[name] = { name, sold: 0, rented: row.rented };
        }
      });

      const result = Object.values(dataMap).sort((a, b) =>
        labelMap.indexOf(a.name) - labelMap.indexOf(b.name)
      );

      res.json(result);
    });
  });
};


