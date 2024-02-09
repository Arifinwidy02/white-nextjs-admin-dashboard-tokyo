export function colorDeciderForDashboard({ status }) {
  if (status == 'used') return '#C7C8CC';
  if (status == 'broken') return '#FF8080';
  if (status == 'ready') return '#CDFADB';
  if (status == 'repair') return '#FFFC9B';
}

export function alignTextDecider({ key }) {
  const keyDecider =
    key === 'ac_dc' ||
    key == 'voltage' ||
    key == 'qrcode' ||
    key == 'status' ||
    key == 'hp';
  if (keyDecider) {
    return 'center';
  } else {
    return 'left';
  }
}

export function typeTable(type) {
  const repairTable = type == 'repair';
  const motorTable = type == 'motor-table' || '';
  return { repairTable, motorTable };
}
