import { BaseEvent } from '../types';

export default interface EventStore {
  append<ResourceType extends string, StreamId extends string | number>(
    resourceType: ResourceType,
    streamId: StreamId,
    events: BaseEvent<string,  StreamId, Record<string,unknown>, ResourceType, number>[],
  ): Promise<void>;
  
  loadEventStream<ResourceType extends string, StreamId extends string | number>(
    resourceType: ResourceType,
    streamId: StreamId,
    skipEvents: number, 
    maxCount: number
  ): Promise<EventStream<ResourceType, StreamId>>
}

export interface EventStream<ResourceType extends string, StreamId extends string | number> {
  version: number;
  list: BaseEvent<string, StreamId, Record<string,unknown>, ResourceType, number>[];
}