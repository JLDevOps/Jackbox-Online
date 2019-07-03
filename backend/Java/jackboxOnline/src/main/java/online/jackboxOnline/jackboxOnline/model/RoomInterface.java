package online.jackboxOnline.jackboxOnline.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoomInterface extends MongoRepository<Room, String> {
    Room findByRoomCode(String roomCode);
}
