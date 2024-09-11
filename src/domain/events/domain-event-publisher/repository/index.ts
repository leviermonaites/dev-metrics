import { GenericBaseEvent } from '../../types';

export default interface DomainEventPublisherRepository {
  saveEvents(events: GenericBaseEvent[]): Promise<void>
}