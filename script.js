function applyTailwindStyles(user, assignments) {
  // Apply Tailwind CSS classes to elements on the page
  // Example: Adding Tailwind CSS classes to elements
  const userElement = $(".user-info");
  userElement.html(`
      <div class="bg-blue-500 text-white p-4 mt-5 rounded">
        <h2 class="text-lg font-bold">User: ${user.name}</h2>
       <div class="text-sm">Email: ${user.email}</div>

      </div>
    `);

  const assignmentList = $(".assignment-list");
  assignmentList.html(`
      <div class="grid grid-cols-2 gap-4">
        ${assignments
          .map(
            (assignment) => `
          <div class="bg-gray-200 p-4 rounded shadow">
            <h3 class="text-lg font-bold">${JSON.stringify(assignment)}</h3>
          </div>
        `
          )
          .join("")}
      </div>
    `);
}

function createTableRow(item) {
  return `
    <tr class="hover:bg-red-200 cursor-pointer text-center">
    <td><a class="hover:bg-gray-600 "> <div class="form-control">
    <label class="cursor-pointer label"> 
      <input type="checkbox" checked="checked" class="checkbox checkbox-primary">
    </label>
  </div></a></td>
    <td>${item.id}</td>
    <td>${item.key}</td>  
    <td>${item.parent}</td>  
    <td>${item.position}</td>  
      <td>${item.percentage}</td> 
      <td> 1 </td>
      <td> 0 </td>
      <td> 3 </td>
      <td> 4 </td>
      <td>${item.title}</td>
    </tr>
  `;
}

console.log("Hello, Canvas LMS!");
class DatabaseField {
  constructor(id, name, dataType) {
    this.id = id;
    this.name = name;
    this.dataType = dataType;
  }
}

const keyword = [];

async function fetchDatabaseFields() {
  const url =
    "https://base.jollycares.com/api/database/rows/table/509/?user_field_names=true";

  try {
    const token = setBearerToken();
    if (!token) {
      console.error("Bearer token not available.");
      return null;
    }

    const response = await fetch(url, {
      headers: {
        Authorization: token,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();

    this.keyword = data.results.map((item) => {
      return this.createTableRow(item);
    });

    $("#place").html(this.keyword);
    console.log("Database fields data:", this.keyword);
    // Process the JSON data and store it in a class
    const databaseFields = data.map(
      (field) => new DatabaseField(field.id, field.name, field.dataType)
    );

    return databaseFields;
  } catch (error) {
    console.error("Error fetching database fields:", error);
    return null;
  }
}

(function () {
  // Save reference to original open function
  // console.log("Intercepted request to:", 676767);

  const originalOpen = XMLHttpRequest.prototype.open;

  // Intercept and modify requests
  XMLHttpRequest.prototype.open = function (method, url) {
    console.log("Intercepted request to:", url);
    if (url.startsWith("https://base.jollycares.com")) {
      const token = setBearerToken();
      if (token) {
        this.setRequestHeader("Authorization", token);
      }
    }
    return originalOpen.apply(this, arguments);
  };
})();

// Example usage:
fetchDatabaseFields().then((fields) => {
  if (fields) {
    console.log("Database fields:", fields);
    // You can further process or use the database fields here
  } else {
    console.log("Failed to fetch database fields.");
  }
});

function loadTailwindCSS() {
  // Create link tags for Tailwind CSS base styles
  const link = $("<link>", {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/npm/daisyui@4.10.1/dist/full.min.css",
    type: "text/css",
  });

  // Append link tag to the head of the document
  $("head").append(link);
  const link1 = $("<link>", {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/npm/tailwindcss@3.4.3/base.min.css",
    type: "text/css",
  });

  const script = $("<script>", {
    src: "https://cdn.tailwindcss.com",
    type: "text/javascript",
  });

  // Append script tag to the head of the document
  $("head").append(script);

  // Append link tags to the head of the document
  $("head").append(link1);
}

$(document).ready(function () {
  // Your code here
  // This function will be executed when the DOM is fully loaded
  console.log("Hello, Canvas LMS!");
  if (true) {
    loadScript(
      "https://cdn.jsdelivr.net/gh/travzforall/education@main/service.js"
    )
      .then(() => {
        // Now you can use the userService object
        console.log("User data:");

        userService
          .fetchUserData(userId)
          .then((userData) => {
            console.log("User data:", userData);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      })
      .catch((error) => {
        console.error("Error loading script:", error);
      });
    // if (window.location.pathname.includes("/courses/")) {
    // Load necessary resources and manipulate the page
    loadTailwindCSS(); // Load Tailwind CSS
    setTimeout(function () {
      applyTailwindStyles(user, assignments); // Apply Tailwind styles
    }, 500); // Delay for 5 seconds

    // Load the service.js file from the CDN

    // const user = getUserInformation();
    // console.log("User:", user);
    // const assignments = getAssignments();

    $(".admin-menu button").click(function () {
      // Handle button click for admin menu
      var buttonText = $(this).text();
      console.log("Clicked on button in admin menu:", buttonText);
    });

    // Click event for buttons in student menu
    $(".student-menu button").click(function () {
      // Handle button click for student menu
      var buttonText = $(this).text();
      console.log("Clicked on button in student menu:", buttonText);
    });
  } else {
    console.log("This is not a course page.");
  }
});

fetch("https://18.189.14.69/courses/1/pages/home")
  .then((response) => response.text())
  .then((html) => {
    // Extract the specific content you want from the Canvas LMS page
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const content = doc.querySelector(".course-syllabus"); // Adjust the selector as needed

    // Insert the content into the page
    document.getElementById("canvasContent").innerHTML = content.innerHTML;
  })
  .catch((error) => console.error("Error fetching content:", error));

function getUserInformation() {
  return {
    name: "John Doe",
    email: "john@als.com",
  };
}
function getAssignments() {
  return [
    {
      title: "Assignment 1",
      dueDate: "2021-01-01",
    },
    {
      title: "Assignment 2",
      dueDate: "2021-01-15",
    },
    {
      title: "Assignment 3",
      dueDate: "2021-02-01",
    },
  ];
}

// Function to dynamically load a script
function loadScript(url) {
  console;
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function setBearerToken() {
  let token = ""; // Assuming the token is stored in localStorage under the key 'userToken'
  token = "kDyPawWLpOKa4G8MEI7t5Q08gLJUGjXT";
  if (token) {
    // Set the Authorization header with the Bearer token
    $.ajaxSetup({
      headers: {
        Authorization: "Token " + token,
      },
    });

    return "Token " + token;
  } else {
    console.error("User token not found in local storage.");
  }
}
