![image](https://github.com/Harshit10bisht/dneuron-split-notes/assets/54449818/14cd7ef6-02dd-4ce5-a75d-d4598fc19018)

Main application link :
https://dneuron-split-notes-client.vercel.app/

The backend is deployed in this link :
https://dneuron-split-notes-server.vercel.app

In case, if you want to take a look at the overall code, please refer to this :
https://github.com/Harshit10bisht/dneuron-split-notes

Steps to operate :
** These panels are resizable. You can resize it using the cursor pointer provided when you hover in dividing blue lines between them vertically and horizontally.
1) Three sections as split and resizeable panels are present.
    a) Operations : Contains button to operate on data present or to be there in MongoDB.
    b) Enter Notes Here : Enter note here to get inserted or updated. If empty, it will alert to enter text.
    c) Last 5 inserted results : Last 5 inserted notes or updated ones will be presented here.
2) Buttons for operations :
    a) Add : If any note written, it will insert into MongoDB, else if empty, it will alert to enter text.
    b) Update : It will update last inserted note, which is visible in results section.
    c) Delete All : It will delete all notes saved till now in MongoDB.
    d) Count : It will reflect the number of counts notes are either updated or added per the session of a user. It will be only visible for 2 seconds.

Used Tech : Node.js, Express.js, ReactJS, Vite, MongoDB, Mongoose, CORS, Vercel, etc.
