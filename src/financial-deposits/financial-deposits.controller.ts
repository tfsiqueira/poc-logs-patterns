import { Controller, Post, Body, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { FinancialDepositsService } from './financial-deposits.service';

@Controller('financial-deposits')
export class FinancialDepositsController {
  constructor(private readonly financialDepositService: FinancialDepositsService) {}

  @Post()
  async createWithdrawal(@Body() withdrawalDto) {
    try {
      const { userId, amount } = withdrawalDto;
      const result = await this.financialDepositService.processFinancialDeposits(userId, amount);
      return { message: 'Financial deposits processed successfully', data: result };
    } catch (error) {
      throw new HttpException('Failed to process financial deposits', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}