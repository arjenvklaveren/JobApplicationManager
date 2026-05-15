import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseRepository<
    TCreate,
    TUpdate,
    TWhereUnique,
    TEntity>
{
    constructor(protected prismaModel: any, protected baseIncludes?: object) { }
    
    async getAll(accountId: number): Promise<TEntity[]> {
        return await this.prismaModel.findMany({
            where: { accountId },
            include: this.baseIncludes
        });
    }

    async create(data: TCreate): Promise<TEntity> {
        return await this.prismaModel.create({
            data
        });
    }

    async update(where: TWhereUnique, data: TUpdate): Promise<TEntity> {
        return await this.prismaModel.update({
            where,
            data
        });
    }

    async delete(where: TWhereUnique): Promise<TEntity> {
        return this.prismaModel.delete({
            where
        })
    }
}
