function solution(n, k) {
    let kString = n.toString(k);
    let numOfKString = kString.split("0").filter(isPrime)
    return numOfKString.length;
}

function isPrime(n) {
    if (n === "") {
        return false;
    }
    const num = parseInt(n);
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}
