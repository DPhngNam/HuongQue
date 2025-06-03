package com.huongque.logsservice.entity;

import java.util.Map;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "logs-index")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LogEntry {
    @Id
    private String id = UUID.randomUUID().toString();
    private String timestamp;
    private String service;
    private String level;
    private String message;
    private String userId;
    private String requestId;
    private Map<String, Object> metadata;
}
