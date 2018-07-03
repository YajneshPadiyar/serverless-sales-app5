exports.LAMBDA_AWS_REGION = "ap-southeast-2";

exports.ID_DEFAULT = 1000;
exports.ID_TABLE = "T_ID";

//Manage Customer
const CUSTOMER_ID_TYPE = "CustomerId";
exports.CUSTOMER_TABLE = "T_CUSTOMERS";
exports.CUSTOMER_LINE_ID_INDEX = "LINE_ID_INDEX";
exports.SEARCH_STRING_GET_CUSTOMER = "LINE_ID = :LINEID";
exports.CUSTOMER_ID_TYPE = CUSTOMER_ID_TYPE;

//Manage Zones
const ZONE_ID_TYPE = "ZoneId";
exports.ZONE_TABLE = "T_ZONES";
exports.ZONE_TYPE_INDEX = "ZONE_TYPE_INDEX";
exports.SEARCH_STRING_GET_ZONE = "ZONE_TYPE = :ZONETYPE";
exports.ZONE_ID_TYPE = ZONE_ID_TYPE;

//ID Type mapping
exports.ID_MAPPING = {
  T_CUSTOMERS: CUSTOMER_ID_TYPE,
  T_ZONES : ZONE_ID_TYPE
};
