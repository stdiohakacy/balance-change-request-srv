import { UniqueEntityID } from '@libs/domain/unique-entity-id';
import { BaseDomainEvent, DomainEventMetadata } from '@libs/domain';

type WithdrawalApprovedPayload = {
    requestId: UniqueEntityID<string | number>;
    approvedBy: UniqueEntityID<string | number>;
    approvedAt: Date;
    remark?: string;
    occurredAt: Date;
};

export class WithdrawalApprovedDomainEvent extends BaseDomainEvent {
    readonly eventName = 'withdrawal.approved';
    readonly payload: WithdrawalApprovedPayload;

    constructor(
        payload: WithdrawalApprovedPayload,
        aggregateId: UniqueEntityID<string | number>,
        metadata?: DomainEventMetadata
    ) {
        super({ aggregateId, metadata });
        this.payload = payload;
    }
}
