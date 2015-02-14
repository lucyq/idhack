LOAD CSV WITH HEADERS FROM "file:/Users/ashokafinley/development/idhack/data/sources.csv" AS csvLine
CREATE (:Source { geodb_oid: csvLine.GEODB_OID,
                  geodb_subt: csvLine.GEODB_SUBT,
                  object_id: csvLine.OBJECTID,
                  type: csvLine.TYPE,
                  name: csvLine.NAME,
                  global_id: csvLine.GLOBALID,
                  shape_area: csvLine.SHAPE_AREA,
                  shape_len: csvLine.SHAPE_LEN,
                  lat: csvLine.YCOORD,
                  lng: csvLine.XCOORD 



                  }
      );