const SHEET_NAME = 'Orders';
const HEADERS = ['id','date','app','plan','user','duration','customer','fh','income','expense','discount','account','status'];
function doGet() {
  const sh = getSheet_();
  const values = sh.getDataRange().getValues();
  const rows = values.length > 1 ? values.slice(1).map(r => Object.fromEntries(HEADERS.map((h,i)=>[h, h === 'date' && r[i] instanceof Date ? Utilities.formatDate(r[i], Session.getScriptTimeZone(), 'yyyy-MM-dd') : r[i]]))) : [];
  return ContentService.createTextOutput(JSON.stringify({ok:true,orders:rows})).setMimeType(ContentService.MimeType.JSON);
}
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    if (payload.action !== 'replace') throw new Error('Unknown action');
    const sh = getSheet_();
    sh.clearContents();
    sh.getRange(1,1,1,HEADERS.length).setValues([HEADERS]);
    const rows = (payload.orders || []).map(o => HEADERS.map(h => o[h] ?? ''));
    if (rows.length) sh.getRange(2,1,rows.length,HEADERS.length).setValues(rows);
    return ContentService.createTextOutput(JSON.stringify({ok:true,count:rows.length})).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err)})).setMimeType(ContentService.MimeType.JSON);
  }
}
function getSheet_() {
  const id = '1F95-UMgaSWF8zIapli2j40NehaGPvCszQvnxsuxSmcM';
  const ss = SpreadsheetApp.openById(id);
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) sh.appendRow(HEADERS);
  return sh;
}