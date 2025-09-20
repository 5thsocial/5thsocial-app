export function now() { return new Date(); }
export function markDeleted(doc: any) {
  doc.status_code = 'deleted';
  doc.deleted_at = new Date();
  doc.status_date = new Date();
  return doc;
}
