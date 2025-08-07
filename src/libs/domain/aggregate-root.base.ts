import { BaseDomainEvent } from './domain-event.base';
import { DomainEvents } from './domain.event';
import { BaseEntity, BaseEntityProps } from './entity.base';
import { UniqueEntityID } from './unique-entity-id';

export abstract class BaseAggregateRoot<
    ID extends string | number,
    T extends BaseEntityProps<ID>,
> extends BaseEntity<T, ID> {
    private _domainEvents: BaseDomainEvent[] = [];

    get id(): UniqueEntityID<ID> {
        return this._id;
    }

    get domainEvents(): BaseDomainEvent[] {
        return this._domainEvents;
    }

    protected addDomainEvent(domainEvent: BaseDomainEvent): void {
        this._domainEvents.push(domainEvent);
        DomainEvents.markAggregateForDispatch(this);
        this.logDomainEventAdded(domainEvent);
    }

    public clearEvents(): void {
        this._domainEvents = [];
    }

    private logDomainEventAdded(domainEvent: BaseDomainEvent): void {
        const thisClass = Reflect.getPrototypeOf(this);
        console.info(
            `[Domain Event Created]: ${thisClass.constructor.name} -> ${domainEvent.eventName}`
        );
    }
}
