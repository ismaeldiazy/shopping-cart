// Variables
const shoppingCart = document.getElementById('carrito');
const course = document.getElementById('lista-cursos');
const courseList = document.querySelector('#lista-carrito tbody');

// Listeners
loadingEventlisteners();

function loadingEventlisteners() {
    // It's triggered when the add to shopping cart button is clicked
    course.addEventListener('click', buyCourse);
    // When the remove button is clicked
    shoppingCart.addEventListener('click', removeCourse);
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
}

// Remove course from the shopping cart list (DOM) 
function removeCourse(e) {
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
    }
}