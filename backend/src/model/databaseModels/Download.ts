import { DataTypes, Model, NOW } from 'sequelize';
import sequelize from '../db';

interface DownloadCreationAttributes {
	userId: string;
	bookId: string;
}
interface DownloadAttributes{
	id: string;
	userId?: string;
	bookId?: string;
	date: Date;
}

export interface DownloadInstance
  extends Model<DownloadAttributes, DownloadCreationAttributes>,
	  DownloadAttributes {}

const Download = sequelize.define<DownloadInstance>('download', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: NOW,
	},
});

export default Download;
