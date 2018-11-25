package online.jackboxOnline.jackboxOnline.model;

import lombok.*;

import javax.persistence.*;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "rooms")
public class Room {
    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String roomCode;
    private String gameType;
    private String appID;
    private Integer playerAmount;
    private Integer audienceAmount;
    private String joinAble;
    private String locked;
    private Instant lastUpdated;
    private String online;

    public void setRoomCode(String roomCode){
        this.roomCode = roomCode;
    }
    public String getRoomCode(){
        return roomCode;
    }
    public void setGameType(String gameType){
        this.gameType = gameType;
    }
    public String getGameType(){
        return gameType;
    }
    public void setAppID(String appID){
        this.appID = appID;
    }
    public String getAppID(){
        return appID;
    }
    public void setPlayerAmount(Integer playerAmount){
        this.playerAmount = playerAmount;
    }
    public Integer getPlayerAmount(){
        return playerAmount;
    }
    public void setAudienceAmount(Integer audienceAmount){
        this.audienceAmount = audienceAmount;
    }
    public Integer getAudienceAmount(){
        return audienceAmount;
    }
    public void setJoinAble(String joinAble){
        this.joinAble = joinAble;
    }
    public String getJoinAble(){
        return joinAble;
    }
    public void setLocked(String locked){
        this.locked = locked;
    }
    public String getLocked(){
        return locked;
    }
    public void setLastUpdated(Instant lastUpdated){
        this.lastUpdated = lastUpdated;
    }
    public Instant getLastUpdated(){
        return lastUpdated;
    }
    public void setOnline(String online){
        this.online = online;
    }
    public String getOnline(){
        return online;
    }

//    public Room() {
//    }
//    public Room(String roomCode, String gameType, String appID, Integer playerAmount, Integer audienceAmount,
//                String joinAble, String locked, Instant lastUpdated, String online) {
//        this.roomCode = roomCode;
//        this.gameType = gameType;
//        this.appID = appID;
//        this.playerAmount = playerAmount;
//        this.audienceAmount = audienceAmount;
//        this.joinAble = joinAble;
//        this.locked = locked;
//        this.lastUpdated = lastUpdated;
//        this.online = online;
//    }

    @Override
    public String toString() {
        return String.format ("Room[id=%s, roomCode='%s', gameType='&s']", id, roomCode, gameType);
    }

}
