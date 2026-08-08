package com.vertex.common.exception;

import com.vertex.common.dto.FieldErrorDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.util.List;

@Getter
public class ValidationException extends VertexException {

    private final List<FieldErrorDto> fieldErrors;

    public ValidationException(String message, List<FieldErrorDto> fieldErrors) {
        super(message, HttpStatus.BAD_REQUEST, "VALIDATION_FAILED");
        this.fieldErrors = fieldErrors;
    }

    public ValidationException(String message) {
        this(message, List.of());
    }
}
