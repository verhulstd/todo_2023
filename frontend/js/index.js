import fetcher from "./fetcher";
import topbar from "topbar";
import "../css/style.scss";

const todoItemTemplate = document.querySelector("#listitem").innerHTML;

async function getTodos() {
  // const todos = await (await fetch("http://localhost:3000/todos")).json();
  // //const todos = await response.json();
  // console.log(todos);
  try {
    const { data: todos } = await fetcher("/");
    console.log(todos);
    document.querySelector(".todoapp__list").innerHTML = todos
      .map(({ todo, checked, id }) =>
        todoItemTemplate
          .replace("%TODO%", todo)
          .replace("%ID%", id)
          .replace("%CHECKED%", checked ? "todoapp__list__item--checked" : "")
      )
      .join("");
  } catch (error) {
    console.log(error);
  }
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
      topbar.show();
      await fetcher.post("/", {
        todo,
        checked: false,
      });
      inputField.value = "";
      topbar.hide();
    } catch (error) {
      console.log(error);
    }
    getTodos();
  } else {
    inputField.classList.add("todoapp__form__input--error");
  }
};

document.querySelector(".todoapp__list").onclick = async (e) => {
  //console.log(e.target.closest(".delete"));
  const {
    target: { parentElement, className },
  } = e;
  switch (className) {
    case "delete":
      try {
        await fetcher.delete(`/${parentElement.dataset.id}`);
        getTodos();
      } catch (error) {
        console.log(error);
      }
      break;
    case "check":
      try {
        await fetcher.patch(`/${parentElement.dataset.id}`, {
          checked: !parentElement.classList.contains(
            "todoapp__list__item--checked"
          ),
        });
        getTodos();
      } catch (error) {
        console.log(error);
      }
      break;
  }
};
