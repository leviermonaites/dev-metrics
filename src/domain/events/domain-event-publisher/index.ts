import InMemoryPubSub from '../in-memory-pubsub';
import { GenericBaseEvent } from '../types';
import { DomainEventPublisherSaveEventsResult } from './output';
import DomainEventPublisherRepository from './repository';

export default class DomainEventPublisher {
  private eventQueue: GenericBaseEvent[] = [];

  constructor(private inMemoryPubSub: InMemoryPubSub, private repository: DomainEventPublisherRepository) { }

  addEvent<Event extends GenericBaseEvent>(event: Event): void {
    this.eventQueue.push(event)
  }
  clearEvents(): void {
    this.eventQueue = []
  }

  async saveEvents(): Promise<DomainEventPublisherSaveEventsResult> {
    let aggResults: DomainEventPublisherSaveEventsResult = []
    for (const event of this.eventQueue) {
      const results = await this.inMemoryPubSub.notify(event);
      aggResults = aggResults.concat(results)
    }
    await this.repository.saveEvents(this.eventQueue)
    this.clearEvents()

    return aggResults;
  }
}