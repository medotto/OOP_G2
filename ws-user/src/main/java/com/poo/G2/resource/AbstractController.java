package com.poo.G2.resource;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public abstract class AbstractController {

    protected <T> ResponseEntity<T> buildSuccessOrNoContentResponse(T responseObject) {
        return new ResponseEntity<>(responseObject, responseObject != null
                ? HttpStatus.OK
                : HttpStatus.NO_CONTENT);
    }

}