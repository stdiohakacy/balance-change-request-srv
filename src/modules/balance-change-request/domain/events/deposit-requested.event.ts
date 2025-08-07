import { UniqueEntityID } from '@libs/domain/unique-entity-id';
import { PaymentMethod } from '../enums/payment-method.enum';
import { BaseDomainEvent, DomainEventMetadata } from '@libs/domain';
import { Money } from '../value-objects/money.vo';

type DepositRequestedPayload = {
    requestId: UniqueEntityID<string | number>;
    userId: UniqueEntityID<string | number>;
    amount: Money;
    paymentMethod: PaymentMethod;
    occurredAt: Date;
};

export class DepositRequestedDomainEvent extends BaseDomainEvent {
    readonly eventName = 'deposit.requested';
    readonly payload: DepositRequestedPayload;

    constructor(
        payload: DepositRequestedPayload,
        aggregateId: UniqueEntityID<string | number>,
        metadata?: DomainEventMetadata
    ) {
        super({ aggregateId, metadata });
        this.payload = payload;
    }
}
