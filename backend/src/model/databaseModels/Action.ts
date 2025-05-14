import { DataTypes, Model, NOW } from 'sequelize';
import sequelize from '../db';
import { IActionType } from '../../types/IActionType';

interface ActionCreationAttributes {
	type: IActionType;
	userId: string;
	bookId: string;
}
interface ActionAttributes{
	id: string;
	type: IActionType;
	userId?: string;
	bookId?: string;
	date: Date;
}

export interface ActionInstance
  extends Model<ActionAttributes, ActionCreationAttributes>,
	  ActionAttributes {}

const Action = sequelize.define<ActionInstance>('action', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
	},
	type: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: NOW,
	},
});

export default Action;
