/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
completed by Vinson McCready
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


// Global Variables
const studentList = document.querySelectorAll('li.student-item');
const studentsPerPage = 10; //If we want different number of students per page
let studentsToShow = studentList;
let numberOfPages = Math.ceil(studentList.length/studentsPerPage);
let currentPage = 1;

//Hides all student list items except the ones we want to show
function showPage(students, currentPage) {
   //only show students that have been searched
   for (let i = 0; i < studentList.length; i += 1) {
      if (studentList[i].classList.value.includes('searched')) { //show students on current page
         studentList[i].style.display = '';
      } else {
         studentList[i].style.display = 'none'; //hide all others
      }
   }
   //only show searched students on current page
   for (let i = 0; i < students.length; i += 1) {
      if (Math.floor(i/studentsPerPage) + 1 === currentPage) { //show students on current page
         students[i].style.display = '';
      } else {
         students[i].style.display = 'none'; //hide all others
      }
   }
}

//Generate, append, and add functionality to the pagination buttons.
function appendPageLinks () {
   //Clear pagination if already there
   if (document.querySelector('div.pagination') !=null) {
      document.querySelector('div.pagination').remove();
   }

   //Generate
   const div = document.createElement('div');  
   const ul = document.createElement('ul');
   div.className = 'pagination';

   // Append li and a tags
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
      
      //add funtionality
      a.addEventListener('click', (e) => {
         const page = parseInt(e.target.textContent);
         currentPage = page;
         showPage(studentsToShow, page);
         for (let i = 0; i < numberOfPages; i += 1){
            document.querySelector('div.pagination').firstElementChild.children[i].firstElementChild.className = ''; // Reset class on 'a' tags
         }
         e.target.className = 'active';
      });
   }
   //Append
   div.appendChild(ul);
   document.querySelector('div.page').appendChild(div);

}

//Enhance web page
showPage(studentList, 1);
appendPageLinks();


/*
*****Create search button*****
*/
//Generate
const searchDiv = document.createElement('div');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');
searchDiv.className = 'student-search';
searchInput.setAttribute('placeholder', 'Search for students...');
searchButton.textContent = 'Search';
//append
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);
document.querySelector('div.page-header').appendChild(searchDiv);

//functionality
const search = function (event) {
   const input = event.target.value;
   isSearched(input);
   studentsToShow = document.querySelectorAll('li.searched');
   showPage(studentsToShow,1);
   numberOfPages = Math.ceil(studentsToShow.length/studentsPerPage);
   appendPageLinks();
}

searchDiv.addEventListener('keyup', search);
searchDiv.addEventListener('submit', search);


//add searched to class list to distinguish searched students
function isSearched(searchText){
   for (let i = 0; i < studentList.length; i += 1) {
      const studentName = studentList[i].querySelector('h3').textContent;
      const studentEmail = studentList[i].querySelector('.email').textContent;
      if (studentName.includes(searchText) || studentEmail.includes(searchText)) { //show students with search item in name or email
         studentList[i].classList.add('searched')
      } else {
         studentList[i].classList.remove('searched');
      }
   }
}


