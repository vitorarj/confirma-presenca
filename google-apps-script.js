// Cole este código em Extensões > Apps Script da sua planilha do Google.
// Passo a passo no README.md.

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const aba = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (aba.getLastRow() === 0) {
      aba.appendRow(["Data", "Nome", "Vai?", "Pessoas", "Recado"]);
    }
    const p = e.parameter;
    aba.appendRow([
      new Date(),
      p.nome || "",
      p.presenca || "",
      Number(p.pessoas || 0),
      p.mensagem || "",
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
