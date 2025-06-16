package com.huongque.notiservice.repository;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.huongque.notiservice.entities.AdminNotification;
@Repository
public interface AdminNotiRepository extends JpaRepository<AdminNotification, UUID> {

}
