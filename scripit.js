
    
        const mainTodoElem = document.querySelector(".todo-list-elem")
        const inputValue = document.getElementById("inputValue")


        const getTodoListFromLocal = () => {
            return JSON.parse(localStorage.getItem("todolist"))
        }


        const addTodoListLocalStorage = (localTodoLists) => {
            return localStorage.setItem('todolist', JSON.stringify(localTodoLists))
        }

        let localTodoLists = getTodoListFromLocal() || [];

        const addTodoDynamicElement = (curElem) => {
            const divEle = document.createElement("div")
            divEle.classList.add("main_todo_div")
            divEle.innerHTML = `<li >${curElem}</li> <button class="deleteBtn">Delete</button>`
            mainTodoElem.appendChild(divEle)
        }

        const addTodoList = () => {

            const todoListValue = inputValue.value.trim();

            if (todoListValue.length !== 0 && !localTodoLists.includes(todoListValue)) {

                localTodoLists.push(todoListValue);
                //   localTodoLists=[...new Set(localTodoLists)]
                console.log(localTodoLists)
                localStorage.setItem("todolist", JSON.stringify(localTodoLists))

                const divEle = document.createElement("div")
                divEle.classList.add("main_todo_div")
                divEle.innerHTML = `<li >${inputValue.value}</li> <button class="deleteBtn">Delete</button>`
                mainTodoElem.appendChild(divEle)

            }
            inputValue.value = "";
        }

        const showTodoList = () => {
            console.log(localTodoLists)

            localTodoLists.forEach((curElem) => {
                addTodoDynamicElement(curElem);
            })
        }
        showTodoList()

        const removeTodoElem = (e) => {
            // console.log(e.target)
            // console.log(e.target.previousElementSibling.textContent)
            let todoListContent = e.target.previousElementSibling.textContent
            localTodoLists = localTodoLists.filter((curTodo) => {
                return curTodo != todoListContent;
            })
            // console.log(localTodoLists)

            addTodoListLocalStorage(localTodoLists)
        }

        mainTodoElem.addEventListener("click", (e) => {

            removeTodoElem(e)

            if (e.target.innerText === "Delete") {
                console.log(e.target.parentElement)
                mainTodoElem.removeChild(e.target.parentElement);
            }
        })

        document.querySelector(".btn").addEventListener("click", () => {
            addTodoList()

        })
