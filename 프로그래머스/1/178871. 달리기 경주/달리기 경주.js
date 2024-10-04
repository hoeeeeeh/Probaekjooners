function solution(players, callings) {
    const swap = (arr, idx) => {
        const saved = arr[idx];
        arr[idx] = arr[idx-1];
        arr[idx-1] = saved;
    };
    
    const modifyMap = (rankMap, player1, player2) => {
        const idx1 = rankMap[player1];
        const idx2 = rankMap[player2];
        
        rankMap[player1] = idx2;
        rankMap[player2] = idx1;
    };
    
    const playersRankMap = {}
    
    players.forEach((player, idx)=>{
        playersRankMap[player] = idx;
    })
    
    callings.forEach((calledPlayer)=>{
        const calledPlayerIdx = playersRankMap[calledPlayer];
        const swappedPlayer = players[calledPlayerIdx - 1];
        swap(players, calledPlayerIdx);
        modifyMap(playersRankMap, calledPlayer, swappedPlayer);
    })
    
    return players;
}