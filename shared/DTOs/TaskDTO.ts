export interface TaskDTO {
    id: number | null,
    name: string,
    description: string,
    stage: number,
    index: number,
    deadline: Date | null
}


export function defaultTaskDTO(): TaskDTO {
    return {
        id: null,
        name: '',
        description: '',
        stage: 0,
        index: 0,
        deadline: null
    }
}