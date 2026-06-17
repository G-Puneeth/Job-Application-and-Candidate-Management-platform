package com.hirelix.hirelix_backend.payment;

import java.util.UUID;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @PostMapping("/checkout")
    public PaymentResponse checkout(
            @RequestBody PaymentRequest request) {

        if (request.getPlanId() == null
                || request.getPlanId().isBlank()
                || request.getAmount() == null
                || request.getAmount() <= 0
                || request.getCandidateEmail() == null
                || request.getCandidateEmail().isBlank()) {
            return new PaymentResponse(
                    false,
                    null,
                    "Invalid payment request");
        }

        return new PaymentResponse(
                true,
                "HLX-" + UUID.randomUUID(),
                "Payment completed");
    }
}
