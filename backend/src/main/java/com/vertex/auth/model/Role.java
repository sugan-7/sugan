package com.vertex.auth.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "roles")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Role {

    @Id
    @Column(length = 50)
    private String id; // e.g. ROLE_ATHLETE, ROLE_COACH, ROLE_ADMIN

    @Column(nullable = false)
    private String description;
}
