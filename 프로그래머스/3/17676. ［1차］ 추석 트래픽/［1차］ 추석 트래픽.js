function solution(lines) {
    const logs = lines.map((line) => {
        const [date, time, process] = line.split(" ");
        
        const [year, month, e_day] = date.split("-").map(Number);
        
        const t = time.split(":");
        const e_hh = parseInt(t[0]), e_mm = parseInt(t[1]);
        
        const e_s = t[2].split('.');
        const e_ss = parseInt(e_s[0]), e_sss = parseInt(e_s[1]);
        
        const endTime = e_day * 24 * 3600 * 1000 + e_hh * 3600 * 1000 + e_mm * 60 * 1000 + e_ss * 1000 + e_sss;
        
        let [s_day, s_hh, s_mm, s_ss, s_sss] = [e_day, e_hh, e_mm, e_ss, e_sss];
        
        const p = process.slice(0, -1).split(".").map(Number);
        
        let p_ss = p[0], p_sss = p.length === 1 ? 0 : p[1];
        
        s_sss = e_sss - p_sss + 1;
        if(s_sss < 0) {
            s_sss += 1000;
            p_ss += 1;
        }
        
        s_ss = e_ss - p_ss;
        
        if(s_ss < 0) {
            s_ss += 60;
            s_mm -= 1;
        }
        
        if(s_mm < 0) {
            s_mm += 60;
            s_hh -= 1;
        }
        
        if(s_hh < 0) {
            s_hh += 24;
            s_day -= 1;
        }
        
        const startTime = s_day * 24 * 3600 * 1000 + s_hh * 3600 * 1000 + s_mm * 60 * 1000 + s_ss * 1000 + s_sss;
        
        return [startTime, endTime];
    });
    
    logs.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0])
    
    
    let answer = 0;
    
    for(const base of logs) {
        const [startBase, endBase] = base;
        let startBaseCount = 0
        let endBaseCount = 0;
        for(const log of logs) {
            const [start, end] = log;
            
            if(start < startBase + 1000 && end >= startBase) {
                startBaseCount += 1;
                continue;
            }
        }
        answer = Math.max(startBaseCount, answer);
        
        for(const log of logs) {
            const [start, end] = log;
            
            if(start < endBase + 1000 && end >= endBase) {
                endBaseCount += 1;
                continue;
            }
        }
        answer = Math.max(endBaseCount, answer);
    }
    
    return answer;
}

// 33.010
// 33.020

// -> 0.011 초 처리시간은 시작시간과 끝 시간을 포함