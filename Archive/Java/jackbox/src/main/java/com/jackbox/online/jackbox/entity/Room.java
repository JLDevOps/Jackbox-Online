package com.jackbox.online.jackbox.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="Jackbox_Room")
public class Room {
    @Column(name="ID")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name="Room_ID", nullable = true, length = 50)
    private String roomId;

    @Column(name="Server_URL", nullable = true, length = 255)
    private String serverURL;

    @Column(name="Game_Mode", nullable = true, length = 255)
    private String gameMode;

    @Column(name="App_ID", nullable = true, length = 255)
    private String appID;

    @Column(name="Amount_Of_Players", nullable = true, length = 50)
    private Integer amntOfPlayers;

    @Column(name="Amount_Of_Audience", nullable = true, length = 50)
    private Integer amntOfAudience;

    @Column(name="LastUpdated", nullable = true, length = 100)
    private Date lastUpdated;

    @Column(name="RoomActive", nullable = true, length = 50)
    private Boolean roomActive;

    public Room(String roomId, String serverURL, String gameMode, String appID, Integer amntOfAudience, Integer amntOfPlayers,Boolean roomActive)
    {
        this.roomId = roomId;
        this.serverURL = serverURL;
        this.gameMode = gameMode;
        this.appID = appID;
        this.amntOfAudience = amntOfAudience;
        this.amntOfPlayers = amntOfPlayers;
        this.roomActive = roomActive;
    }

    protected Room()
    {

    }

    public String getRoomId() {
        return roomId;
    }
    public void setRoomId(String roomId)
    {
        this.roomId = roomId;
    }

    public String getServerURL()
    {
        return serverURL;
    }
    public void setServerURL(String serverURL)
    {
        this.serverURL = serverURL;
    }

    public String getGameMode()
    {
        return gameMode;
    }
    public void setGameMode(String gameMode)
    {
        this.gameMode = gameMode;
    }

    public String getAppID()
    {
        return appID;
    }
    public void setAppID(String appID)
    {
        this.appID = appID;
    }

    public Integer getAmntOfPlayers()
    {
        return amntOfPlayers;
    }
    public void setAmntOfPlayers(Integer amntOfPlayers)
    {
        this.amntOfPlayers = amntOfPlayers;
    }

    public Integer getAmntOfAudience()
    {
        return amntOfAudience;
    }
    public void setAmntOfAudience(Integer amntOfAudience)
    {
        this.amntOfAudience = amntOfAudience;
    }

    public Boolean getRoomActive()
    {
        return roomActive;
    }
    public void setRoomActive(Boolean roomActive)
    {
        this.roomActive = roomActive;
    }


    @Override
    public String toString() {
        return "Room {" + "id=" + id + ", roomCode=" + roomId + ", serverURL=" + serverURL + ", gameMode=" + gameMode + ", appID=" + appID + ", amountOfPlayers=" + amntOfPlayers + ", amountOfAudience=" + amntOfAudience + "}";
    }



}
