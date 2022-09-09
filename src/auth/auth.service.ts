import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
	UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

const ERR_CODE = {
	DUPLICATE_KEY: '23505',
};

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
	) {}

	async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		const { username, password } = authCredentialsDto;

		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = this.usersRepository.create({
			username,
			password: hashedPassword,
		});

		try {
			await this.usersRepository.save(user);
		} catch (err) {
			if (err.code === ERR_CODE.DUPLICATE_KEY) {
				throw new ConflictException('Username already exists');
			} else {
				throw new InternalServerErrorException();
			}
		}
	}

	async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
		const { username, password } = authCredentialsDto;
		const user = await this.usersRepository.findOne({
			where: {
				username,
			},
		});

		if (user && bcrypt.compare(password, user.password)) {
			return 'success';
		} else {
			throw new UnauthorizedException('Please verify your login crendentials');
		}
	}
}
