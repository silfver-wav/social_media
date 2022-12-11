package com.socialmedia.logservice.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Model class for personal log.
 */
@Entity
@Table(name = "PersonalLog")
public class PersonalLog implements Comparable<PersonalLog> {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "BINARY(16)", unique = true, nullable = false)
    private UUID id;
    @Column
    private String msg;
    @Column
    private String userName;

    @Column
    private LocalDateTime date;

    @JsonCreator
    public PersonalLog(UUID id, String msg, String userName, LocalDateTime date) {
        this.id = id;
        this.msg = msg;
        this.userName = userName;
        this.date = date;
    }

    public PersonalLog() {}

    public UUID getId() {
        return id;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    @JsonIgnore
    @Override
    public int compareTo(PersonalLog o) {
        return getDate().compareTo(o.getDate());
    }
}
