import { UserAttributes } from '../model/databaseModels/User';

export class UserDTO {
	id: string;
	email: string;
	firstname: string;
	lastname: string;
	patronymic: string;
	isVerified: boolean;

	constructor(model: UserAttributes) {
		this.id = model.id;
		this.email = model.email;
		this.firstname = model.firstname;
		this.lastname = model.lastname;
		this.patronymic = model.patronymic;
		this.isVerified = model.isVerified;
	}
}
