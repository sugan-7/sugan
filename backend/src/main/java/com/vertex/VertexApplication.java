package com.vertex;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class VertexApplication {

    public static void main(String[] args) {
        SpringApplication.run(VertexApplication.class, args);
    }
}
