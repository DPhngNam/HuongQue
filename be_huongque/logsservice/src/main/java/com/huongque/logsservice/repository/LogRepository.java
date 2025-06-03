package com.huongque.logsservice.repository;

import java.util.List;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.huongque.logsservice.entity.LogEntry;

public interface LogRepository extends ElasticsearchRepository<LogEntry, String> {
    List<LogEntry> findByService(String service);
    List<LogEntry> findByLevel(String level);
}
