const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.set("view engine", "pug");

app.get("/", (req, res) => {
	fs.readdir(__dirname, { withFileTypes: true }, (err, files) => {
		if (err) {
			res.status(500).send("An error occurred while reading the directory.");
			return;
		}

		let directories = files.filter((file) => file.isDirectory());
		const dirsToExclude = [".git", "node_modules", "views"];
		directories = directories.filter(
			(dir) => !dirsToExclude.includes(dir.name)
		);
		res.render("index", { directories: directories });
	});
});

app.use(express.static(__dirname));

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
