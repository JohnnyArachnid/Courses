function DessertsList(props) {
  const newData = props.data.filter(dessert => { return dessert.calories <= 500; })
    .sort((a, b) => a.calories - b.calories)
    .map(dessert => { return <li>{dessert.name} - {dessert.calories} cal</li>});
  return (
    <ul>
      {newData}
    </ul>
  );
}

export default DessertsList;
