const items = [
  {
    task: "ВЫучить реакт ",
    icon: "🚀",
    isCompleted: false,
  },
  {
    task: "ВЫучить js ",
    icon: "🚀",
    isCompleted: true,
  },
  {
    task: "ВЫучить ls2 ",
    icon: "🚀",
    isCompleted: false,
  },
  {
    task: "ВЫучить dkdkdk ",
    icon: "🚀",
    isCompleted: false,
  },
];
function List() {
  return (
    <div>
      {items.map((item, index) => (
        <section key={index} className={item.isCompleted ? "completed" : ""}>
          <span>{item.icon}</span>
          <h4>{item.task}</h4>
        </section>
      ))}
    </div>
  );
}

export default List;
