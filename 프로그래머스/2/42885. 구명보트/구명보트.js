function solution(people, limit) {
    let count = 0;
    let [left, right] = [0, people.length - 1];
    
    people.sort((a, b) => a - b);
    let weight = people[0];
    while(left <= right) {
        if(people[left] + people[right] <= limit) {
            left += 1;
            right -= 1;
        } else {
            right -= 1;
        }
        count+=1;
    }
    return count;
}