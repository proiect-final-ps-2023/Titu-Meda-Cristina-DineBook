package com.nagarro.af.bookingtablesystem.controller.authentication.request;

import com.nagarro.af.bookingtablesystem.annotation.UniqueEmail;
import com.nagarro.af.bookingtablesystem.annotation.UniqueUsername;
import jakarta.validation.constraints.NotEmpty;

public class RegisterRequest {
    @NotEmpty(message = "Full name is mandatory!")
    private String fullName;
    @NotEmpty(message = "Email is mandatory!")
    @UniqueEmail
    private String email;
    @NotEmpty(message = "Username is mandatory!")
    @UniqueUsername
    private String username;
    @NotEmpty(message = "Password is mandatory!")
    private String password;
    @NotEmpty(message = "Role is mandatory!")
    private String role;
    private String phoneNo;
    private String country;
    private String city;

    public RegisterRequest() {
    }

    public RegisterRequest(String fullName, String email, String username, String password, String role, String phoneNo, String country, String city) {
        this.fullName = fullName;
        this.email = email;
        this.username = username;
        this.password = password;
        this.role = role;
        this.phoneNo = phoneNo;
        this.country = country;
        this.city = city;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
