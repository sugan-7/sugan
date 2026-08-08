package com.vertex.audit.service;

import com.vertex.audit.model.AuditLog;
import com.vertex.audit.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuditService {

    private final AuditLogRepository auditLogRepository;

    public void logEvent(UUID actorId, String action, String resourceType, String resourceId, String ipAddress, String userAgent, String details) {
        try {
            AuditLog auditLog = AuditLog.builder()
                    .actorId(actorId)
                    .action(action)
                    .resourceType(resourceType)
                    .resourceId(resourceId)
                    .ipAddress(ipAddress)
                    .userAgent(userAgent)
                    .details(details)
                    .build();
            auditLogRepository.save(auditLog);
            log.info("Audit log recorded: action={}, resourceType={}, actorId={}", action, resourceType, actorId);
        } catch (Exception ex) {
            log.error("Failed to record audit log: {}", ex.getMessage(), ex);
        }
    }
}
