const http = require("http");
const path = require("path");
const fs = require("fs").promises;
const formidable = require("formidable");

http
  .createServer(async (req, res) => {
    if (req.url === "/") {
      res.end("Hello World!");
    }

    if (req.url === "/home") {
      if (req.method.toLowerCase() === "get") {
        const filePath = path.join(__dirname, "text.txt");
        // console.log(__dirname);
        // console.log(filePath);
        const data = await fs.readFile(filePath, "utf-8");
        res.end(data);
      }
    }

    if (req.url === "/about") {
      if (req.method.toLowerCase() === "post") {
        const form = formidable({
          multiples: true,
        });
        form.parse(req, async (error, fields, files) => {
          if (error) {
            res.writeHead(error.httpCode || 400);
            res.end(String(error));
          }
          console.log(fields, files);
          const data = JSON.parse(
            await fs.readFile(files.file.filepath, "utf-8")
          );
          data.push(fields);
          const filePath = path.join(__dirname, "contacts.json");
          await fs.writeFile(filePath, JSON.stringify(data), "utf-8");
          res.end(JSON.stringify(data));
        });
      }
    }

    if (req.url === "/contact") {
      if (req.method.toLowerCase() === "get") {
        const filePath = path.join(__dirname, "contacts.json");
        const data = JSON.parse(await fs.readFile(filePath, "utf-8"));
        const obj = {
          id: "11",
          name: "Alex Gowards",
          email: "Donec.elementum@scelerisquescelerisquedui.ua",
          phone: "(748) 206-2681",
        };
        data.push(obj);
        await fs.writeFile(filePath, JSON.stringify(data), "utf-8");
        res.end(JSON.stringify(data));
      }
    }
  })
  .listen(3001, () => {
    console.log("Server is running");
  });
