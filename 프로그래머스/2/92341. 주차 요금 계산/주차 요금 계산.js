function solution(fees, records) {
    const parking = {};

    for (const record of records) {
        const [time, carNumber, inout] = record.split(" ");
        if (!parking[carNumber]) parking[carNumber] = { inTime: null, total: 0 };

        if (inout === "IN") {
            parking[carNumber].inTime = time;
        } else {
            parking[carNumber].total += getMinutesDiff(parking[carNumber].inTime, time);
            parking[carNumber].inTime = null;
        }
    }

    for (const carNumber in parking) {
        if (parking[carNumber].inTime !== null) {
            parking[carNumber].total += getMinutesDiff(parking[carNumber].inTime, "23:59");
            parking[carNumber].inTime = null;
        }
    }

    return Object.keys(parking)
        .sort((a, b) => a.localeCompare(b))
        .map(carNumber => calculateFee(parking[carNumber].total, fees));
}

function getMinutesDiff(start, end) {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    return (eh * 60 + em) - (sh * 60 + sm);
}

function calculateFee(total, [baseTime, baseFee, unitTime, unitFee]) {
    if (total <= baseTime) return baseFee;
    return baseFee + Math.ceil((total - baseTime) / unitTime) * unitFee;
}
