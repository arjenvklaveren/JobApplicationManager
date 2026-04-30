export interface NoteDTO {
    id: number,
    targetId: number,
    targetType: NoteTargetType
    title: string,
    information: string,
}

//Mimic the enum in schema.prisma
export enum NoteTargetType {
    COMPANY,
    POSITION,
    APPLICATION,
}