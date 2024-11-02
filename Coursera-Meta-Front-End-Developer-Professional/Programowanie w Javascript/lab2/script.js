function letterFinder(slowo, dopasowanie) {
    for(var i = 0; i < slowo.length ; i++) {
        if (dopasowanie === slowo[i]) {
            console.log('Znaleziono', dopasowanie, 'at', i);
        } else {
            console.log('---No match found at', i);
        }
    }
}

letterFinder("test", "t");

var clothes = [];
clothes.push('gray t-shirt');
clothes.push('blue t-shirt');
clothes.push('yellow t-shirt');
clothes.push('slippers');
clothes.push('old jeans');
clothes.pop();
clothes.push('green scarf');
console.log(clothes[2]);

var favCar = {};
favCar.color = "red";
favCar.convertible = true;
console.log(favCar);

function addTwoNums(a,b) {
    try {
        if(typeof(a) != 'number') {
            throw new ReferenceError('the first argument is not a number')
        } else if (typeof(b) != 'number') {
            throw new ReferenceError('the second argument is not a number')
        } else {
            console.log(a + b)
        }
    } catch(err) {
        console.log("Error!", err)
    }
}
addTwoNums(5, "5")
console.log("It still works")

function letterFinder(word, match) {
    var condition1 = typeof(word) == 'string' && word.length >= 2;
    var condition2 = typeof(match) == 'string' && match.length == 1;
    if(condition1 && condition2) {
        for(var i = 0; i < word.length; i++) {
            if(word[i] == match) {
                console.log('Found the', match, 'at', i)
            } else {
                console.log('---No match found at', i)
            }
        }
    } else {
        console.log("Please pass correct arguments to the function")
    }
}
letterFinder([],[])
letterFinder("cat","c")