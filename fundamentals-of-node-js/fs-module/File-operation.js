import fs from "fs";


// Rename file.txt → renamed.txt
fs.rename("file.txt", "renamed.txt", (err) => {
  if (err) throw err;
  console.log("✅ File renamed successfully");
});

// unlink delete files only not a folder

fs.unlink("unwanted.txt", (err) => {
  if (err) throw err;
  console.log("🗑️ File deleted successfully");
});


// Move file from root to 'moved/' folder
fs.rename("report.txt", "moved/report.txt", (err) => {
  if (err) throw err;
  console.log("📂 File moved successfully");
});

// Copy file.txt → file-copy.txt
fs.copyFile("file.txt", "file-copy.txt", (err) => {
  if (err) throw err;
  console.log("📄 File copied successfully");
});

//fs.rmdir() → Delete empty folders only (⚠️ deprecated)



fs.rmdir("empty-folder", (err) => {
  if (err) throw err;
  console.log("✅ Folder deleted");
});
//⚠️ Deprecated since Node v16+ Use fs.rm() instead.



//🔥 3. fs.rm() → ✅ Universal delete (file or folder) 📂 Delete folder recursively:
;

fs.rm("my-folder", { recursive: true, force: true }, (err) => {
  if (err) throw err;
  console.log("✅ Folder and contents deleted");
});

//📄 Delete file:

fs.rm("file.txt", (err) => {
  if (err) throw err;
  console.log("✅ File deleted");
});
//🆕 fs.rm() is the recommended way (since Node v14.14.0+)


fs.watch("file.txt",async (eventType, filename) => {
  if (filename) {
    console.log(`File changed: ${filename} (${eventType})`);
  } else {
    console.log("File changed");
  }

  if(eventType==="change"){
    fs.readFile("file.txt", "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }
      console.log("File content:", data); // This will print the updated content of the file
    });
  } 
});




//✅ 1️⃣ fs.mkdir() – Non-blocking (Recommended for real-world)

const fs = require("fs");

fs.mkdir("uploads", (err) => {
  if (err) {
    console.error("❌ Folder not created:", err.message);
  } else {
    console.log("✅ Folder 'uploads' created successfully");
  }
});



fs.stat("file.txt", (err, stats) => {
  if (err) {
    console.error("❌ Error:", err.message);
    return;
  }

  console.log("📄 File Size:", stats.size, "bytes");
  console.log("📅 Created At:", stats.birthtime);
  console.log("📅 Modified At:", stats.mtime);
  console.log("🧾 Is File?", stats.isFile());
  console.log("📁 Is Directory?", stats.isDirectory());
});