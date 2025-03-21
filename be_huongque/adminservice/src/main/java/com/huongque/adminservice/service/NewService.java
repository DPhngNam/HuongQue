package com.huongque.adminservice.service;

import java.time.ZonedDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.huongque.adminservice.dto.NewDto;
import com.huongque.adminservice.model.New;
import com.huongque.adminservice.repository.NewRepository;

@Service
public class NewService {
    @Autowired
    private NewRepository newRepository;
    
    public New createNew(NewDto newDto) {
        New news = new New();
        news.setNewtitle(newDto.getNewtitle());
        news.setNewcontent(newDto.getNewcontent());
        news.setNewcreatedat(newDto.getNewcreatedat());
        news.setNewupdatedat(newDto.getNewupdatedat());
        return newRepository.save(news);
    }


    public New updateNew(NewDto newDto) {
        New news = new New();
        news.setNewtitle(newDto.getNewtitle());
        news.setNewcontent(newDto.getNewcontent());
        news.setNewcreatedat(newDto.getNewcreatedat());
        news.setNewupdatedat(newDto.getNewupdatedat());
        return newRepository.save(news);
    }

    public void deleteNew(UUID new_id) {
        newRepository.deleteById(new_id);
    }

    public New getNewByNewtitle(String newtitle) {
        return newRepository.findByNewtitle(newtitle);
    }
    public New getNewByNewcreatedat(ZonedDateTime newcreatedat) {
        return newRepository.findByNewcreatedat(newcreatedat);
    }

    public New getNewByNewupdatedat(ZonedDateTime newupdatedat) {
        return newRepository.findByNewupdatedat(newupdatedat);
    }

    public New getNewByNew_id(UUID new_id) {
        return newRepository.findByNew_id(new_id);
    }
    
    public New patchUpdateNew(UUID new_id, String field, Object value) {
        New existingNew = newRepository.findByNew_id(new_id);
        if (existingNew == null) {
            throw new RuntimeException("News item not found with id: " + new_id);
        }

        switch (field.toLowerCase()) {
            case "newtitle":
                existingNew.setNewtitle((String) value);
                break;
            case "newcontent":
                existingNew.setNewcontent((String) value);
                break;
            case "newupdatedat":
                existingNew.setNewupdatedat(ZonedDateTime.now());
                break;
            default:
                throw new RuntimeException("Invalid field name: " + field);
        }

        return newRepository.save(existingNew);
    }
}
