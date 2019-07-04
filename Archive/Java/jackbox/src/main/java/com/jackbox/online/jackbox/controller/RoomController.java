package com.jackbox.online.jackbox.controller;


import com.jackbox.online.jackbox.entity.Room;
import com.jackbox.online.jackbox.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/Room")
public class RoomController {
    @Autowired
    RoomService roomService;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Room> getAllRooms()
    {
        return this.roomService.getAllRooms();
    }

    @RequestMapping(value = "/{id}", method= RequestMethod.GET)
    public Optional<Room> getRoom(@PathVariable int roomID)
    {
        return this.roomService.getRoomById(roomID);
    }
}
