function solution(n, t, m, timetable) {
    
    const timeTable = timetable.map((t) => t.split(":").map(Number));
    timeTable.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
    
    
    let loop = 0;
    
    let shuttle = 9 * 60 + t * loop;
    let seat = m;
    
    let latest = [0, 0];
    
    let crewIndex = 0;
    while(crewIndex < timeTable.length && loop < n) {
        const [hour, minute] = timeTable[crewIndex];
        
        // 해당 회차에는 탈 수 없는 사람.
        if(hour * 60 + minute > shuttle) {
            latest = [Math.floor(shuttle / 60), shuttle % 60];
            nextLoop();
            continue;
        }
        
        // 탑승
        seat -= 1;
        
        if(seat === 0) {
            // 이 사람보다 1분 일찍 콘이 와야함
            latest = minute >= 1 ? [hour, minute - 1] : [hour - 1, 59];
            nextLoop();
        }
        
        crewIndex += 1;
    }
    
    if(loop === n) {
        return numberToTime(latest);
    }
    
    if(seat === 0) {
        // 이 사람보다 1분 일찍 콘이 와야함
        latest = minute >= 1 ? [hour, minute - 1] : [hour - 1, 59];
        nextLoop();
    } else {
        // shuttle 이 올 때에 맞춰서 도착하면 됨
        latest = [Math.floor(shuttle / 60), shuttle % 60];
    }
    
    function nextLoop() {
        seat = m;
        loop += 1;
        shuttle = 9 * 60 + t * loop;
    }
    
    return numberToTime(latest);
}

function numberToTime([h, m]) {
    const time = [];
    if(h < 10) {
        time.push(0);
    }
    time.push(h);
    
    time.push(":");
    
    if(m < 10) {
        time.push(0);
    }
    time.push(m);
    
    return time.join('');
}