package com.hirelix.hirelix_backend.auth;

public class AuthResponse {

    private String token;
    private String role;
    private Long accountId;

    public AuthResponse(
            String token,
            String role,
            Long accountId) {

        this.token = token;
        this.role = role;
        this.accountId = accountId;
    }

    public String getToken() {
        return token;
    }

    public String getRole() {
        return role;
    }

    public Long getAccountId() {
        return accountId;
    }
}
