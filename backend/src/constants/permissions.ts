
export const Permissions = {
	// VIEW_PRODUCTS_TAB: {
	// 	value: 'VIEW_PRODUCTS_TAB',
	// 	name: 'Просмотр вкладки продукция',
	// },
};

export type TPermissionItem = typeof Permissions[keyof typeof Permissions]['value'];
