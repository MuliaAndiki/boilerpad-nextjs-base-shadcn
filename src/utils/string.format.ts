export function camelCaseToWords(str: string) {
  return str.replace(/[A-Z]/g, '$1').replace(/^./, function (str) {
    return str.toUpperCase();
  });
}

export function kebabCaseToWords(str: string) {
  return str.replace(/[-/]/g, ' ').replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}

export function formatDate(isoString: string, withTime = false): string {
  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    return '-';
  }
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  };

  if (withTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
    options.hour12 = false;
  }

  return new Intl.DateTimeFormat('id-ID', options).format(date);
}

export function normalizeToLowercase<T extends Record<string, any>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (typeof value === 'string') {
        return [key, value.toLowerCase()];
      }
      if (Array.isArray(value)) {
        return [key, value.map((v) => (typeof v === 'string' ? v.toLowerCase() : v))];
      }
      return [key, value];
    })
  ) as T;
}

export function getTime(datetime: string): string {
  if (!datetime) return '';
  const parts = datetime.split('T');
  if (parts.length < 2) return '';
  return parts[1].slice(0, 5);
}

export function getDate(datetime: string): string {
  if (!datetime) return '';
  return datetime.split('T')[0];
}

export const menitKeJam = (menit: number): string => {
  if (menit <= 0) return '0 jam';
  const jam = Math.floor(menit / 60);
  const sisaMenit = menit % 60;

  if (jam > 0 && sisaMenit > 0) {
    return `${jam} jam ${sisaMenit} menit`;
  } else if (jam > 0) {
    return `${jam} jam`;
  } else {
    return `${sisaMenit} menit`;
  }
};

export function calculateDuration(startTime: string, estimasiJam: number) {
  const startDate = new Date(startTime);
  const selesai = new Date(startDate.getTime() + estimasiJam * 60 * 60 * 1000);
  return selesai.toLocaleString();
}
