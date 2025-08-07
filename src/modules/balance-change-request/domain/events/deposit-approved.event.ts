import { UniqueEntityID } from '@libs/domain/unique-entity-id';
import { BaseDomainEvent, DomainEventMetadata } from '@libs/domain';

type DepositApprovedPayload = {
    requestId: UniqueEntityID<string | number>;
    approvedBy: UniqueEntityID<string | number>;
    approvedAt: Date;
    remark?: string;
    occurredAt: Date;
};

export class DepositApprovedDomainEvent extends BaseDomainEvent {
    readonly eventName = 'deposit.approved';
    readonly payload: DepositApprovedPayload;

    constructor(
        payload: DepositApprovedPayload,
        aggregateId: UniqueEntityID<string | number>,
        metadata?: DomainEventMetadata
    ) {
        super({ aggregateId, metadata });
        this.payload = payload;
    }
}
