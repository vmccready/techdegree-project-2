/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
completed by Vinson McCready
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


// Global Variables
const studentList = document.querySelectorAll('li.student-item');
const page = document.querySelector('div.page');
const studentsPerPage = 10; //If we want different number of students per page
const numberOfPages = Math.ceil(studentList.length/studentsPerPage);
let currentPage = 1;

//Enhance web page: show fewer students and pagination
showPage(studentList, 1);
appendPageLinks();
const pagination = document.querySelector('div.pagination');

//Hides all student list items except the ones we want to show
function showPage(students, currentPage) {
   for (let i = 0; i < students.length; i += 1) {
      if (Math.floor(i/studentsPerPage) + 1 === currentPage) { //show students on current page
         students[i].style.display = '';
      } else {
         students[i].style.display = 'none'; //hide all others
      }
   }
}

//Create the `appendPageLinks function` to generate, append, and add functionality to the pagination buttons.
function appendPageLinks () {
   const div = document.createElement('div');  
   const ul = document.createElement('ul');
   div.appendChild(ul);
   div.className = 'pagination';

   // Create each li element with a loop and append
   for (let i = 1; i <= numberOfPages; i += 1){
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.setAttribute('href', '#');
      a.textContent = i;
      li.appendChild(a);
      ul.appendChild(li);
      if (i === currentPage) {
         a.className = 'active';
      }
      
      //add event listener to show students for clicked page
      li.addEventListener('click', (e) => {
         const page = parseInt(e.target.textContent);
         currentPage = page;
         showPage(studentList, page);
         for (let i = 0; i < numberOfPages; i += 1){
            pagination.firstElementChild.children[i].firstElementChild.className = ''; // Reset class on 'a' tags
         }
         e.target.className = 'active';
      });
   }
   page.appendChild(div);

}










