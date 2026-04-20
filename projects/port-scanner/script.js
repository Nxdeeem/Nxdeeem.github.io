function scan() {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Scanning... ⏳";

  setTimeout(() => {
    const ports = [
      { port: 21, status: "Closed" },
      { port: 22, status: "Open" },
      { port: 80, status: "Open" },
      { port: 443, status: "Open" },
      { port: 3306, status: "Closed" }
    ];

    let output = "<h3>Results:</h3>";

    ports.forEach(p => {
      output += `<p>Port ${p.port}: 
        <span class="${p.status === "Open" ? "open" : "closed"}">
        ${p.status}</span></p>`;
    });

    resultDiv.innerHTML = output;
  }, 2000);
}