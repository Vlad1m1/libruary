export function toStringArray(val: string): string[] | undefined {
	if (!val) return undefined;
	const parts = val.split(',');
	return parts;
}
