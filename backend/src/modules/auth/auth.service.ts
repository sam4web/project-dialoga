import { ICreateUserDTO } from "../../database/models/User";
import ApiError from "../../lib/errors/ApiError";
import { generateToken, verifyToken } from "../../lib/auth/jwt";
import config from "../../config";
import bcrypt from "bcrypt";
import UserRepository, { IUserRepository } from "../../database/repositories/UserRepository";

export interface IRegisterDTO extends ICreateUserDTO {}
export interface ILoginDTO {
  email: string;
  password: string;
}
interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  private userRepository: IUserRepository;
  constructor(userRepository: IUserRepository = new UserRepository()) {
    this.userRepository = userRepository;
  }

  public async login({ email, password }: ILoginDTO): Promise<IAuthResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw ApiError.conflict("User with provided username does not exists.");
    }
    const doesPassMatch = await bcrypt.compare(password, user.password);
    if (!doesPassMatch) {
      throw ApiError.unauthorized("Password does not match.");
    }
    const payload = { id: user._id, email: user.email };
    const accessToken = generateToken(payload, config.ACCESS_TOKEN_SECRET, config.ACCESS_TOKEN_EXPIRY_TIME);
    const refreshToken = generateToken(payload, config.REFRESH_TOKEN_SECRET, config.REFRESH_TOKEN_EXPIRY_TIME);
    return { accessToken, refreshToken };
  }

  public async register({ fullname, email, password }: IRegisterDTO): Promise<IAuthResponse> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw ApiError.conflict("Email already in use.");
    }
    const user = await this.userRepository.create({ fullname, email, password });
    const payload = { id: user._id, email: user.email };
    const accessToken = generateToken(payload, config.ACCESS_TOKEN_SECRET, config.ACCESS_TOKEN_EXPIRY_TIME);
    const refreshToken = generateToken(payload, config.REFRESH_TOKEN_SECRET, config.REFRESH_TOKEN_EXPIRY_TIME);
    return { accessToken, refreshToken };
  }

  public async refresh(token: string): Promise<IAuthResponse> {
    const decoded = verifyToken(token, config.REFRESH_TOKEN_SECRET);
    const user = await this.userRepository.findById(decoded.id);
    if (!user) {
      throw ApiError.unauthorized("User not found or token invalid.");
    }
    const newPayload = { id: user.id, email: user.email };
    const accessToken = generateToken(newPayload, config.ACCESS_TOKEN_SECRET, config.ACCESS_TOKEN_EXPIRY_TIME);
    const refreshToken = generateToken(newPayload, config.REFRESH_TOKEN_SECRET, config.REFRESH_TOKEN_EXPIRY_TIME);
    return { accessToken, refreshToken };
  }
}

const authService = new AuthService();
export default authService;
