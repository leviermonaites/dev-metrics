import { EntityManager } from 'typeorm';
import EventStore, { EventStream } from '../../../domain/events/event-store';
import { BaseEvent } from '../../../domain/events/types';

export default class TypeORMEventStore implements EventStore {
  constructor(private entityManager: EntityManager) { }

  async append<ResourceType extends string, StreamId extends string | number>(
    resourceType: ResourceType,
    streamId: StreamId,
    events: BaseEvent<
      string,
      StreamId,
      Record<string, unknown>,
      ResourceType,
      number
    >[]
  ): Promise<void> {
    if (!['Job', 'Pipeline'].includes(resourceType)) throw new Error('Unknown resource type')

    const eventsParameters = events.map((e) => [e.id, e.type, e.streamVersion, e.schemaVersion, JSON.stringify(e.payload), e.timestamp.toISOString()]).flat()

    await this.entityManager.query(`
      INSERT INTO events (
        resource_type,  
        stream_id, 
        event_id, 
        event_type, 
        stream_version, 
        schema_version, 
        payload, 
        timestamp
      ) VALUES ${eventsParameters.map((_v, i) => {
      const shouldIncludeStreamId = i === 0 || (i !== 0 && i % 6 === 0);
      const parameterPrefixValue = shouldIncludeStreamId ? '($1,$2,' : ',';
      const parameterPrefixValueCommaed = shouldIncludeStreamId && i !== 0 ? `,${parameterPrefixValue}` : parameterPrefixValue

      const shouldCloseCurrentParametersList = i !== 0 && (i + 1) % 6 === 0;

      return `${parameterPrefixValueCommaed}$${i + 3}${shouldCloseCurrentParametersList ? ')' : ''}`
    }).join('')}
    `, [resourceType, streamId, ...eventsParameters]);
  }

  async loadEventStream<ResourceType extends string, StreamId extends string | number>(resourceType: ResourceType, streamId: StreamId, skipEvents: number, maxCount: number): Promise<EventStream<ResourceType, StreamId>> {
    const events = await this.entityManager.query<{
      resourceType: ResourceType;
      streamId: StreamId;
      id: string;
      type: string;
      streamVersion: number;
      schemaVersion: number;
      payload: Record<string, unknown>;
      timestamp: Date;
    }[]>(`
      SELECT
        resource_type as "resourceType",  
        stream_id as "streamId", 
        event_id as id, 
        event_type as type, 
        stream_version as "streamVersion", 
        schema_version as "schemaVersion", 
        payload, 
        timestamp
      FROM events WHERE resource_type = $1 AND stream_id = $2
      ORDER BY stream_version DESC 
    `, [resourceType, streamId]);

    return {
      list: events,
      version: events[0].streamVersion
    }
  }
}