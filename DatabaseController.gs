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


function executeSelectQuery(query, headerRow, rows) {
  var selectCols = query.substring(query.indexOf("SELECT") + 7, query.indexOf("FROM")).trim().split(",");
  var selectIndices = [];

  selectCols.forEach(function (col) {
    var colIndex = headerRow.indexOf(col.trim());
    if (colIndex !== -1) {
      selectIndices.push(colIndex);
    }
  });

  var result = [];

  rows.forEach(function (row) {
    var resultRow = [];
    selectIndices.forEach(function (index) {
      resultRow.push(row[index]);
    });
    result.push(resultRow);
  });

  return result;
}

function executeUpdateQuery(query, headerRow, rows) {
  var updateCols = query.substring(query.indexOf("SET") + 3, query.indexOf("WHERE")).trim().split(",");
  var setValues = {};

  updateCols.forEach(function (col) {
    var parts = col.trim().split("=");
    var colIndex = headerRow.indexOf(parts[0].trim());
    if (colIndex !== -1) {
      setValues[colIndex] = parts[1].trim();
    }
  });

  var whereClause = query.substring(query.indexOf("WHERE") + 5).trim();
  var whereParts = whereClause.split("=");
  var whereColIndex = headerRow.indexOf(whereParts[0].trim());
  var whereValue = whereParts[1].trim();

  rows.forEach(function (row) {
    if (row[whereColIndex] === whereValue) {
      for (var colIndex in setValues) {
        row[colIndex] = setValues[colIndex];
      }
    }
  });

  return "Updated successfully.";
}

function executeDeleteQuery(query, headerRow, rows) {
  var whereClause = query.substring(query.indexOf("WHERE") + 5).trim();
  var whereParts = whereClause.split("=");
  var whereColIndex = headerRow.indexOf(whereParts[0].trim());
  var whereValue = whereParts[1].trim();

  var numRowsDeleted = 0;

  rows.forEach(function (row, rowIndex) {
    if (row[whereColIndex] === whereValue) {
      rows.splice(rowIndex, 1);
      numRowsDeleted++;
    }
  });

  return numRowsDeleted + " rows deleted.";
}

function executeInsertQuery(query, headerRow, rows) {
  var insertCols = query.substring(query.indexOf("INTO") + 4, query.indexOf("VALUES")).trim().split(",");
  var insertValues = query.substring(query.indexOf("VALUES") + 6).trim().split(",");

  var newRow = [];

  insertCols.forEach(function (col) {
    var colIndex = headerRow.indexOf(col.trim());
    if (colIndex !== -1) {
      newRow[colIndex] = insertValues[insertCols.indexOf(col)];
    }
  });

  rows.push(newRow);

  return "Inserted successfully.";
}

function executeCreateDatabaseQuery(query) {
  return "Creating a new database...";
}

function executeAlterDatabaseQuery(query) {
  return "Altering the database...";
}

function executeCreateTableQuery(query) {
  return "Creating a new table...";
}

function executeAlterTableQuery(query) {
  return "Altering the table...";
}

function executeDropTableQuery(query) {
  return "Dropping the table...";
}

function executeCreateIndexQuery(query) {
  return "Creating an index...";
}

function executeDropIndexQuery(query) {
  return "Dropping the index...";
}

