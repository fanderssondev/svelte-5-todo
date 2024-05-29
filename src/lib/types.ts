export interface TodoType {
   id: string,
   text: string,
   completed: boolean;
   userId: string,
}

export type Filter = 'all' | 'unfinished' | 'finished';