import { randomUUID } from 'crypto';
import { PaymentMethod } from '../enums/payment-method.enum';
import { RequestStatus } from '../enums/request-status.enum';
import { RequestType } from '../enums/request-type.enum';
import { Money } from '../value-objects/money.vo';
import { BaseAggregateRoot, BaseEntityProps } from '@libs/domain';
import { DepositRequestedDomainEvent } from '../events/deposit-requested.event';
import { UniqueEntityID } from '@libs/domain/unique-entity-id';
import { ArgumentNotProvidedException } from '@libs/exceptions';

export interface BalanceChangeRequestProps extends BaseEntityProps<string> {
    userId: UniqueEntityID<string>;
    type: RequestType;
    amount: Money;
    method: PaymentMethod;
    status: RequestStatus;
    remark?: string;
    reason?: string;
    approvedAt?: Date;
    rejectedAt?: Date;
}

export interface BalanceChangeRequestInterface {
    approve(): void;
    reject(): void;
    markAsProcessed(): void;
}

export class BalanceChangeRequest
    extends BaseAggregateRoot<string, BalanceChangeRequestProps>
    implements BalanceChangeRequestInterface
{
    constructor(props: BalanceChangeRequestProps) {
        const now = new Date();
        const status = RequestStatus.PENDING;

        super({
            id: props.id || new UniqueEntityID<string>(randomUUID()),
            createdAt: props.createdAt || now,
            updatedAt: props.updatedAt || now,
            props: { status, ...props },
            audit: {
                createdBy: props.userId.getValue(),
                updatedBy: props.userId.getValue(),
            },
        });

        this.validate();

        if (this.props.type === RequestType.DEPOSIT) {
            const event = new DepositRequestedDomainEvent(
                {
                    requestId: this._id,
                    userId: this.props.userId,
                    amount: this.props.amount,
                    paymentMethod: this.props.method,
                    occurredAt: now,
                },
                this._id,
                {
                    timestamp: now.getTime(),
                    userId: this.props.userId.getValue(),
                    causationId: this._id.getValue(),
                    correlationId: randomUUID(),
                }
            );

            this.addDomainEvent(event);
        }
    }

    public validate(): void {
        if (!this.props.userId) {
            throw new ArgumentNotProvidedException('userId is required');
        }
        if (!this.props.amount) {
            throw new ArgumentNotProvidedException('amount is required');
        }
        if (!this.props.type) {
            throw new ArgumentNotProvidedException('type is required');
        }
        if (!this.props.method) {
            throw new ArgumentNotProvidedException('method is required');
        }
        if (!this.props.status) {
            throw new ArgumentNotProvidedException('status is required');
        }
    }

    public getUserId(): UniqueEntityID<string> {
        return this.props.userId;
    }

    public getType(): RequestType {
        return this.props.type;
    }

    public getAmount(): Money {
        return this.props.amount;
    }

    public getMethod(): PaymentMethod {
        return this.props.method;
    }

    public getStatus(): RequestStatus {
        return this.props.status;
    }

    public getRemark(): string | undefined {
        return this.props.remark;
    }

    public getReason(): string | undefined {
        return this.props.reason;
    }

    public getApprovedAt(): Date | undefined {
        return this.props.approvedAt;
    }

    public getRejectedAt(): Date | undefined {
        return this.props.rejectedAt;
    }

    public approve(): void {
        this.props.status = RequestStatus.APPROVED;
        this.props.approvedAt = new Date();
        this.markUpdated();
    }

    public reject(): void {
        this.props.status = RequestStatus.REJECTED;
        this.props.rejectedAt = new Date();
        this.markUpdated();
    }

    public markAsProcessed(): void {
        this.props.status = RequestStatus.PROCESSED;
        this.markUpdated();
    }
}
