import { UniqueEntityID } from '@libs/domain/unique-entity-id';
import { BaseDomainEvent, DomainEventMetadata } from '@libs/domain';

type WithdrawalRejectedPayload = {
    requestId: UniqueEntityID<string | number>;
    rejectedBy: UniqueEntityID<string | number>;
    rejectedAt: Date;
    reason?: string;
    occurredAt: Date;
};

export class WithdrawalRejectedDomainEvent extends BaseDomainEvent {
    readonly eventName = 'withdrawal.rejected';
    readonly payload: WithdrawalRejectedPayload;

    constructor(
        payload: WithdrawalRejectedPayload,
        aggregateId: UniqueEntityID<string | number>,
        metadata?: DomainEventMetadata
    ) {
        super({ aggregateId, metadata });
        this.payload = payload;
    }
}
