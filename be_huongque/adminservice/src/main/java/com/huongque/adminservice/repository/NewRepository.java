package com.huongque.adminservice.repository;

import java.time.ZonedDateTime;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.huongque.adminservice.model.New;
@Repository
public interface NewRepository extends JpaRepository<New, UUID> {
    @Query("SELECT n FROM New n WHERE n.newtitle = :newtitle")
    New findByNewtitle(@Param("newtitle") String newtitle);


    @Query("SELECT n FROM New n WHERE n.newcreatedat = :newcreatedat")
    New findByNewcreatedat(@Param("newcreatedat") ZonedDateTime newcreatedat);

    @Query("SELECT n FROM New n WHERE n.newupdatedat = :newupdatedat")
    New findByNewupdatedat(@Param("newupdatedat") ZonedDateTime newupdatedat);

    @Query("SELECT n FROM New n WHERE n.new_id = :new_id")
    New findByNew_id(@Param("new_id") UUID new_id);
}
