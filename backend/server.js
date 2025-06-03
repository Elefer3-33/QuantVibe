const express = require("express");
const bodyParser = require("body-parser");
const xlsx = require("xlsx");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// Function to write data to Excel
function saveToExcel(email) {
  const filePath = "./emails.xlsx";

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    jsonData.push({ Email: email });
    const newWorksheet = xlsx.utils.json_to_sheet(jsonData);
    workbook.Sheets[workbook.SheetNames[0]] = newWorksheet;

    xlsx.writeFile(workbook, filePath);
  } else {
    // Create a new Excel file if it doesn't exist
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet([{ Email: email }]);
    xlsx.utils.book_append_sheet(workbook, worksheet, "Emails");
    xlsx.writeFile(workbook, filePath);
  }
}

// Route to handle sign-up
app.post("/api/signup", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  saveToExcel(email);
  res.status(200).json({ message: "Email registered successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

