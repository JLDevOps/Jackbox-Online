package com.jackbox.online.jackbox.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import com.jackbox.online.jackbox.entity.Room;
//import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
//public interface RoomDao extends JpaRepository<Room_ID, Server_URL, Game_Mode, App_ID, Amount_Of_Players, Amount_Of_Audience> {
public interface RoomDao extends JpaRepository<Room, Integer> {
}
