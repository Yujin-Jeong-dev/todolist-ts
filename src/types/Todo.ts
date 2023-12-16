export type TodoState = {
  id: string;
  title: string;
  content: string;
  isDone: boolean;
};

export type TodosState = TodoState[];
