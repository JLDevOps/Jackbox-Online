package online.jackboxOnline.jackboxOnline.controller;
import online.jackboxOnline.jackboxOnline.model.Room;
import online.jackboxOnline.jackboxOnline.model.RoomInterface;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.Collection;


@RestController
@RequestMapping("/api")
public class RoomController {
    private final Logger log = LoggerFactory.getLogger(RoomController.class);
    private RoomInterface roomInterface;

    public RoomController(RoomInterface roomInterface){
        this.roomInterface = roomInterface;
    }

    @GetMapping("/room")
    Collection<Room> rooms() {
        return roomInterface.findAll();
    }

    @GetMapping("/room/{roomCode}")
    ResponseEntity<?> getRoom(@PathVariable String roomCode) {
        try {
            Room room = roomInterface.findByRoomCode(roomCode);
            return ResponseEntity.ok().body(room);
        } catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
