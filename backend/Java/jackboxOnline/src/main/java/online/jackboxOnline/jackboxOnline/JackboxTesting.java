//package online.jackboxOnline.jackboxOnline;
//
//import java.io.BufferedReader;
//import java.io.InputStreamReader;
//import java.net.HttpURLConnection;
//import java.net.URL;
//
//public class JackboxTesting {
//
//    public static String[] alphabet = {"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N","O", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"};
//
//    public static String getJackbox(String roomCode) {
//        StringBuffer content = new StringBuffer();
//        try {
//            URL url = new URL("https://blobcast.jackboxgames.com/room/" + roomCode);
//            HttpURLConnection con = (HttpURLConnection) url.openConnection();
//            con.setRequestMethod("GET");
//            System.out.println((con.getResponseCode()));
//            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
//            String inputLine;
//            while ((inputLine = in.readLine()) != null) {
//                content.append(inputLine);
//            }
//            in.close();
//            return content.toString();
//
//        } catch (Exception ex) {
//            System.out.println(ex.toString());
//        }
//        return content.toString();
//    }
//
//    public static String[] getAllLists(String[] elements, int lengthOfList)
//    {
//        String[] allLists = new String[(int)Math.pow(elements.length, lengthOfList)];
//        if(lengthOfList == 1) return elements;
//        else
//        {
//            String[] allSublists = getAllLists(elements, lengthOfList - 1);
//            int arrayIndex = 0;
//
//            for(int i = 0; i < elements.length; i++)
//            {
//                for(int j = 0; j < allSublists.length; j++)
//                {
//                    allLists[arrayIndex] = elements[i] + allSublists[j];
//                    arrayIndex++;
//                }
//            }
//
//            return allLists;
//        }
//    }
//
//    //Database Schema for info found with the query:
//    // roomID/server/Game/AppID/NumPlayers/NumAudience/JoinAs
//    /*
//    {
//	"roomid": "AANO",
//	"server": "i-015c56a89b6871e56.jackboxgames.com",
//	"apptag": "drawful",
//	"appid": "2mxdl6sfowcxflxrm9ai9udc",
//	"numPlayers": 0,
//	"numAudience": 0,
//	"joinAs": "player"
//	}
//     */
//
//    public static void main(String[] args) {
//        //char[] alphabet = new char[] {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' };
//        String[] list = getAllLists(alphabet, 4);
//        for (int i = 0; i < list.length; i++)
//        {
//            String jackboxRequest = getJackbox(list[i]);
//            System.out.println(jackboxRequest);
//        }
//
//    }
//
//}
//
//
//
//
//
