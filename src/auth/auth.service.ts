import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
	UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import * as bcrypt from 'bcrypt';

const ERR_CODE = {
	DUPLICATE_KEY: '23505',
};

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
		private jwtService: JwtService,
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

	async signIn(
		authCredentialsDto: AuthCredentialsDto,
	): Promise<{ accessToken: string }> {
		const { username, password } = authCredentialsDto;
		const user = await this.usersRepository.findOne({
			where: {
				username,
			},
		});

		if (user && bcrypt.compare(password, user.password)) {
			const payload: JwtPayload = { username };
			const accessToken: string = await this.jwtService.sign(payload);
			return { accessToken };
		} else {
			throw new UnauthorizedException('Please verify your login crendentials');
		}
	}
}
