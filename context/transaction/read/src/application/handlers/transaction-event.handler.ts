import { Inject, Injectable } from "@nestjs/common";
import { TransactionStatus } from "../../domain/enums/transaction-status.enum";
import {
  TransactionMongooseRepository,
  TransactionRepository,
} from "../../domain/repositories/transaction.repository";

@Injectable()
export class TransactionEventHandler {
  constructor(
    @Inject(TransactionMongooseRepository)
    private readonly transactionMongooseRepo: TransactionRepository,
  ) {}

  async updateTransactionReadDB(content: any) {
    const status = this.setStatus(content.isValid);
    await this.transactionMongooseRepo.updateStatus(content.id, status);
  }

  async createTransactionReadDB(content: any) {
    return await this.transactionMongooseRepo.save(content);
  }

  private setStatus(isValid: boolean): TransactionStatus {
    return isValid ? TransactionStatus.APPROVED : TransactionStatus.REJECTED;
  }
}
