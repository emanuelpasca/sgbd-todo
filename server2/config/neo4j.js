const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  "neo4j+s://4850cba7.databases.neo4j.io",
  neo4j.auth.basic("neo4j", "Cxcba-3DmirSqVKgwdhcFJUPoi16WpGAweYdgtl_Hkg")
);

module.exports = driver;
