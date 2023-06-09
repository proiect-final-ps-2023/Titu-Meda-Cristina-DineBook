package com.nagarro.af.bookingtablesystem.controller.authentication.impl;

import com.nagarro.af.bookingtablesystem.controller.authentication.AuthenticationController;
import com.nagarro.af.bookingtablesystem.controller.authentication.request.AuthenticationRequest;
import com.nagarro.af.bookingtablesystem.controller.authentication.request.RegisterRequest;
import com.nagarro.af.bookingtablesystem.controller.authentication.response.AuthenticationResponse;
import com.nagarro.af.bookingtablesystem.service.authentication.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200", exposedHeaders = {"Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"}, allowCredentials = "true")
public class AuthenticationControllerImpl implements AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationControllerImpl(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @Override
    public ResponseEntity<AuthenticationResponse> register(RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @Override
    public ResponseEntity<AuthenticationResponse> login(AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
}
