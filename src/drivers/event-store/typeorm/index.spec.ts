import { DataSource, EntityManager, QueryRunner } from 'typeorm';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { getDatasource } from '../../typeorm';
import TypeORMEventStore from '.';
import { BaseEvent } from '../../../domain/events/types';

describe('TypeORMEventStore', () => {
  let datasource: DataSource;
  let queryRunner: QueryRunner;
  let entityManager: EntityManager;

  let eventStore: TypeORMEventStore;

  beforeAll(async () => {
    datasource = await getDatasource();
    queryRunner = datasource.createQueryRunner();
    entityManager = queryRunner.manager;

    await queryRunner.startTransaction()

    eventStore = new TypeORMEventStore(entityManager)
  })

  afterAll(async () => {
    await datasource.destroy()
  })

  it('should be able to save and load events', async () => {
    const events: BaseEvent<
      string,
      string,
      Record<string, unknown>,
      'Job',
      number
    >[] = [];

    for (let i = 0; i < 10; i++) {
      events.push({
        id: `event-id-${i}`,
        payload: {
          test: `event-${i}`
        },
        resourceType: 'Job',
        schemaVersion: 1,
        streamId: '12345',
        streamVersion: i + 1,
        timestamp: new Date(),
        type: 'JobStatusChanged'
      })
    }

    await eventStore.append('Job', '12345', events)
    const loadedEvents = await eventStore.loadEventStream('Job', '12345', 0, -1);

    expect(loadedEvents).toEqual<typeof loadedEvents>({ version: 10, list: events.sort((a, b) => b.streamVersion - a.streamVersion) as typeof loadedEvents['list'] })
  })
})