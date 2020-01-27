// Variables
const shoppingCart = document.getElementById('carrito');
const course = document.getElementById('lista-cursos');
const courseList = document.querySelector('#lista-carrito tbody');
const clearShopping = document.getElementById('vaciar-carrito');

// Listeners
loadingEventlisteners();

function loadingEventlisteners() {
    // It's triggered when the add to shopping cart button is clicked
    course.addEventListener('click', buyCourse);
    // When the remove button is clicked
    shoppingCart.addEventListener('click', removeCourse);
    // When the clear shopping cart button is clicked
    clearShopping.addEventListener('click', clearShoppingCart);
    // After the DOM is loaded, print LS value
    document.addEventListener('DOMContentLoaded', printLS);
};

// Functions
// Function that adds the course to the shopping cart
function buyCourse(e) {
    e.preventDefault();
    // Delegation to add to shoping-cart
    if(e.target.classList.contains('agregar-carrito')) {
        const course = e.target.parentElement.parentElement;
        // calling function to read course data
        readCourseData(course);
    }
}

// Read course data
function readCourseData(course) {
    // Object with course data to be shown on the shopping cart list
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.precio span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }
    insertShoppingCart(courseInfo);
}

// Function to create the html with the course data
// and add it to the shopping cart list
function insertShoppingCart(course) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${course.image}" width="100px">
        </td>
        <td>${course.title}</td>
        <td>${course.price}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${course.id}">X</a>
        </td>
    `;
    // Add as a child of the tbody the const row
    courseList.appendChild(row);
    // Calling function to store in LocalStorage
    storeInLocalStorage(course);
}

// Remove course from the shopping cart list (DOM) 
function removeCourse(e) {
    e.preventDefault();
    let course, courseId;
    if(e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement
        courseId = course.querySelector('a').getAttribute('data-id');
    }
    removeCourseFromLS(courseId);
}

// Clear the entire shopping cart list
function clearShoppingCart() {
    while(courseList.firstChild) {
        courseList.removeChild(courseList.firstChild);
    }
    // Calling function to clear stored values in LS
    clearLocalStorage();
    return false;   
}

// Store in LocalStorage
function storeInLocalStorage(course) {
    let courses;
    // The variable takes the value of an empty array 
    // or an array with the values stored in LocalStorage
    courses = getLocalStorage();
    // Selected element is added to the array
    courses.push(course);
    // After adding the element to the array
    // update the LS content (as string) to not just overwrite
    localStorage.setItem('courses', JSON.stringify(courses));
}

// Get elements from LocalStorage
function getLocalStorage() {
    let coursesLS;
    // If LS is empty
    if (localStorage.getItem('courses') === null) {
        // The variable takes the value of an empty array
        coursesLS = [];
        // If not
    }else {
        // Takes the value of LS as an array
        coursesLS = JSON.parse(localStorage.getItem('courses'));
    }
    return coursesLS;
}

// Print LS value
function printLS() {
    let coursesLS;
    coursesLS = getLocalStorage();

    coursesLS.forEach(function(course) {
        // Creating tr for every course added
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${course.image}" width="100px">
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${course.id}">X</a>
            </td>
        `;
        // Add  the const row as a child of tbody
        courseList.appendChild(row);
    });    
}

// Remove course from LS by course id
function removeCourseFromLS(course) {
    let coursesLS;
    // Give courseLS LS values
    coursesLS = getLocalStorage();

    coursesLS.forEach(function(courseLS, index) {
        if(courseLS.id === course) {
            coursesLS.splice(index, 1);
        }
    });
    // Update the LS values
    localStorage.setItem('courses', JSON.stringify(coursesLS));

};

// Clear LS
function clearLocalStorage() {
    localStorage.clear();
}