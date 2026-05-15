import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseService<
    TDTO,
    TCreateInput,
    TUpdateInput,
    TEntity
> {
    constructor(
        protected repository: any,
        protected toDTO: (entity: TEntity) => TDTO,
    ) { }
    
    async getAll(accountId: number): Promise<TDTO[]> {
        const entities = await this.repository.getAll(accountId);
        return entities.map(this.toDTO);
    }

    async create(dto: TDTO, accountId: number) {
        const createInput = this.mapCreate(dto, accountId);

        return this.repository.create(createInput);
    }

    async update(dto: TDTO) {
        const updateInput = this.mapUpdate(dto);

        return this.repository.update(
            { id: dto['id'] },
            updateInput,
        );
    }

    async delete(id: number, accountId: number) {
        return this.repository.delete({
            id,
            accountId,
        });
    }

    protected abstract mapCreate(
        dto: TDTO,
        accountId: number,
    ): TCreateInput;

    protected abstract mapUpdate(
        dto: TDTO,
    ): TUpdateInput
}
