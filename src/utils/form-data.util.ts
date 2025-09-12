export function flattenToFormData(obj: Record<string, any>, form?: FormData): FormData {
  const formData = form || new FormData();

  const fileFields = ['ktp', 'izinUsaha', 'logo', 'proposalBrand', 'fotoProfile'];

  function flatten(current: any, parentKey?: string) {
    for (const key in current) {
      if (!current.hasOwnProperty(key)) continue;

      const value = current[key];
      const flatKey = parentKey ? `${parentKey}.${key}` : key;

      if (value === undefined || value === null) continue;

      const isFile = value instanceof File || value instanceof Blob;

      const finalKey = isFile && fileFields.includes(key) ? key : flatKey;

      if (isFile) {
        formData.append(finalKey, value);
      } else if (typeof value === 'object' && !(value instanceof Date)) {
        flatten(value, flatKey);
      } else if (value instanceof Date) {
        formData.append(finalKey, value.toISOString());
      } else {
        formData.append(finalKey, value);
      }
    }
  }

  flatten(obj);
  return formData;
}
