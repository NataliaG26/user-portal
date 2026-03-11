import { LoginUseCase } from './application/use-cases/login.use-case';
import { AuthRepositoryPort } from './domain/ports/auth.repository.port';

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;
  let mockAuthRepository: jest.Mocked<AuthRepositoryPort>;
  let mockJwtService: { sign: jest.Mock };

  beforeEach(() => {
    mockAuthRepository = {
      login: jest.fn(),
    };
    mockJwtService = {
      sign: jest.fn().mockReturnValue('mock-jwt-token'),
    };
    loginUseCase = new LoginUseCase(mockAuthRepository, mockJwtService);
  });

  it('should return a JWT token on successful login', async () => {
    mockAuthRepository.login.mockResolvedValue('reqres-token');

    const token = await loginUseCase.execute('eve.holt@reqres.in', 'cityslicka');

    expect(mockAuthRepository.login).toHaveBeenCalledWith('eve.holt@reqres.in', 'cityslicka');
    expect(mockJwtService.sign).toHaveBeenCalledWith({ email: 'eve.holt@reqres.in' });
    expect(token).toBe('mock-jwt-token');
  });

  it('should throw an error if credentials are invalid', async () => {
    mockAuthRepository.login.mockRejectedValue(new Error('Invalid credentials'));

    await expect(loginUseCase.execute('wrong@email.com', 'wrongpassword'))
      .rejects
      .toThrow('Invalid credentials');
  });
});