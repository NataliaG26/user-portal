import { CreatePostUseCase } from './application/use-cases/create-post.use-case';
import { DeletePostUseCase } from './application/use-cases/delete-post.use-case';
import { PostRepositoryPort } from './domain/ports/post.repository.port';

const mockPost = {
  id: 1,
  title: 'Test post',
  content: 'Test content here',
  authorUserId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('CreatePostUseCase', () => {
  let createPostUseCase: CreatePostUseCase;
  let mockPostRepository: jest.Mocked<PostRepositoryPort>;

  beforeEach(() => {
    mockPostRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    createPostUseCase = new CreatePostUseCase(mockPostRepository);
  });

  it('should create a post successfully', async () => {
    mockPostRepository.create.mockResolvedValue(mockPost);

    const result = await createPostUseCase.execute({
      title: 'Test post',
      content: 'Test content here',
      authorUserId: 1,
    });

    expect(mockPostRepository.create).toHaveBeenCalledWith({
      title: 'Test post',
      content: 'Test content here',
      authorUserId: 1,
    });
    expect(result).toEqual(mockPost);
  });
});

describe('DeletePostUseCase', () => {
  let deletePostUseCase: DeletePostUseCase;
  let mockPostRepository: jest.Mocked<PostRepositoryPort>;

  beforeEach(() => {
    mockPostRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    deletePostUseCase = new DeletePostUseCase(mockPostRepository);
  });

  it('should delete a post successfully', async () => {
    mockPostRepository.findById.mockResolvedValue(mockPost);
    mockPostRepository.delete.mockResolvedValue();

    await deletePostUseCase.execute(1);

    expect(mockPostRepository.findById).toHaveBeenCalledWith(1);
    expect(mockPostRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw if post not found', async () => {
    mockPostRepository.findById.mockResolvedValue(null);

    await expect(deletePostUseCase.execute(999))
      .rejects
      .toThrow('Post 999 not found');
  });
});