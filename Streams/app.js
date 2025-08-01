import fs from 'fs';
// Creating a readable stream with 20KB chunk size
const stream=fs.createReadStream("./video.mp4",{
  highWaterMark: 20 * 1024, // 20KB   // 1024 = 1KB, means one chunk will be 20KB means one time  pe 20kb data read hogi

});

/*
🎧 Listening to Stream Events
A stream emits events that let us react as data comes in:
⚙️ Options in createReadStream()
path: Path of the file to read.
highWaterMark: Size (in bytes) of each data chunk.
(Default: 64 KB for files)

✅ Use Case
Perfect when:
Reading large media files
Streaming logs
Streaming data from APIs or file-based databases

*/
let count = 0; // Initialize a counter for chunks
stream.on("data", (chunk) => {
    fs.appendFileSync("./data.mp4",chunk); // Append each chunk to the file, but this is not a recommended practice
    // console.log(chunk); // Log the chunk
  console.log('New chunk received:', chunk.byteLength, 'bytes');// Log the size of each chunk
  console.log(chunk); // Log the chunk
    count++; // Increment the chunk counter
});

stream.on("end", () => {
    console.log(`Stream ended. Total chunks received: ${count}`); // Log the total number of chunks received
  console.log("Stream ended");
 
});

// counts shows that in how many chunks file is read or in how much round file is read
//  so count value will be file size in bytes / chunk size 