import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { CommonModule } from 'src/common/common.module';
import { MigrationApiKeySeed } from 'src/migration/seeds/migration.api-key.seed';

@Module({
  imports: [CommonModule, CommandModule],
  providers: [MigrationApiKeySeed],
  exports: [],
})
export class MigrationModule {}
