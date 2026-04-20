// Fake database
const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "ABC Pvt Ltd",
    location: "Chennai",
    salary: "5 LPA",
    description: "Work on UI development using HTML, CSS, JS"
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "XYZ Ltd",
    location: "Bangalore",
    salary: "6 LPA",
    description: "Work with Node.js and APIs"
  }
];

// Load jobs
if (document.getElementById("jobList")) {
  displayJobs(jobs);
}

function displayJobs(jobArray) {
  const jobList = document.getElementById("jobList");
  jobList.innerHTML = "";

  jobArray.forEach(job => {
    jobList.innerHTML += `
      <div class="job-card">
        <span class="save-icon" onclick="saveJob(${job.id})">❤️</span>

        <h3>${job.title}</h3>
        <p>${job.company}</p>
        <p>${job.location}</p>

        <span class="badge">${job.type}</span>
        <span class="badge">${job.salary}</span>

        <br><br>

        <button class="card-btn view-btn" onclick="viewJob(${job.id})">View</button>
      </div>
    `;
  });
}

// View job
function viewJob(id) {
  localStorage.setItem("selectedJob", id);
  window.location.href = "job-detail.html";
}

// Job detail
if (document.getElementById("jobDetail")) {
  const id = localStorage.getItem("selectedJob");
  const job = jobs.find(j => j.id == id);

  // LEFT SIDE
  document.getElementById("jobDetail").innerHTML = `
    <h2>${job.title}</h2>
    <p><strong>Company:</strong> ${job.company}</p>
    <p><strong>Location:</strong> ${job.location}</p>
    <p><strong>Salary:</strong> ${job.salary}</p>

    <h3>Job Description</h3>
    <p>${job.description}</p>

    <h3>Requirements</h3>
    <ul>
      <li>Good knowledge of HTML, CSS, JavaScript</li>
      <li>Basic understanding of web development</li>
      <li>Problem solving skills</li>
    </ul>
  `;

  // RIGHT SIDE (DYNAMIC 🔥)
  document.getElementById("jobSide").innerHTML = `
    <h3>Job Overview</h3>
    <p><strong>Location:</strong> ${job.location}</p>
    <p><strong>Salary:</strong> ${job.salary}</p>
    <p><strong>Type:</strong> ${job.type}</p>

  `;
}
// Search
function searchJobs() {
  const search = document.getElementById("search").value.toLowerCase();

  const filtered = jobs.filter(job =>
    job.title.toLowerCase().includes(search) ||
    job.location.toLowerCase().includes(search)
  );

  displayJobs(filtered);
}

// Apply
function applyJob(e) {
  e.preventDefault();

  const application = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    resume: document.getElementById("resume").value
  };

  let apps = JSON.parse(localStorage.getItem("applications")) || [];
  apps.push(application);

  localStorage.setItem("applications", JSON.stringify(apps));

  alert("Application submitted!");
}
function saveJob(id) {
  let saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
  if (!saved.includes(id)) {
    saved.push(id);
    localStorage.setItem("savedJobs", JSON.stringify(saved));
    showToast("Job saved!");
  } else {
    showToast("Already saved!");
  }
}
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
}
function filterJobs() {
  const loc = document.getElementById("locationFilter").value;
  const type = document.getElementById("typeFilter").value;

  const filtered = jobs.filter(job => {
    return (loc === "" || job.location === loc) &&
           (type === "" || job.type === type);
  });

  displayJobs(filtered);
}