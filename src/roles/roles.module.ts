import { Module } from '@nestjs/common';
import { RolesHttpModule } from '@/roles/presentation/http/';

@Module({
  imports: [RolesHttpModule],
})
export class RolesModule {}
