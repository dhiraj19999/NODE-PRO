import fs from 'fs';


fs.writeFileSync('new-file.txt', 'Hello World!');


fs.appendFile('new-file.txt', '\nThis is a new line.', (err) => {
    if (err) {
        console.error('Error appending to file:', err);
        return;
    }
    console.log('File updated successfully!');
});