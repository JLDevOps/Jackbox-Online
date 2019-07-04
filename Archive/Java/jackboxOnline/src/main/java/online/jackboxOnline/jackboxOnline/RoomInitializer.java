package online.jackboxOnline.jackboxOnline;

import online.jackboxOnline.jackboxOnline.model.RoomInterface;
import online.jackboxOnline.jackboxOnline.model.Room;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.stream.Stream;

@Component
class RoomInitializer implements CommandLineRunner {
    @Autowired
    private final RoomInterface roomInterface;

    public static String[] alphabet = {"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N","O", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"};
    public static String getJackbox(String roomCode) {
        StringBuffer content = new StringBuffer();
        try {
            URL url = new URL("https://blobcast.jackboxgames.com/room/" + roomCode);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            //System.out.println((con.getResponseCode()));
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            return content.toString();

        } catch (Exception ex) {
            System.out.println(ex.toString());
        }
        return content.toString();
    }
    public static String[] getAllLists(String[] elements, int lengthOfList) {
        String[] allLists = new String[(int)Math.pow(elements.length, lengthOfList)];
        if(lengthOfList == 1) return elements;
        else
        {
            String[] allSublists = getAllLists(elements, lengthOfList - 1);
            int arrayIndex = 0;

            for(int i = 0; i < elements.length; i++)
            {
                for(int j = 0; j < allSublists.length; j++)
                {
                    allLists[arrayIndex] = elements[i] + allSublists[j];
                    arrayIndex++;
                }
            }

            return allLists;
        }
    }

    public RoomInitializer(RoomInterface roomInterface){
        this.roomInterface = roomInterface;
    }

    @Override
    public void run( String... strings ) throws Exception {
        roomInterface.deleteAll();

        String[] list = getAllLists(alphabet, 4);
        for (int i = 0; i < list.length; i++)
        {
            String roomCodeText = list[i];


            //roomInterface.save(new Room(roomCode));

            //Room room = roomInterface.findByRoomCode(roomCode);
            Room room = Room.builder()
                    .roomCode(roomCodeText)
                    .gameType("Test")
                    .build();
            roomInterface.save(room);

        }

        roomInterface.findAll().forEach(System.out::println);

    }
}
