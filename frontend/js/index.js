import axios from "axios";
import { nanoid } from "nanoid";
import "../css/style.scss";

const todoItemTemplate = document.querySelector("#listitem").innerHTML;

async function getTodos() {
  const { data: todos } = await axios("http://localhost:3000/todos");
  document.querySelector(".todoapp__list").innerHTML = todos
    .map(({ todo, checked }) =>
      todoItemTemplate
        .replace("%TODO%", todo)
        .replace("%CHECKED%", checked ? "todoapp__list__item--checked" : "")
    )
    .join("");
}

getTodos();

document.querySelector(".todoapp__form").onsubmit = async (e) => {
  //prevent formsubmit
  e.preventDefault();
  const inputField = document.querySelector(".todoapp__form__input");
  const todo = inputField.value;
  if (todo) {
    inputField.classList.remove("todoapp__form__input--error");
    try {
      await axios.post("http://localhost:3000/todos", {
        id: nanoid(),
        todo,
        checked: false,
      });
    } catch (error) {
      console.log(error);
    }
    getTodos();
  } else {
    inputField.classList.add("todoapp__form__input--error");
  }
};
