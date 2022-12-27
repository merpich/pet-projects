window.addEventListener('DOMContentLoaded', () => {

	function checkLocaldata(item) {
		if (!localStorage.getItem(item)) {
			localStorage.setItem(item, JSON.stringify([]))
		}
	}

	function getLocalData(item) {
		return JSON.parse(localStorage.getItem(item))
	}

	function setLocalData(item, data) {
		localStorage.setItem(item, JSON.stringify(data))
	}

	function addTask(task) {
		const taskList = getLocalData('task-list')
		const taskItem = {id: taskList.length, task, completed: false}
		const taskListUpdated = [...taskList, taskItem]

		setLocalData('task-list', taskListUpdated)
		showTask('.task', taskItem)
	}

	function completeTask(item) {
		item.querySelector('.task-complete').addEventListener('click', () => {
			const taskList = getLocalData('task-list')

			taskList.forEach(task => {
				if (task.id === +item.getAttribute('data-task-id')) {
					item.setAttribute('data-complete', !task.completed)
					task.completed = !task.completed

					setLocalData('task-list', taskList)
				}
			})
		})
	}

	function deleteTask(parentSelector, item) {
		item.querySelector('.task-delete').addEventListener('click', () => {
			const tasksElement = document.querySelector(parentSelector)
			const itemId = item.getAttribute('data-task-id')
			const taskList = getLocalData('task-list')
			const taskListUpdated = taskList.filter(item => item.id != itemId)

			tasksElement.innerHTML = ''
			taskListUpdated.forEach((item) => showTask('.task', item))
			setLocalData('task-list', taskListUpdated)
		})
	}

	function showTask(parentSelector, item) {
		const tasksElement = document.querySelector(parentSelector)
		const taskItemElement = document.createElement('li')

		taskItemElement.classList.add('task-item')
		taskItemElement.setAttribute('data-task-id', item.id)
		taskItemElement.setAttribute('data-complete', item.completed)
		taskItemElement.innerHTML =
			`<div class="task-inner">
				<button class="task-complete">
					<div class="task-complete-inner">
						<svg class="task-complete-icon">
							<use xlink:href="./sprites.svg#check"></use>
						</svg>
					</div>
				</button>

				<p class="task-text">${item.task}</p>

				<button class="task-delete">
					<svg class="task-delete-icon">
						<use xlink:href="./sprites.svg#delete"></use>
					</svg>
				</button>
			</div>`

			tasksElement.append(taskItemElement)
			completeTask(taskItemElement)
			deleteTask('.task', taskItemElement)
	}

	function showTasksAll() {
		const taskList = getLocalData('task-list')
		taskList.forEach(item => showTask('.task', item))
	}

	function formHandler(event, formElement, inputElement) {
		event.preventDefault()

		if (inputElement.value.trim() === '') {
			inputElement.placeholder = 'Поле не может быть пустым'
		} else {
			addTask(inputElement.value)
			formElement.reset()
			inputElement.select()
		}
	}

	function inputHandler(inputElement) {
		inputElement.placeholder = 'Введите новую задачу'
	}

	function initApp() {
		checkLocaldata('task-list')

		const formElement = document.querySelector('.form')
		const inputElement = document.querySelector('.input')

		formElement.addEventListener('submit', e => formHandler(e, formElement, inputElement))
		inputElement.addEventListener('input', () => inputHandler(inputElement))

		showTasksAll()
	}

	initApp()

})
