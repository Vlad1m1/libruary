export function toNumberArray(val: string): number[] | undefined {
	if (!val) return undefined;
	const parts = val.split(',');
	return parts.map(Number).filter(Boolean);
}
