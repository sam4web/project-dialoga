import ApiError from "../../lib/errors/ApiError";
import { generateToken, verifyToken } from "../../lib/auth/jwt";
import config from "../../config";
import bcrypt from "bcrypt";
import UserRepository, { IUserRepository } from "../../database/repositories/UserRepository";
import { IAuthResponse, ILoginDTO, IRegisterDTO, IChangePassServiceDTO } from "./auth.types";

class AuthService {
  private userRepository: IUserRepository;
  constructor(userRepository: IUserRepository = new UserRepository()) {
    this.userRepository = userRepository;
  }

  public async login({ email, password }: ILoginDTO): Promise<IAuthResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw ApiError.conflict("User with provided email does not exists.");
    }
    const doesPassMatch = await bcrypt.compare(password, user.password);
    if (!doesPassMatch) {
      throw ApiError.unauthorized("Invalid credentials.");
    }
    const payload = { id: user._id.toString(), email: user.email };
    const accessToken = generateToken(payload, config.ACCESS_TOKEN_SECRET, config.ACCESS_TOKEN_EXPIRY_TIME);
    const refreshToken = generateToken(payload, config.REFRESH_TOKEN_SECRET, config.REFRESH_TOKEN_EXPIRY_TIME);
    return { accessToken, refreshToken };
  }

  public async register({ fullname, email, password }: IRegisterDTO): Promise<IAuthResponse> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw ApiError.conflict("An account with this email already exists.");
    }
    const user = await this.userRepository.create({ fullname, email, password });
    const payload = { id: user._id.toString(), email: user.email };
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
    const newPayload = { id: user._id.toString(), email: user.email };
    const accessToken = generateToken(newPayload, config.ACCESS_TOKEN_SECRET, config.ACCESS_TOKEN_EXPIRY_TIME);
    const refreshToken = generateToken(newPayload, config.REFRESH_TOKEN_SECRET, config.REFRESH_TOKEN_EXPIRY_TIME);
    return { accessToken, refreshToken };
  }

  public async changePassword({ currentPassword, newPassword, userId }: IChangePassServiceDTO): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw ApiError.conflict("User does not exists.");
    }
    const doesPassMatch = await bcrypt.compare(currentPassword, user.password);
    if (!doesPassMatch) {
      throw ApiError.badRequest("Incorrect password. Please enter your current password to continue.");
    }
    this.userRepository.update(userId, { password: newPassword });
  }
}

const authService = new AuthService();
export default authService;
