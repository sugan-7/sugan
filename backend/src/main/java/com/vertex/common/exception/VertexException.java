package com.vertex.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class VertexException extends RuntimeException {

    private final HttpStatus status;
    private final String errorCode;

    public VertexException(String message, HttpStatus status, String errorCode) {
        super(message);
        this.status = status;
        this.errorCode = errorCode;
    }

    public VertexException(String message, HttpStatus status) {
        this(message, status, status.name());
    }

    public VertexException(String message) {
        this(message, HttpStatus.BAD_REQUEST, "BAD_REQUEST");
    }
}
