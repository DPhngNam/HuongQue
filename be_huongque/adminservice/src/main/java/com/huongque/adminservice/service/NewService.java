package com.huongque.adminservice.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.huongque.adminservice.model.New;
import com.huongque.adminservice.dto.NewDto;
@Service
public class NewService {
    public List<New> getAllNews() {
        return null;
    }

    public New getNewById(String new_id) {
        return null;
    }

    public void addNew(NewDto newDto) {
    }

    public void updateNew(String new_id, NewDto newDto) {
    }

    public void deleteNew(String new_id) {
    }

    public List<New> searchNews(String title) {
        return null;
    }

    public List<New> searchNewsByDate(LocalDateTime from, LocalDateTime to) {
        return null;
    }

    public List<New> searchNewsByContent(String content) {
        return null;
    }

    public List<New> searchNewsByTitleAndContent(String title, String content) {
        return null;
    }
}
