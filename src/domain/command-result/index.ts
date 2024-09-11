export interface SuccessResult<ResultType extends string, Payload extends Record<string, unknown>> {
  type: ResultType;
  success: true;
  payload: Payload
}

export interface ErrorResult<ResultType extends string, Payload extends Record<string, unknown>> {
  type: ResultType;
  success: false;
  payload: Payload
}

export type CommandResult = SuccessResult<string, Record<string, unknown>> | ErrorResult<string, Record<string, unknown>>