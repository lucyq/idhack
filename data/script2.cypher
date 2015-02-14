LOAD CSV WITH HEADERS FROM "file:/Users/Lucy/Documents/CS/urbinsight/data/sources.csv" AS csvLine
CREATE (:Source { geodb_subt: csvLine.GEODB_SUBT,
                    geodb_oid: csvLine.GEODB_OID,
                    object_id: csvLine.OBJECTID,
                    type: csvLine.TYPE,
                    name: csvLine.NAME,
                    global_id: csvLine.GLOBALID,
                    lat: csvLine.YCOORD,
                    lng: csvLine.XCOORD

                    });
