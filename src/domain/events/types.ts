export type BaseEvent<EventType extends string, StreamId extends string | number, Payload extends Record<string, unknown>, ResourceType extends string, SchemaVersion extends number, Source extends string> = {
  id: string;
  type: EventType;
  resourceType: ResourceType
  streamId: StreamId;
  streamVersion: number;
  payload: Payload;
  schemaVersion: SchemaVersion;
  timestamp: Date;
  source: Source;
}

export type GenericBaseEvent = BaseEvent<string, string | number, Record<string, unknown>, string, number, string>