import { AggregateRoot } from './aggregate-root.base';
import { BaseDomainEvent } from './domain-event.base';
import { UniqueEntityID } from './unique-entity-id';

// domain/events/DomainEvents.ts
export class DomainEvents {
    private static handlersMap: {
        [key: string]: Array<(event: BaseDomainEvent) => void>;
    } = {};
    private static markedAggregates: AggregateRoot<any, any>[] = [];

    public static markAggregateForDispatch(
        aggregate: AggregateRoot<any, any>
    ): void {
        const exists = !!this.findMarkedAggregateByID(aggregate.id);
        if (!exists) {
            this.markedAggregates.push(aggregate);
        }
    }

    private static dispatchAggregateEvents(
        aggregate: AggregateRoot<any, any>
    ): void {
        aggregate.domainEvents.forEach(event => this.dispatch(event));
    }

    private static removeAggregateFromMarkedDispatchList(
        aggregate: AggregateRoot<any, any>
    ): void {
        const index = this.markedAggregates.findIndex(a =>
            a.id.equals(aggregate.id)
        );
        this.markedAggregates.splice(index, 1);
    }

    private static findMarkedAggregateByID(
        id: UniqueEntityID<string | number>
    ): AggregateRoot<any, any> {
        return this.markedAggregates.find(a => a.id.equals(id));
    }

    public static dispatchEventsForAggregate(
        id: UniqueEntityID<string | number>
    ): void {
        const aggregate = this.findMarkedAggregateByID(id);
        if (aggregate) {
            this.dispatchAggregateEvents(aggregate);
            aggregate.clearEvents();
            this.removeAggregateFromMarkedDispatchList(aggregate);
        }
    }

    public static register(
        callback: (event: BaseDomainEvent) => void,
        eventName: string
    ): void {
        if (!this.handlersMap[eventName]) {
            this.handlersMap[eventName] = [];
        }
        this.handlersMap[eventName].push(callback);
    }

    private static dispatch(event: BaseDomainEvent): void {
        const eventName = event.eventName;
        const handlers = this.handlersMap[eventName] || [];
        for (const handler of handlers) {
            handler(event);
        }
    }

    public static clearHandlers(): void {
        this.handlersMap = {};
    }

    public static clearMarkedAggregates(): void {
        this.markedAggregates = [];
    }
}
