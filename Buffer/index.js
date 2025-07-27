import fs from "fs/promises";

// Step 1: Read original image
const bufferContent = await fs.readFile("./doremon.jpg");

// Step 2: Convert buffer to base64 string
const base64String = bufferContent.toString("base64");

// Step 3: Write base64 string directly as image
await fs.writeFile("./doremon2.jpg", base64String, "base64");

// Step 4: Save base64 string to a .txt file (as text, not base64)
await fs.writeFile("./doremon.txt", base64String, "utf8");
console.log("Text file written successfully");

// Step 5: Read base64 string back from .txt
const base64FromTxt = await fs.readFile("./doremon.txt", "utf8");

// Step 6: Convert it back to image
await fs.writeFile("./doremon3.jpg", base64FromTxt, "base64");
console.log("Image restored from text successfully");



const z=await fs.readFile("text.txt");
console.log("z",z); // This will log the buffer content of text.txt that is <Buffer 61 62 63>

console.log("z.toString()", z.toString("utf8")); // This will log the string content of text.txt that is abc
console.log("z.toString('base64')", z.toString("base64")); // This will log the base64 encoded content of text.txt that is YWJj




/*

✅ Explanation of Your Code:
js
Copy
Edit
const z = await fs.readFile("text.txt"); 
z is a Buffer object that holds the binary representation of "abc".

1️⃣ console.log("z", z);
Logs the raw buffer:

php-template
Copy
Edit
<Buffer 61 62 63>
These are the ASCII values of a, b, and c:

a = 0x61

b = 0x62

c = 0x63

2️⃣ console.log("z.toString('utf8')", z.toString("utf8"));
This decodes the buffer as a UTF-8 string.

Output:

nginx
Copy
Edit
abc
✅ This is expected because abc is plain text and UTF-8 supports it.

3️⃣ console.log("z.toString('base64')", z.toString("base64"));
This converts the buffer into a Base64-encoded string.

Output:

nginx
Copy
Edit
YWJj
How?
abc in ASCII is:

a → 01100001

b → 01100010

c → 01100011

Concatenated bits: 01100001 01100010 01100011

When encoded to Base64: → YWJj

🔁 Bonus: Decode Back from Base64

const base64Text = "YWJj";
const buf = Buffer.from(base64Text, "base64");
console.log(buf.toString("utf8")); // abc
✅ Summary:
Operation	Output	Meaning
fs.readFile(...)	<Buffer>	Raw binary data
.toString("utf8")	abc	Human-readable string
.toString("base64")	YWJj	Safe string encoding of binary








*/


//  Example 

// 🔹 1. Frontend (Raw Image Upload via Fetch)
const file = document.querySelector('input[type="file"]').files[0];

fetch("http://localhost:5000/upload", {
  method: "POST",
  headers: {
    "Content-Type": file.type, // e.g. image/jpeg
  },
  body: file, // raw binary image
});


// 🔹 2. Backend (Express.js to Handle Upload)

import express from "express";
import mongoose from "mongoose";

const app = express();

// MongoDB Setup
mongoose.connect("mongodb://localhost:27017/imageupload", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ImageSchema = new mongoose.Schema({
  contentType: String,
  data: String, // Base64 string
});

const Image = mongoose.model("Image", ImageSchema);

// Route to receive raw image and save as base64
app.post("/upload", async (req, res) => {
  try {
    const chunks = [];

    req.on("data", (chunk) => {
      chunks.push(chunk);
    });

    req.on("end", async () => {
      const buffer = Buffer.concat(chunks);
      const base64 = buffer.toString("base64");

      const contentType = req.headers["content-type"]; // e.g. image/jpeg

      const saved = await Image.create({
        contentType,
        data: base64,
      });

      res.json({ message: "Image saved", id: saved._id });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(5000, () => console.log("Server running at http://localhost:5000"));


//🔹 3. ✅ MongoDB me jo data save hoga:

{
  "_id": "abc123",
  "contentType": "image/jpeg",
  "data": "/9j/4AAQSkZJRgABAQEAYABgAAD/..." // base64
}


// 🔄 Bonus: Image ko retrieve karke frontend pe dikhana ho?
app.get("/image/:id", async (req, res) => {
  const img = await Image.findById(req.params.id);
  res.set("Content-Type", img.contentType);
  res.send(Buffer.from(img.data, "base64"));
});

/*

🔸 1. Array me kyun store kiya chunks.push(chunk)?
➤ Reason:
Jab req.on("data", callback) chalega, to server ko poori file ek saath nahi milti. 
File chhote-chhote pieces (chunks) me aati hai.

👉 Isiliye har chunk ko ek array me push karte hain.

💡 Example:
Soch, user ne 3MB ki image bheji, to Node.js usse ho sakta hai 512KB ke 6 chunks me de:


chunk1 --> 512 KB  
chunk2 --> 512 KB  
...  
chunk6 --> 512 KB  
Isiliye:

const chunks = [];
req.on("data", (chunk) => {
  chunks.push(chunk); // Store each part
});
🔸 2. Buffer.concat(chunks) kya karta hai?
➤ Reason:
chunks ek array of Buffer hai. Hume usse ek single complete Buffer banana hota hai (i.e. full image data).


const fullBuffer = Buffer.concat(chunks);
💡 Example:
chunks = [<Buffer 00 ff>, <Buffer aa bb>, <Buffer cc dd>]

Buffer.concat(chunks) => <Buffer 00 ff aa bb cc dd>
🔁 Final Flow:
const chunks = [];

req.on("data", (chunk) => {
  chunks.push(chunk); // multiple parts
});

req.on("end", () => {
  const buffer = Buffer.concat(chunks); // complete image
  const base64 = buffer.toString("base64"); // convert to string
});


Bhai, Buffer ka matlab hai:

🔹 Binary data ko handle karne ka special object in Node.js
🔹 Jo raw memory me data ko store karta hai (like images, files, videos, etc.)

🔸 Simple Definition:
📦 Buffer ek aisa object hai jo raw binary data ko store karta hai — bina kisi encoding ke (like utf8, base64).

🔸 Why is Buffer needed in Node.js?
Because:

JavaScript strings sirf text ke liye ache hain.

But Node.js ko kaam hota hai non-text files ke sath bhi — like:

images

PDFs

audio/video

network streams

Tab JavaScript ka string system fail hota hai...
To Buffer ka use hota hai binary data ko read/write/store karne ke liye.

🔸 Example samajh:
js
Copy
Edit
const fs = require("fs");
const buffer = fs.readFileSync("photo.jpg");
console.log(buffer); // <Buffer ff d8 ff e0 00 10 ...> (image as binary)
Yeh Buffer type ka object hai — jo file ke har byte ko raw form me store karta hai.

🔸 Buffer key features:
Feature	Example
Raw binary data	<Buffer ff d8 ff e0 ...>
Not human-readable	Need to convert using .toString()
Memory-efficient	Direct memory use
Can be base64 converted	buffer.toString("base64")

🔁 Real-life Analogy:
String is like a cooked dish (human-friendly)

Buffer is like raw ingredients (computer memory-level)

To make text readable, you "cook" the buffer using .toString('utf8') or .toString('base64')

🔧 You create Buffer like this:

const buf = Buffer.from("abc");         // create from string
const base64 = buf.toString("base64");  // YWJj
✅ Summary:
Term	Meaning
Buffer	Node.js object to store & process binary data
Why needed?	To handle non-text data (image, file, network data)
.toString('utf8')	Converts binary to normal string
.toString('base64')	Converts to base64 format

*/


//  ✅ 1. Frontend: Send image as raw base64 or blob

  const file = document.querySelector('input[type="file"]').files[0];
const reader = new FileReader();

reader.onloadend = async () => {
  const base64 = reader.result.split(',')[1]; // remove data:image/jpeg;base64,
  
  const res = await fetch("http://localhost:5000/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image: base64 }),
  });

  const data = await res.json();
  console.log(data);
};

reader.readAsDataURL(file);
