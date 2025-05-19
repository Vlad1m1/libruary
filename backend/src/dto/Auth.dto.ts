import { TokenDTO } from './Token.dto';
import { UserDTO } from './User.dto';
import { UserAttributes } from '../model/databaseModels/User';

export class AuthDTO {
	public accessToken: string;
	public refreshToken: string;
	public user: UserDTO;

	constructor(tokens: TokenDTO, user: UserAttributes) {
		this.accessToken = tokens.access_token;
		this.refreshToken = tokens.refresh_token;
		this.user = new UserDTO(user);
	}
}
