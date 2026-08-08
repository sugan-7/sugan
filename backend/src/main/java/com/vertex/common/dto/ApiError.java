package com.vertex.common.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiError {

    @Builder.Default
    private boolean success = false;

    private int status;

    private String error;

    private String message;

    private String correlationId;

    @Builder.Default
    private Instant timestamp = Instant.now();

    private List<FieldErrorDto> fieldErrors;
}
