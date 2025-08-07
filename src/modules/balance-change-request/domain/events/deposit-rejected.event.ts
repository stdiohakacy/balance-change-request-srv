import { UniqueEntityID } from '@libs/domain/unique-entity-id';
import { BaseDomainEvent, DomainEventMetadata } from '@libs/domain';

type DepositRejectedPayload = {
    requestId: UniqueEntityID<string | number>;
    rejectedBy: UniqueEntityID<string | number>;
    rejectedAt: Date;
    reason?: string;
    occurredAt: Date;
};

export class DepositRejectedDomainEvent extends BaseDomainEvent {
    readonly eventName = 'deposit.rejected';
    readonly payload: DepositRejectedPayload;

    constructor(
        payload: DepositRejectedPayload,
        aggregateId: UniqueEntityID<string | number>,
        metadata?: DomainEventMetadata
    ) {
        super({ aggregateId, metadata });
        this.payload = payload;
    }
}
