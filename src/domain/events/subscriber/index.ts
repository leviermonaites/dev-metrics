import { ErrorResult, SuccessResult } from '../../command-result';
import { GenericBaseEvent } from '../types';

export default interface Subscriber {
  notify(event: GenericBaseEvent):
    Promise<SuccessResult<string, Record<string, unknown>> | ErrorResult<string, Record<string, unknown>>>
}