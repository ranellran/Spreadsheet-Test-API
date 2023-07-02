function runQuery(query) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  var data = sheet.getRange(1, 1, lastRow, lastColumn).getValues();

  var headerRow = data[0];
  var rows = data.slice(1);

  var result = [];

 
