const { QueryTypes } = require("sequelize");

const sequelize = require("../config/database");

const db = require("../models/indexModels");

const Destination = db.Destination;

const DestinationImage =
  db.DestinationImage;

// ==============================
// GET ALL DESTINATIONS
// ==============================
exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await sequelize.query(
      `
      SELECT
        d.*,
        COALESCE(
          JSON_ARRAYAGG(
            CASE
              WHEN di.id IS NOT NULL THEN
                JSON_OBJECT(
                  'id', di.id,
                  'image_url', di.image_url,
                  'image_caption', di.image_caption
                )
            END
          ),
          JSON_ARRAY()
        ) AS images
      FROM destinations d
      LEFT JOIN destination_images di
        ON d.id = di.destination_id
      GROUP BY d.id
      ORDER BY d.created_at DESC
      `,
      {
        type: QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      success: true,
      data: destinations,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Gagal mengambil destinasi",
      error: error.message,
    });
  }
};

// ==============================
// GET DESTINATION DETAIL
// ==============================
exports.getDestinationById = async (req, res) => {
  try {
    const { id } = req.params;

    const destination = await Destination.findByPk(id, {
      include: [
        {
          model: DestinationImage,
          as: "images",
          attributes: [
            "id",
            "image_url",
            "image_caption",
          ],
        },
      ],
    });

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destinasi tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      data: destination,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Gagal mengambil detail destinasi",
      error: error.message,
    });
  }
};

// ==============================
// CREATE DESTINATION
// ==============================
exports.createDestination = async (req, res) => {
  try {
    const {
      name,
      description,
      address,
      village,
      district,
      regency,
      province,
      ticket_price,
      opening_hours,
      facilities,
      is_active,
    } = req.body;

    const result = await sequelize.query(
      `
      INSERT INTO destinations
      (
        name,
        description,
        address,
        village,
        district,
        regency,
        province,
        ticket_price,
        opening_hours,
        facilities,
        is_active,
        created_at,
        updated_at
      )
      VALUES
      (
        :name,
        :description,
        :address,
        :village,
        :district,
        :regency,
        :province,
        :ticket_price,
        :opening_hours,
        :facilities,
        :is_active,
        NOW(),
        NOW()
      )
      `,
      {
        replacements: {
          name,
          description,
          address,
          village,
          district,
          regency,
          province,
          ticket_price,
          opening_hours,
          facilities,
          is_active: is_active ?? 1,
        },
        type: QueryTypes.INSERT,
      }
    );

    const destinationId = result[0];

    // SAVE IMAGES
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        await sequelize.query(
          `
          INSERT INTO destination_images
          (
            destination_id,
            image_url,
            image_caption,
            created_at
          )
          VALUES
          (
            :destination_id,
            :image_url,
            :image_caption,
            NOW()
          )
          `,
          {
            replacements: {
              destination_id: destinationId,
              image_url: `/uploads/destinations/${file.filename}`,
              image_caption: file.originalname,
            },
            type: QueryTypes.INSERT,
          }
        );
      }
    }

    return res.status(201).json({
      success: true,
      message: "Destinasi berhasil ditambahkan",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Gagal menambahkan destinasi",
      error: error.message,
    });
  }
};

// ==============================
// UPDATE DESTINATION
// ==============================
// ==============================
// UPDATE DESTINATION
// ==============================
exports.updateDestination = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      address,
      village,
      district,
      regency,
      province,
      ticket_price,
      opening_hours,
      facilities,
    } = req.body;

    const is_active =
      req.body.is_active === true ||
      req.body.is_active === "true" ||
      req.body.is_active === "1" ||
      req.body.is_active === 1
        ? 1
        : 0;

    // ==========================
    // UPDATE DATA DESTINASI
    // ==========================
    await sequelize.query(
      `
      UPDATE destinations
      SET
        name = :name,
        description = :description,
        address = :address,
        village = :village,
        district = :district,
        regency = :regency,
        province = :province,
        ticket_price = :ticket_price,
        opening_hours = :opening_hours,
        facilities = :facilities,
        is_active = :is_active,
        updated_at = NOW()
      WHERE id = :id
      `,
      {
        replacements: {
          id,
          name,
          description,
          address,
          village,
          district,
          regency,
          province,
          ticket_price,
          opening_hours,
          facilities,
          is_active,
        },
        type: QueryTypes.UPDATE,
      }
    );

    // ==========================
    // JIKA ADA GAMBAR BARU
    // HAPUS GAMBAR LAMA DULU
    // ==========================
    // ==========================
// HAPUS GAMBAR YANG DIPILIH
// ==========================
const deletedImages = JSON.parse(
  req.body.deletedImages || "[]"
);

if (deletedImages.length > 0) {
  await sequelize.query(
    `
    DELETE FROM destination_images
    WHERE id IN (:deletedImages)
    `,
    {
      replacements: {
        deletedImages,
      },
      type: QueryTypes.DELETE,
    }
  );
}

// ==========================
// TAMBAH GAMBAR BARU
// ==========================
if (req.files && req.files.length > 0) {
  for (const file of req.files) {
    await sequelize.query(
      `
      INSERT INTO destination_images
      (
        destination_id,
        image_url,
        image_caption,
        created_at
      )
      VALUES
      (
        :destination_id,
        :image_url,
        :image_caption,
        NOW()
      )
      `,
      {
        replacements: {
          destination_id: id,
          image_url:
            `/uploads/destinations/${file.filename}`,
          image_caption:
            file.originalname,
        },
        type: QueryTypes.INSERT,
      }
    );
  }
}

    return res.status(200).json({
      success: true,
      message: "Destinasi berhasil diperbarui",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Gagal update destinasi",
      error: error.message,
    });
  }
};

// ==============================
// DELETE DESTINATION
// ==============================
exports.deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;

    await sequelize.query(
      `
      DELETE FROM destination_images
      WHERE destination_id = :id
      `,
      {
        replacements: { id },
        type: QueryTypes.DELETE,
      }
    );

    await sequelize.query(
      `
      DELETE FROM destinations
      WHERE id = :id
      `,
      {
        replacements: { id },
        type: QueryTypes.DELETE,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Destinasi berhasil dihapus",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Gagal menghapus destinasi",
      error: error.message,
    });
  }
};