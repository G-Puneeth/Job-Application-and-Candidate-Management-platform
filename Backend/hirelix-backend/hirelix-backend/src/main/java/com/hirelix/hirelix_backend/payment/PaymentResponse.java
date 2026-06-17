package com.hirelix.hirelix_backend.payment;

public class PaymentResponse {

    private boolean paid;
    private String transactionId;
    private String message;

    public PaymentResponse(
            boolean paid,
            String transactionId,
            String message) {

        this.paid = paid;
        this.transactionId = transactionId;
        this.message = message;
    }

    public boolean isPaid() {
        return paid;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public String getMessage() {
        return message;
    }
}
