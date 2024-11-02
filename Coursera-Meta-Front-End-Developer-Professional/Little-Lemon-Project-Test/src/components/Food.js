function Food(props) {
    return (
        <div className="food">
            <h1>{props.food.title}</h1>
            <p>{props.food.description}</p>
            <h2>{props.food.price} $</h2>
        </div>
    );
}

export default Food;