import useToDo from "@/composables/useTodo";

describe("useToDo", () => {
  let list;
  let addToDo;
  let updateToDo;
  let deleteToDo;

  function init() {
    const {
      listToDo,
      addToDo: add,
      updateToDo: update,
      deleteToDo: del,
    } = useToDo();
    list = listToDo;
    addToDo = add;
    updateToDo = update;
    deleteToDo = del;
  }

  describe("When addToDo is called", () => {
    beforeEach(() => {
      init();
    });
    test("Then it adds a new item to the TODO list", async () => {
      const newToDo = { id: "155", label: "new to do", isDone: false };
      await addToDo(newToDo);
      expect(list.value).toContainEqual(newToDo);
    });
  });
  describe("When updateToDo is called", () => {
    beforeEach(() => {
      init();
    });
    test("Then it updates an existing ToDo selected by its ID", async () => {
      const todo = { id: "1", label: "to do", isDone: false };
      list.value.push(todo);
      await updateToDo({ id: "1", patch: { isDone: true } });
      expect(list.value).toContainEqual({ ...todo, isDone: true });
    });
  });
  describe("When deleteToDo is called", () => {
    beforeEach(() => {
      init();
    });
    test("Then it deletes a ToDo selected by its ID", async () => {
      const toDoToDelete = { id: "1", label: "to do to Delete", isDone: false };
      list.value.push(toDoToDelete);
      await deleteToDo("1");
      expect(list.value).not.toContainEqual(toDoToDelete);
    });
  });
});
