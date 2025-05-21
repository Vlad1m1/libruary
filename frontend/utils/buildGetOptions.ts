export const buildGetOptions = (params: Record<string, any>): string => {
  const queryParts: string[] = [];

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      const arrayValue = value.filter(
        (item) => item !== undefined && item !== null,
      );

      if (arrayValue.length > 0) {
        queryParts.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(arrayValue.join(","))}`,
        );
      }
    } else {
      queryParts.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      );
    }
  }

  return queryParts.join("&");
};
