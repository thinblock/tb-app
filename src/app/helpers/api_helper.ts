export function buildUrl(url, parameters) {
  let qs = '';
  for (const key in parameters) {
      if (parameters.hasOwnProperty(key)) {
          const value = parameters[key];
          if (value !== null && value !== undefined && value !== '' && !isNaN(value)) {
            qs +=
                encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
          }
      }
  }
  if (qs.length > 0) {
      qs = qs.substring(0, qs.length - 1);
      url = url + '?' + qs;
  }

  return url;
}
