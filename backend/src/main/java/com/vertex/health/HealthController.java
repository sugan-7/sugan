package com.vertex.health;

import com.vertex.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/health")
@RequiredArgsConstructor
@Tag(name = "System Health", description = "Endpoints for verifying application, database, and cache readiness")
public class HealthController {

    private final JdbcTemplate jdbcTemplate;
    private final RedisConnectionFactory redisConnectionFactory;

    @GetMapping("/ready")
    @Operation(summary = "System Readiness Health Check", description = "Checks database and cache connectivity")
    public ResponseEntity<ApiResponse<Map<String, Object>>> checkReadiness() {
        Map<String, Object> statusMap = new HashMap<>();
        statusMap.put("service", "vertex-backend");
        statusMap.put("version", "0.1.0-SNAPSHOT");
        statusMap.put("status", "UP");

        // Check PostgreSQL
        try {
            jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            statusMap.put("database", Map.of("status", "UP", "provider", "PostgreSQL"));
        } catch (Exception ex) {
            log.warn("Database health check failed: {}", ex.getMessage());
            statusMap.put("database", Map.of("status", "DOWN", "error", "Database connection unavailable"));
        }

        // Check Redis
        try {
            if (redisConnectionFactory != null && redisConnectionFactory.getConnection() != null) {
                statusMap.put("redis", Map.of("status", "UP", "role", "Cache & Rate Limiting"));
            } else {
                statusMap.put("redis", Map.of("status", "DEGRADED", "role", "Cache bypass active"));
            }
        } catch (Exception ex) {
            log.warn("Redis health check failed (degraded mode active): {}", ex.getMessage());
            statusMap.put("redis", Map.of("status", "DEGRADED", "note", "Operating in cache-bypass mode"));
        }

        return ResponseEntity.ok(ApiResponse.ok(statusMap, "VERTEX system is ready"));
    }
}
