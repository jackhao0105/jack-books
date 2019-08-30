/*
	Name App 	: jack's Book List App
	Description	: Show my books that I love , I read in the year 2019, I always update into this.
	Date		: August 9 2019
	Language 	: JavaScript
	Developer 	: Jack Hao
*/

// Book Classes: Represent Book
class Book {
	constructor(title, author, date, finish){
		this.title 	= title;
		this.author = author;
		this.date 	= date;
		this.finish = finish;
	}
}

// UI Class : Handle UI Task
class UI{
	// Why we use all static method in this case
	// The answer is when we use static method, we can access to medthod without instance !
	static displayBook(){
	const books = Store.getBooks();

	books.forEach( (book) => UI.addBookToList(book))
	}

	// The static method to add the new Book to the List Book.
	static addBookToList(book) {
		const list = document.querySelector('#book-list');

		const row = document.createElement('tr');

		row.innerHTML = `
			<td>${book.title}</td>
			<td>${book.author}</td>
			<td>${book.date}</td>
			<td>${book.finish}</td>
			<td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>

		`;

		list.appendChild(row);
	}


	static clearFields() {
		const title 	= document.querySelector('#title').value ='';
		const author 	= document.querySelector('#author').value = '';
		const date 		= document.querySelector('#date').value = '';
		const finish 	= document.querySelector('#finish').value = '';
	}

	static showAlert(message, className) {
		const div = document.createElement('div');
		div.className = `alert alert-${className}`;
		div.appendChild(document.createTextNode(message));
		const container  = document.querySelector('.container');
		const form = document.querySelector('#book-form');
		container.insertBefore(div, form);

		// Vanish in 3 seconds
		setTimeout(() => document.querySelector('.alert').remove(), 3000)
	}

	static deleteBook(el) {
		if(el.classList.contains('delete')) {
			el.parentElement.parentElement.remove()
		}
	}
}

// Store class : Handles Storage
class Store{
	static getBooks(){
	let books;
	let data = localStorage.getItem('TODO');

	if(data) {
		books = JSON.parse(data);
	} else {
		books = [];
	}

	return books;
	}

	static addBook(book) {
		const books = Store.getBooks();
		books.push(book);
		localStorage.setItem('TODO', JSON.stringify(books));
	}

	static removeBook(finish) {
		const books = Store.getBooks();

		books.forEach((book, index) =>{
			if(book.finish === finish){ 
				books.splice(index, 1);
			}
		});

		localStorage.setItem('TODO', JSON.stringify(books));
	}
}
// Event: ---Display Book
document.addEventListener('DOMContentLoaded', UI.displayBook());

// Event: ---Add Book
document.querySelector('#book-form').addEventListener('submit', (e)=>{
	// Prevent acutal submit
	e.preventDefault();
		// Get form values

		const title 	= document.querySelector('#title').value;
		const author 	= document.querySelector('#author').value;
		const date 		= document.querySelector('#date').value;
		const finish 	= document.querySelector('#finish').value;
		
		// Validate 
		if( title === '' || author === '' || date ==='' || finish ==='' ){
			UI.showAlert('Please fill in all fields', 'info')
		} else{
		// Instatiate book
		const book = new Book(title, author, date, finish);
	
		// Add Book to UI
		UI.addBookToList(book);

		// Add book to store
		Store.addBook(book);

		// Show success message
		UI.showAlert('fukin success 😆😆😆', 'success');
	
		// Clear fields
		UI.clearFields();}
});

// Event: ---Remove Book
document.querySelector('#book-list').addEventListener('click', (e)=>{
	UI.deleteBook(e.target);

	// Remove book to store
		Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

	// Show success message
	UI.showAlert('fukout the here 😠😠😠', 'danger');
})