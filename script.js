import faker from 'faker';

const tbody = document.querySelector('tbody');

let persons = Array.from({ length: 10 }, () => {
	return {
		id: faker.random.uuid(),
		lastName: faker.name.lastName(),
		firstName: faker.name.firstName(),
		jobTitle: faker.name.jobTitle(),
		jobArea: faker.name.jobArea(),
		phone: faker.phone.phoneNumber(),
		picture: faker.image.avatar(100, 100),
	};
});
console.log(persons);
const displayList = data => {
	tbody.innerHTML = data
		.map(
			(person, index) => `
    <tr data-id="${person.id}" class="${index % 2 ? 'even' : ''}">
        <td><img src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/></td>
        <td>${person.lastName}</td>
        <td>${person.firstName}</td>
        <td>${person.jobTitle}</td>
        <td>${person.jobArea}</td>
        <td>${person.phone}</td>
        <td>
            <button class="edit">
                <svg viewBox="0 0 20 20" fill="currentColor" class="pencil w-6 h-6"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
            </button>
            <button class="delete">
                <svg viewBox="0 0 20 20" fill="currentColor" class="trash w-6 h-6"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            </button>
            </td>
    </tr>
`
		)
		.join('');
		
};

const editPartner = () => {
	// code edit function here
};

const editPartnerPopup = () => {
	// create edit popup here
};
const popup = document.createElement('form');

const deletePartner = (e) => {

	function wait(ms = 0) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async function destroyPopup(popup) {
		popup.classList.remove('open');
		await wait(1000);
	
		// remove the popup from the DOM
		popup.remove();
	
		// remove it from the js memory
		popup = null;
	}

	if (e.target.closest('button.delete')) {
		function ask(optins) {
		return new Promise(async function(resolve) {

		const elToDelete = e.target.closest('tr');
		// elToDelete.remove();
		popup.classList.add('popup');

		popup.insertAdjacentHTML(
			'afterbegin', 
			`<fieldset>
				<p>Are you sure you want to delete</p>
				<button class="cancel">Cancel</button>
				<button type="button" class="confirmed">OK</button>
			</fieldset>
		`);

		// if(optins.cancel) {
		// 	const cancelBtn = document.querySelector('.cancel');
		// 	cancelBtn.addEventListener('click', () => {
		// 		resolve(null);
		// 		destroyPopup(popup);
		// 	}, { once: true });
		// } 
	document.body.appendChild(popup);
	await wait(50);
	popup.classList.add('open');
	
});

}
ask();

}
	
};




// const popup = document.createElement('form');

// const deletePopup = () => {
	// create confirmation popup here
	
	// popup.classList.add('popup');
	// popup.classList.add('open');
	// const person = persons.find(person => person.id !== event);
	// popup.insertAdjacentHTML(
	// 	'afterbegin', 
	// 	`<fieldset>
	// 		<p>Are you sure you want to delete ${person.lastName}</p>
	// 		<button class="cancel">Cancel</button>
	// 		<button type="button" class="confirmed">OK</button>
	// 	</fieldset>
	// `);
	// document.body.appendChild(popup);
	// const cancelBtn = document.querySelector('button.cancel');
	// if(cancelBtn) {
	// 	// popup.classList.remove('open');
	// }
	// const confirmedBtn = document.querySelector('.confirmed');
	// if(confirmedBtn) {
	// 	const list = event.target.closest('tr');
	// 	list.remove();
	// } 
// };
window.addEventListener('click', deletePartner);
displayList(persons);
