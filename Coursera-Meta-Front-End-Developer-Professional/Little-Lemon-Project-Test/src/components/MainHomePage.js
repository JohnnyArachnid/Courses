import Food from "./Food.js";
import Button from "./Button.js";

const foodData = [
    {
        title: "GreekSalad",
        description: "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
        price: 12.99,
    },
    {
        title: "GreekSalad",
        description: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil. Toppings of tomato, veggies, beans, cured pork, or cheese are examples of variations. In Italy, a brustolina grill is frequently used to create bruschetta.",
        price: 7.99,
    },
    {
        title: "Grilled Fish",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed cursus.",
        price: 10.50,
    },
];

function MainHomePage() {
    return (
        <main className="main">
            <div>
                <div>
                    <h1>Little Lemon</h1>
                    <h3>Chicago</h3>
                </div>
                <div>
                    <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
                </div>
                <div>
                    <Button text="Reserve a table" url="/booking"/>
                </div>
            </div>
            <div>
                {foodData.map((food, index) => <Food food={food} />)}
            </div>
        </main>
    );
}


export default MainHomePage;