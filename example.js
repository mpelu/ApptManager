function exampleSync()
{
    console.log("hello!")
    let a = plusFiveSync(6)
    console.log(a)
}

function plusFiveSync(number)
{
    return number + 5
}

async function exampleAsync() {
    let a = plusFiveAsync(2)
    console.log(a)
    console.log(await a)
}

async function plusFiveAsync(number)
{
    return new Promise(apple => {
        apple(number + 5)
    })
}

//exampleSync()
exampleAsync()
