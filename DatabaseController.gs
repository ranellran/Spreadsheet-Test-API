function runQuery(query) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  var data = sheet.getRange(1, 1, lastRow, lastColumn).getValues();

  var headerRow = data[0];
  var rows = data.slice(1);

  var result = [];

 
 var queryType = getQueryType(query);

  if (queryType === "SELECT") {
    result = executeSelectQuery(query, headerRow, rows);
  } else if (queryType === "UPDATE") {
    result = executeUpdateQuery(query, headerRow, rows);
  } else if (queryType === "DELETE") {
    result = executeDeleteQuery(query, headerRow, rows);
  } else if (queryType === "INSERT INTO") {
    result = executeInsertQuery(query, headerRow, rows);
  } else if (queryType === "CREATE DATABASE") {
    result = executeCreateDatabaseQuery(query);
  } else if (queryType === "ALTER DATABASE") {
    result = executeAlterDatabaseQuery(query);
  } else if (queryType === "CREATE TABLE") {
    result = executeCreateTableQuery(query);
  } else if (queryType === "ALTER TABLE") {
    result = executeAlterTableQuery(query);
  } else if (queryType === "DROP TABLE") {
    result = executeDropTableQuery(query);
  } else if (queryType === "CREATE INDEX") {
    result = executeCreateIndexQuery(query);
  } else if (queryType === "DROP INDEX") {
    result = executeDropIndexQuery(query);
  } else {
    return "Invalid query.";
  }

  return result;
}

function getQueryType(query) {
  query = query.trim().toUpperCase();
  var keywords = query.split(" ");
  return keywords[0];
}
