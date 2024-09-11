import { CommandResult } from '../../command-result';
import Subscriber from '../subscriber';
import { GenericBaseEvent } from '../types';
import { InMemoryPubSubNotifyResult } from './output';

export default class InMemoryPubSub {
  private subscribers: Record<string, Subscriber[]>;

  async notify(event: GenericBaseEvent): Promise<InMemoryPubSubNotifyResult> {
    const subscribers = this.subscribers[event.type]
    const results: CommandResult[] = []

    for (const subscriber of subscribers) {
      const result = await subscriber.notify(event)
      results.push(result);
    }

    return results;
  }

  addSubscriber(eventType: string, subscriber: Subscriber) {
    if (!this.subscribers[eventType]) this.subscribers[eventType] = [];
    this.subscribers[eventType].push(subscriber)
  }
}