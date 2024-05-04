document.addEventListener("DOMContentLoaded", function () {
    let students = [];
    const tableBody = document.getElementById("studentTableBody");
  
    fetch('data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        students = data;
        populateTable(students);
      })
      .catch(error => {
        console.error('There was a problem fetching the data:', error);
      });
  
    function populateTable(data) {
      tableBody.innerHTML = "";
  
      data.forEach((student) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${student.id}</td>
          <td><img src="${student.img_src}" alt="${student.first_name}" /> ${student.first_name} ${student.last_name}</td>
          <td>${student.gender}</td>
          <td>${student.class}</td>
          <td>${student.marks}</td>
          <td>${student.passing ? "Passing" : "Failed"}</td>
          <td>${student.email}</td>
        `;
        tableBody.appendChild(row);
      });
    }
  
    document.getElementById("searchBtn").addEventListener("click", searchTable);
  
    document.getElementById("sortAZ").addEventListener("click", sortByNameAZ);
    document.getElementById("sortZA").addEventListener("click", sortByNameZA);
    document.getElementById("sortMarks").addEventListener("click", sortByMarks);
    document.getElementById("sortPassing").addEventListener("click", sortByPassing);
    document.getElementById("sortClass").addEventListener("click", sortByClass);
    document.getElementById("sortGender").addEventListener("click", sortByGender);
  
    function searchTable() {
      const searchInput = document.getElementById("searchInput").value.toLowerCase().trim();
      const filteredData = students.filter(student =>
        student.first_name.toLowerCase().includes(searchInput) ||
        student.last_name.toLowerCase().includes(searchInput) ||
        student.email.toLowerCase().includes(searchInput)
      );
  
      populateTable(filteredData);
    }
  
    function sortByNameAZ() {
      students.sort((a, b) => (a.first_name + a.last_name).localeCompare(b.first_name + b.last_name));
      populateTable(students);
    }
  
    function sortByNameZA() {
      students.sort((a, b) => (b.first_name + b.last_name).localeCompare(a.first_name + a.last_name));
      populateTable(students);
    }
  
    function sortByMarks() {
      students.sort((a, b) => a.marks - b.marks);
      populateTable(students);
    }
  
    function sortByPassing() {
      const passingStudents = students.filter(student => student.passing);
      populateTable(passingStudents);
    }
  
    function sortByClass() {
      students.sort((a, b) => a.class - b.class);
      populateTable(students);
    }
  
    function sortByGender() {
      const femaleStudents = students.filter(student => student.gender === "Female");
      const maleStudents = students.filter(student => student.gender === "Male");
      
      populateTable(femaleStudents.concat(maleStudents));
    }
  });
  