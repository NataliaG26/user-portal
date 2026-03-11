import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PostsController } from './infrastructure/controllers';
import { PostsPrismaRepository } from './infrastructure/repositories';
import { CreatePostUseCase } from './application/use-cases/create-post.use-case';
import { ListPostsUseCase } from './application/use-cases/list-posts.use-case';
import { GetPostByIdUseCase } from './application/use-cases/get-post-by-id.use-case';
import { UpdatePostUseCase } from './application/use-cases/update-post.use-case';
import { DeletePostUseCase } from './application/use-cases/delete-post.use-case';

/**
 * Posts module.
 * Handles CRUD operations for blog posts.
 * All routes require JWT authentication.
 */
@Module({
  imports: [JwtModule],
  controllers: [PostsController],
  providers: [
    PostsPrismaRepository,
    {
      provide: CreatePostUseCase,
      useFactory: (repo: PostsPrismaRepository) => new CreatePostUseCase(repo),
      inject: [PostsPrismaRepository],
    },
    {
      provide: ListPostsUseCase,
      useFactory: (repo: PostsPrismaRepository) => new ListPostsUseCase(repo),
      inject: [PostsPrismaRepository],
    },
    {
      provide: GetPostByIdUseCase,
      useFactory: (repo: PostsPrismaRepository) => new GetPostByIdUseCase(repo),
      inject: [PostsPrismaRepository],
    },
    {
      provide: UpdatePostUseCase,
      useFactory: (repo: PostsPrismaRepository) => new UpdatePostUseCase(repo),
      inject: [PostsPrismaRepository],
    },
    {
      provide: DeletePostUseCase,
      useFactory: (repo: PostsPrismaRepository) => new DeletePostUseCase(repo),
      inject: [PostsPrismaRepository],
    },
  ],
})
export class PostsModule {}