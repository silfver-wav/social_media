package com.example.socialmediaserver.model;

import javax.persistence.*;
import java.io.File;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.UUID;

/**
 * Model class for message.
 */
@Entity
@Table(name = "Message")
public class Message implements Comparable<Message> {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "BINARY(16)", unique = true, nullable = false)
    private UUID id;

    @Column
    private String text;

    @Column
    private File file;

    @Lob
    @Column(name = "imagedata", length = 1000)
    private byte[] imageData;

    @Column
    private String sender;

    @Column
    private String receiver;

    @Column
    private LocalDateTime timeStamp;

    public Message(UUID id, String text, File file, String sender, String receiver, LocalDateTime timeStamp) {
        this.id = id;
        this.text = text;
        this.file = file;
        this.sender = sender;
        this.receiver = receiver;
        this.timeStamp = timeStamp;
    }

    public Message() {}

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public LocalDateTime getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(LocalDateTime timeStamp) {
        this.timeStamp = timeStamp;
    }

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }

    @Override
    public int compareTo(Message o) {
        return getTimeStamp().compareTo(o.getTimeStamp());
    }

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", text='" + text + '\'' +
                ", file=" + file +
                ", imageData=" + Arrays.toString(imageData) +
                ", sender='" + sender + '\'' +
                ", receiver='" + receiver + '\'' +
                ", timeStamp=" + timeStamp +
                '}';
    }
}
