import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	const [tasksArray, setTasksArray] = useState([]);
	const [newTask, setNewTask] = useState("");
	const saveTask = e => {
		if (e.keyCode == 13) {
			let newToDo = {
				label: newTask,
				done: false,
				id: tasksArray.length
			};
			let newTasksArray = [...tasksArray, newToDo];
			setTasksArray(newTasksArray);
			setNewTask("");
			console.log(JSON.stringify(newTasksArray));
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/louis_todolist",
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(newTasksArray)
				}
			)
				.then(response => response.json())
				.then(jsonfied => {
					console.log(jsonfied);
					fetch(
						"https://assets.breatheco.de/apis/fake/todos/user/louis_todolist"
					)
						.then(response => response.json())
						.then(data => setTasksArray(data))
						.catch(error =>
							console.log("there was a following error: ", error)
						);
				})
				.catch(error =>
					console.log("there was a following error:", error)
				);
		}
	};

	const deleteTask = index => {
		const newTasksArray = tasksArray.filter((task, ind) => ind != index);
		setTasksArray(newTasksArray);
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/louis_todolist",
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newTasksArray)
			}
		)
			.then(response => response.json())
			.then(jsonfied => {
				console.log(jsonfied);
				fetch(
					"https://assets.breatheco.de/apis/fake/todos/user/louis_todolist"
				)
					.then(response => response.json())
					.then(data => setTasksArray(data))
					.catch(error =>
						console.log("there was a following error: ", error)
					);
			})
			.catch(error => console.log("there was a following error:", error));
	};

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/louis_todolist")
			.then(response => response.json())
			.then(data => {
				if (data.msg && data.msg.includes("use does not exist")) {
					console.log("creating a new user list");
				}

				console.log(data);
				setTasksArray(data);
			})

			.catch(err => console.log("There was the following error: ", err));
	}, []);

	return (
		<div className="text-center mt-5">
			<h1>My Happy To Do List</h1>
			<input
				type="text"
				value={newTask}
				onChange={e => setNewTask(e.target.value)}
				onKeyUp={saveTask}
			/>
			<ul>
				{tasksArray.length > 0 ? (
					tasksArray.map((task, i) => {
						return (
							<li key={i}>
								{task.label}{" "}
								<span
									type="button"
									onClick={() => deleteTask(task.id)}>
									{" "}
									<img src="https://variety.com/wp-content/uploads/2018/10/taylor_swift.png?w=979" />{" "}
								</span>
							</li>
						);
					})
				) : (
					<li>no tasks, add a task</li>
				)}
			</ul>
			<p>{tasksArray.length} items left</p>
			<h2>........ thank you for using my app</h2>
		</div>
	);
}

//create an array to hold all tasks
// create an input field
//assign hook variable the value of the input field
// create ul that holds all tasks
//place tasks value in li
//create a map method inside the ul
//map returns 1 li with tasks inside on every loop
