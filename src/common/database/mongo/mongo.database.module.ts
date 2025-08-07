import { DynamicModule, Global, Module } from '@nestjs/common';
import { DatabaseOptionService } from '@common/database/mongo/services/database.options.service';
import { DatabaseService } from '@common/database/mongo/services/database.service';

@Module({
    providers: [DatabaseOptionService],
    exports: [DatabaseOptionService],
    imports: [],
    controllers: [],
})
export class DatabaseOptionModule {}

@Global()
@Module({})
export class MongoDatabaseModule {
    static forRoot(): DynamicModule {
        return {
            module: MongoDatabaseModule,
            providers: [DatabaseService],
            exports: [DatabaseService],
            imports: [],
            controllers: [],
        };
    }
}
