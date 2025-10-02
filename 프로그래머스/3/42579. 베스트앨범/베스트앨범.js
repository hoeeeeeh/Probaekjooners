function solution(genres, plays) {
    
    // playlist = new Map<String, Selection>;
    const playlist = new Map();
    
    for (const [genre, play, idx] of zip(genres, plays)) {
        if(!playlist.has(genre)) {
            playlist.set(genre, new Selection());
        }
        
        const music = new Music(idx, play);
        const selection = playlist.get(genre);
        selection.add(music);
    }
    
    const answer = [...playlist.values()].sort((s1, s2) => s2.play - s1.play)
        .map((selection) => selection.order.map((music) => music.number))
        .flat(1);
    
    return answer;
}

class Selection {
    play = 0;
    order = [];
    
    accPlay(play) {
        this.play += play;
    }
    
    add(music) {
        this.accPlay(music.play);
        
        this.order.push(music);
        this.order.sort((m1, m2) => {
            if(m1.play !== m2.play) {
                return m2.play - m1.play;
            }
            return m1.number - m2.number;
        });
        
        this.order = this.order.slice(0, 2);
    }
}

class Music {
    number = null;
    play = 0;
    
    constructor(number, play) {
        this.number = number;
        this.play = play;
    }
}

function* zip(a, b) {
    const len = Math.min(a.length, b.length);
    for (let i = 0; i < len; i++) {
        yield [a[i], b[i], i];
    }
}

