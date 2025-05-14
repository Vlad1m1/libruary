import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

interface FileCreationAttributes {
	path: string;
	fileSize: string;
	mimeType: string
}

interface FileAttributes extends FileCreationAttributes {
	id: string;
	creationAt?: string;
}

export interface FileInstance
  extends Model<FileAttributes, FileCreationAttributes>,
	  FileAttributes {}

const File = sequelize.define<FileInstance>('file', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
	},
	path: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	fileSize: {
		type: DataTypes.INTEGER, //Ограничение до ~ 2ГБ
		allowNull: false,
	},
	mimeType: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export default File;
