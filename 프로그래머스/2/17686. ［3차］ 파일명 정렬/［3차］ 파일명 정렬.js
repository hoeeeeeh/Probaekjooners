function solution(files) {
    const parsedFiles = files.map((file, idx) => {
        const match = file.match(/^([^\d]+)(\d{1,5})(.*)$/);
        return {
            head: match[1],
            number: match[2],
            tail: match[3],
            original: file,
            index: idx 
        };
    });

    parsedFiles.sort((a, b) => {
        const headA = a.head.toLowerCase();
        const headB = b.head.toLowerCase();
        if (headA < headB) return -1;
        if (headA > headB) return 1;

        const numA = parseInt(a.number, 10);
        const numB = parseInt(b.number, 10);
        if (numA < numB) return -1;
        if (numA > numB) return 1;

        return a.index - b.index;
    });

    return parsedFiles.map(f => f.original);
}
