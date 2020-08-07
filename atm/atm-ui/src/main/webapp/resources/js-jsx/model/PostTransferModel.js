function PostTransferModel(fromAccountNumber, toAccountNumber, transferAmount) {
    this.fromAccountNumber = fromAccountNumber;
    this.toAccountNumber = toAccountNumber;
    this.transferAmount = transferAmount;
    this.responseStatus = null;
    this.fromBalance = null;
    this.toBalance = null;
}
