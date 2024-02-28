import { Injectable, Logger } from '@nestjs/common';

interface ExternalServiceResponse {
    status: string;
}

@Injectable()
export class FinancialDepositsService {
    private readonly logger = new Logger(FinancialDepositsService.name);
  
    async processFinancialDeposits(userId, amount) {
      const requestId = this.generateRequestId();
      try {
        this.log('INFO', userId, requestId, 'financialDeposits', `Financial Deposit initiated for user ${userId}`, amount);
  
        // Simulando a chamada para o serviço externo
        const externalServiceResponse = await this.callExternalFinancialDepositService(userId, amount) as ExternalServiceResponse;
        this.log('INFO', userId, requestId, 'financialDeposits', `Financial Deposit processed for user ${userId}`, amount, externalServiceResponse.status);
  
        return { requestId, status: 'success', amount };
      } catch (error) {
        this.log('ERROR', userId, requestId, 'financialDeposits', `Error processing Financial Deposit for user ${userId}: ${error.message}`, amount, 'failed');
        throw error;
      }
    }
  
    private generateRequestId() {
      // Gera um ID de transação único. Na prática, use algo mais robusto.
      return `txn_${Date.now()}`;
    }
  
    private async callExternalFinancialDepositService(userId, amount) {
      // Simulação de uma chamada a um serviço externo de depositos
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ status: 'success' });
        }, 1000); // Simula uma operação assíncrona
      });
    }

    private log(level, userId, requestId, eventType, message, amount, status = null) {
        const logEntry = JSON.stringify({
          timestamp: new Date().toISOString(),
          level,
          requestId,
          eventType,
          message,
          userId,
          amount,
          currency: 'BRL',
          status,
          ipAddress: '192.168.1.1',
          userAgent: 'Mozilla/5.0...'
        });
    
        switch (level) {
          case 'ERROR':
            this.logger.error(logEntry);
            break;
          case 'WARN':
            this.logger.warn(logEntry);
            break;
          case 'DEBUG':
            this.logger.debug(logEntry);
            break;
          default:
            this.logger.log(logEntry); // Usado para INFO e outros níveis não especificados
        }
      }
    }
  
//   {
//     "timestamp": "2024-02-22T12:34:56.789Z",
//     "level": "INFO", #  (DEBUG, INFO, WARNING, ERROR, CRITICAL) 
//     "requestId": "abc123",
//     "eventType": "withdrawal", # withdrawal| financialDeposits
//     "message": "Withdrawal request processed",
//     "userId": "user123",
//     "merchantId": "merchant456",
//     "amount": 100.00,
//     "currency": "BRL",
//     "status": "success",
//     "ipAddress": "192.168.1.1",
//     "userAgent": "Mozilla/5.0..."
//   }
  