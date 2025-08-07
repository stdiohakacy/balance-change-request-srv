import { UniqueEntityID } from './unique-entity-id';

export interface DomainEventInterface {
    dateTimeOccurred: Date;
    getAggregateId(): UniqueEntityID<string | number>;
}

export type DomainEventMetadata = {
    readonly timestamp: number;
    readonly causationId?: string;
    readonly correlationId?: string;
    readonly userId?: string;
};

export abstract class BaseDomainEvent implements DomainEventInterface {
    public readonly id: string;
    public readonly metadata: DomainEventMetadata;
    public readonly aggregateId: UniqueEntityID<string | number>;
    public readonly version: number = 1;

    constructor(props: {
        aggregateId: UniqueEntityID<string | number>;
        metadata?: DomainEventMetadata;
    }) {
        this.id = crypto.randomUUID();
        this.aggregateId = props.aggregateId;
        this.metadata = {
            timestamp: props?.metadata?.timestamp || Date.now(),
            causationId: props?.metadata?.causationId,
            userId: props?.metadata?.userId,
        };
    }

    abstract get eventName(): string;

    get dateTimeOccurred(): Date {
        return new Date(this.metadata.timestamp);
    }

    getAggregateId(): UniqueEntityID<string | number> {
        return this.aggregateId;
    }
}
