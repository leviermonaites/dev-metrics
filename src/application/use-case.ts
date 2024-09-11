import { CommandResult } from '../domain/command-result';

export default interface UseCase<Args, Output extends CommandResult> {
  execute(args: Args): Promise<Output>
}