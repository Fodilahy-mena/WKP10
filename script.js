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
        <td class="last_name">${person.lastName}</td>
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

const handleClick = (e) => {
	if (e.target.closest('button.edit')) {
		const tableRow = e.target.closest('tr');
		const id = tableRow.dataset.id;
		editPartner(id);
	}

	if (e.target.closest('button.delete')) {
		const tableRow = e.target.closest('tr');
		const id = tableRow.dataset.id;
		deletePartner(id)
	}
}

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


const editPartner = (id) => {
	const editPerson = persons.find(person => person.id === id);
	return new Promise(async function(resolve) {

		const editPopup = document.createElement('form');
		editPopup.classList.add('popup');
		editPopup.insertAdjacentHTML(
			'afterbegin', 
			`<fieldset>
				<label>Last name</label>
				<input type="text" value="${editPerson.lastName}" name="lastName">
				<label>First name</label>
				<input type="text" value="${editPerson.firstName}" name="firstName">
				<label>Job title</label>
				<input type="text" value="${editPerson.jobTitle}" name="jobTitle">
				<label>Job area</label>
				<input type="text" value="${editPerson.jobArea}" name="jobArea">
				<label>Phone number</label>
				<input type="tel" value="${editPerson.phone}" name="phone">
				<button type="button" class="cancel" name="cancel">Cancel</button>
				<button type="submit" class="confirmed">Save</button>
			</fieldset>
		`);
		if(editPopup.cancel) {
			console.log(editPopup.cancel);
            const skipButton = editPopup.cancel;
            skipButton.addEventListener('click', () => {
				console.log('canel');
                resolve(null);
                destroyPopup(editPopup);
			}, { once: true });
	

        }
		editPopup.addEventListener('submit', (e) => {
			e.preventDefault();
			editPerson.lastName = editPopup.lastName.value;
			editPerson.firstName = editPopup.firstName.value;
			editPerson.jobTitle = editPopup.jobTitle.value;
			editPerson.jobArea = editPopup.jobArea.value;
			editPerson.phone = editPopup.phone.value;
			displayList(persons);
            resolve(e.currentTarget.remove());
			destroyPopup(editPopup);
			
		}, { once: true }
		
		);
		
		
	resolve(document.body.appendChild(editPopup));
	editPopup.classList.add('open');
	
});
}



// const editPartnerPopup = () => {
// 	// create edit popup here
// };


const deletePartner = (id) => {
	const deletePerson = persons.find(person => person.id === id);
	return new Promise(async function(resolve) {
		const deletePopup = document.createElement('form');
		deletePopup.classList.add('popup');
		deletePopup.insertAdjacentHTML(
			'afterbegin', 
			`<fieldset>
				<p>Are you sure you want to delete <strong>${deletePerson.lastName}?</strong></p>
				<button type="button" class="cancel" name="cancel">Cancel</button>
				<button type="submit" name="delete" class="confirmed">OK</button>
			</fieldset>
		`);

		if(deletePopup.cancel) {
			const skipButton = deletePopup.cancel;
			console.log(skipButton);
            skipButton.addEventListener('click', () => {
                resolve(null);
				destroyPopup(deletePopup);
				
            }, { once: true });

		}
		const tableRow = tbody.querySelector("tr");
		deletePopup.addEventListener('click', (e) => {
			e.preventDefault();
			// tableRow.remove();
			// console.log(e.target.closest('tr'));
            resolve(tableRow.remove());
            destroyPopup(deletePopup);
        }, { once: true }
		);
		// if(deletePopup.delete) {
		// 	const skipButton = deletePopup.delete;
		// 	skipButton.addEventListener('click', () => {
        //         resolve(null);
		// 		destroyPopup(deletePopup);
				
        //     }, { once: true });
		// }
		
	resolve(document.body.appendChild(deletePopup));
	
	deletePopup.classList.add('open');
	
});
	
};


// const deletePopup = () => {
	// create confirmation popup here
// }

displayList(persons);
window.addEventListener('click', handleClick);