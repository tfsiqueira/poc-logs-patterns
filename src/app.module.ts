import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FinancialDepositsModule } from './financial-deposits/financial-deposits.module';

@Module({
  imports: [FinancialDepositsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
