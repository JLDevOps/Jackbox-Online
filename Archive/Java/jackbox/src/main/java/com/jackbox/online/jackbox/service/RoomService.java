package com.jackbox.online.jackbox.service;

import com.jackbox.online.jackbox.dao.RoomDao;
import com.jackbox.online.jackbox.entity.Room;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {
    @Autowired
    RoomDao roomDao;

    public List<Room> getAllRooms() {
        return this.roomDao.findAll();
    }

    public Optional<Room> getRoomById(int id)
    {
        return this.roomDao.findById(id);
    }

    public Room updateRoom(Room room)
    {
        return this.roomDao.save(room);
    }

    public void deleteRoomByRoomCode(int roomID)
    {
        this.roomDao.deleteById(roomID);
    }
}
