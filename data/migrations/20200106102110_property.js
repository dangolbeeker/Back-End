exports.up = function(knex) {
  return knex.schema.createTable("property", tbl => {
    tbl.increments();
    tbl.integer("accommodates").notNullable();
    tbl.integer("bedrooms").notNullable();
    tbl.integer("bathrooms").notNullable();
    tbl.integer("beds").notNullable();
    tbl.integer("security_deposit").notNullable();
    tbl.integer("cleaning_fee").notNullable();
    tbl.integer("minimum_nights").notNullable();
    tbl.string("bed_type", 128);
    tbl.string("room_type", 128).notNullable();
    tbl.string("neighbourhood_group_cleansed", 255).notNullable();
    tbl.string("amenities", 355);
    tbl.string("estimated_price", 128);
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("property");
};
