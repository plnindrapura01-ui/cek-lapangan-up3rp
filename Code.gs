// Google Apps Script — penerima laporan cek lapangan UP3 Rantau Prapat
// Pasang di Google Sheet baru: Extensions > Apps Script, tempel kode ini, lalu Deploy > New deployment > Web app.
const KUNCI = "";                 // samakan dengan KUNCI di config.js (boleh kosong)
const NAMA_FOLDER = "FOTO_CEK_LAPANGAN_UP3RP";
const KOLOM = ["diterima","id","jenis","ulp","penyulang","section","data","tiang_data","titik","petugas","hasil",
  "jenis_kabel","penampang","jumlah_tiang","sirkit","kode_gardu","kva","catatan","gps","akurasi","jarak_m","posisi","waktu","foto"];

function lembar_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName("LAPORAN");
  if (!sh) { sh = ss.insertSheet("LAPORAN"); sh.appendRow(KOLOM); sh.setFrozenRows(1); }
  return sh;
}
function folder_() {
  const it = DriveApp.getFoldersByName(NAMA_FOLDER);
  return it.hasNext() ? it.next() : DriveApp.createFolder(NAMA_FOLDER);
}
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

function doPost(e) {
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    const d = JSON.parse(e.postData.contents);
    if (KUNCI && d.kunci !== KUNCI) return json_({ok:false, pesan:"kunci salah"});
    const link = [];
    (d.foto || []).slice(0,3).forEach(function (b64, k) {
      const m = String(b64).match(/^data:(image\/\w+);base64,(.+)$/); if (!m) return;
      const blob = Utilities.newBlob(Utilities.base64Decode(m[2]), m[1], d.id + "_" + Date.now() + "_" + (k+1) + ".jpg");
      link.push(folder_().createFile(blob).getUrl());
    });
    d.foto = link.join(" ");
    d.diterima = new Date();
    lembar_().appendRow(KOLOM.map(function (k) { return d[k] === undefined ? "" : d[k]; }));
    return json_({ok:true});
  } catch (err) {
    return json_({ok:false, pesan:String(err)});
  } finally { lock.releaseLock(); }
}

function doGet(e) {
  if (KUNCI && (e.parameter.kunci || "") !== KUNCI) return json_({ok:false, pesan:"kunci salah"});
  const v = lembar_().getDataRange().getValues(); const h = v.shift() || [];
  const ix = function (k) { return h.indexOf(k); };
  const data = v.map(function (r) { return {id:r[ix("id")], hasil:r[ix("hasil")], petugas:r[ix("petugas")], waktu:r[ix("waktu")]}; });
  return json_({ok:true, data:data});
}
