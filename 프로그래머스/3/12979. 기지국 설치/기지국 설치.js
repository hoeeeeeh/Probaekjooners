function solution(n, stations, w) {
    
    stations.push(n + w + 1);
    const gap = 2 * w + 1;
    let answer = 0;
    let prevMountedApartment = 0;
    for (let i = 0; i < stations.length; i++){
        const unmountedApartment = stations[i] - w - prevMountedApartment - 1;
        answer += Math.ceil(unmountedApartment / gap);
        prevMountedApartment = stations[i] + w;
    }
    
    return answer;
}