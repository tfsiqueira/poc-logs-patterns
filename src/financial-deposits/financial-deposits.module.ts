import { Module } from '@nestjs/common';
import { FinancialDepositsService } from './financial-deposits.service';
import { FinancialDepositsController } from './financial-deposits.controller';

@Module({
  providers: [FinancialDepositsService],
  controllers: [FinancialDepositsController]
})
export class FinancialDepositsModule {}
