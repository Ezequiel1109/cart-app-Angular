import { createAction, props } from "@ngrx/store";

export const load = createAction('load');
export const findAll = createAction('findAll', props<{products: any}>());