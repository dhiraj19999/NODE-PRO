import fs from 'fs';

const stream=fs.createReadStream("./video.mp4", {
  highWaterMark: 20 * 1024, // 20KB
});

// stream.bytesRead is a property available on readable streams (like fs.createReadStream) in Node.js.
//It tells you how many bytes have been read from the stream so far.
stream.on("data", (chunk) => {
 

/*if(chunk.byteLength ==stream.highWaterMark) {
   fs.appendFileSync("./video2.mp4", chunk);
    stream.pause()  ///  stream get paused after writing the first  chunk to the file that is 20KB
    console.log("chunk written"); 
  }*/
 

if(stream.highWaterMark === stream.bytesRead) {
  fs.writeFileSync("./video2.mp4", chunk);// writeFileSync first chunk add hoga then for next chunk stream.bytesRead goes to 20kb plus and highWaterMark is 20kb 
  
}else{
    fs.appendFileSync("./video2.mp4", chunk); // so after each 1 second the chunks get appended to the end of existing file
}
stream.pause();
setTimeout(() => {
  stream.resume(); // Resume the stream after a delay
}, 1000);
});


console.log(stream.readbleFlowing); // Check if the stream is flowing rteunr true or false
//  // stream.readableFlowing is true when the stream is actively flowing data so for now it 
// print // true because we are reading the data from the stream that is emiter is on

console.log(stream.readbleEnded); // Check if the stream has ended
// stream.readableEnded is true when the stream has ended, meaning no more data will be emitted
//  // so for now it print false because we are still reading the data from the stream that is emiter is on

console.log(stream.isPaused()); // Check if the stream is paused
// stream.isPaused() returns true if the stream is paused, false otherwise
// so for now it print false because we are not pausing the stream


stream.on("resume", () => {
  console.log("Stream resumed"); // ye strim resume hone par ye event trigger hoga
});
stream.on("pause", () => {
  console.log("Stream paused"); // ye strim pause hone par ye event trigger hoga
});

stream.on("end", () => {
    console.log(stream.readbleFlowing); //  return true
    console.log(stream.readbleEnded); // return true
    console.log(stream.isPaused()); // return false because not paused its ended
  console.log("Stream ended");
});


