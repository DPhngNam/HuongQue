package com.huongque.logsservice.contronller;

import java.time.Instant;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.huongque.logsservice.entity.LogEntry;
import com.huongque.logsservice.repository.LogRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/logs")
@RequiredArgsConstructor
public class LogController {
    private final LogRepository logRepository;

    @PostMapping
    public ResponseEntity<String> createLog(@RequestBody LogEntry logEntry) {
        logEntry.setTimestamp(Instant.now().toString());
        if (logEntry.getId() == null || logEntry.getId().isEmpty()) {
            logEntry.setId(null); // Let Elasticsearch generate the ID
        }
        logRepository.save(logEntry);
        return ResponseEntity.ok("Log stored");
    }

    @GetMapping
    public List<LogEntry> getLogs() {
        return (List<LogEntry>) logRepository.findAll();
    }
}
