function solution(tickets) {
    tickets.sort((a, b) => {        
        if(a[0] === b[0]) {
            return a[1].localeCompare(b[1]);
        }
        
        return a[0].localeCompare(b[0]);
    })
    
    const end = tickets.length + 1;
    
    const graph = new Map();
    
    for(const ticket of tickets) {
        const [start, dest] = ticket
        if(!graph.has(start)) {
            graph.set(start, []);
        }
        
        if(!graph.has(dest)) {
            graph.set(dest, []);
        }
        
        graph.get(start).push(new Ticket(dest));
    }
    
    const answer = ['ICN'];
    return dfs('ICN', answer);
    
    function dfs(start, answer) {
        if(answer.length === end) {
            return answer;
        }
        const tickets = graph.get(start);
        
        for(const ticket of tickets){
            if(ticket.isUsed) {
                continue;
            }
            
            ticket.use();
            answer.push(ticket.dest);
            const result = dfs(ticket.dest, answer);
            if(result.length === end) {
                return result;
            }
            
            answer.pop();
            ticket.revert();
        }
        
        return [];
    }
}

class Ticket {
    constructor(dest) {
        this.dest = dest;
        this.used = false;
    }
    
    get isUsed() {
        return this.used === true;
    }
    
    use() {
        this.used = true;
    }
    
    revert() {
        this.used = false;
    }
}