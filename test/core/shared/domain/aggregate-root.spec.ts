import { IDomainEvent } from '@/core/shared/domain/events/domain-event.interface';
import { Uuid } from '@/core/shared/domain/value-objects/uuid.vo';
import { AggregateRoot } from '@/core/shared/domain/aggregate-root';

class StubEvent implements IDomainEvent {
  eventVersion: number = 1;
  occurredOn: Date;

  constructor(
    public aggregateId: Uuid,
    public name: string,
  ) {
    this.occurredOn = new Date();
  }
}

class StubAggregateRoot extends AggregateRoot {
  aggregate_id: Uuid;
  name: string;
  field1: string;

  constructor(name: string, id: Uuid) {
    super();
    this.aggregate_id = id;
    this.name = name;
    this.registerHandler(StubEvent.name, this.onStubEvent.bind(this));
  }

  get entityId() {
    return this.aggregate_id;
  }

  operation() {
    this.name = this.name.toUpperCase();
    this.applyEvent(new StubEvent(this.aggregate_id, this.name));
  }

  onStubEvent(event: StubEvent) {
    this.field1 = event.name;
  }

  toJSON() {
    return {
      aggregate_id: this.aggregate_id,
      name: this.name,
      field1: this.field1,
    };
  }
}

describe('AggregateRoot Unit Tests', () => {
  test('Should dispatch events', () => {
    const id = new Uuid();
    const aggregate = new StubAggregateRoot('test name', id);
    aggregate.operation();
    expect(aggregate.field1).toBe('TEST NAME');
  });
});
