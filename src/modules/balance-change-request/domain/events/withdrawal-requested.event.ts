import { UniqueEntityID } from '@libs/domain/unique-entity-id';
import { PaymentMethod } from '../enums/payment-method.enum';
import { Money } from '../value-objects/money.vo';
import { BaseDomainEvent, DomainEventMetadata } from '@libs/domain';

type WithdrawalRequestedPayload = {
    requestId: UniqueEntityID<string | number>;
    userId: UniqueEntityID<string | number>;
    amount: Money;
    paymentMethod: PaymentMethod;
    occurredAt: Date;
};

export class WithdrawalRequestedDomainEvent extends BaseDomainEvent {
    readonly eventName = 'withdrawal.requested';
    readonly payload: WithdrawalRequestedPayload;

    constructor(
        payload: WithdrawalRequestedPayload,
        aggregateId: UniqueEntityID<string | number>,
        metadata?: DomainEventMetadata
    ) {
        super({ aggregateId, metadata });
        this.payload = payload;
    }
}
