const convertDMStoDecimal = function(dd, mm, direction) {
    return ((dd * 1) + (mm / 60)) * (direction == 'S' || direction == 'W'
        ? -1
        : 1);
}

const parse = raw => {
    if (raw.match(/BP05/)) {
        return parseLoginMessage(raw);
    } else {
        return parseData(raw);
    }
};

const parseLoginMessage = raw => {
    const found = raw.match(/\((\d+)BP05(\d{15})(\d{6})A(\d+)(\d{2}\.\d{4})([N|S])(\d+)(\d{2}\.\d{4})([W|E])(\d{3}\.\d)(\d{6})(\d{3}\.\d{2})(\d+)L(\d+)(.+)\)/i);
    let result = {
        status: false
    };
    if (found) {
        const flags = found[12].split('');
        result = {
            trackerId: found[1],
            imei: found[2],
            lat: convertDMStoDecimal(found[4], found[5], found[6]),
            long: convertDMStoDecimal(found[7], found[8], found[9]),
            speed: found[10] * 1,
            date: '20' + found[3].substr(0, 2) + '-' + found[3].substr(2, 2) + '-' + found[3].substr(4, 2),
            time: found[11].substr(0, 2) + ':' + found[11].substr(2, 2) + ':' + found[11].substr(4, 2),
            direction: found[12] * 1,
            mileage: found[14] * 1,
            flags: {
                power: flags[0] * 1,
                ignition: flags[1] * 1
            }
        };
    }
    return result;
};

const parseData = raw => {
    const found = raw.match(/\((\d+)B.\d+(\d{6})A(\d+)(\d{2}\.\d{4})([N|S])(\d+)(\d{2}\.\d{4})([W|E])(\d{3}\.\d)(\d{6})(\d{3}.\d{2})(\d+).L(\d+)(.+)\)/i);
    let result = {
        status: false
    };
    if (found) {
        const flags = found[12].split('');
        result = {
            status: true,
            trackerId: found[1],
            lat: convertDMStoDecimal(found[3], found[4], found[5]),
            long: convertDMStoDecimal(found[6], found[7], found[8]),
            speed: found[9] * 1,
            date: '20' + found[2].substr(0, 2) + '-' + found[2].substr(2, 2) + '-' + found[2].substr(4, 2),
            time: found[10].substr(0, 2) + ':' + found[10].substr(2, 2) + ':' + found[10].substr(4, 2),
            direction: found[11] * 1,
            mileage: found[13] * 1,
            flags: {
                power: flags[0] * 1,
                ignition: flags[1] * 1
            }
        };
    }
    return result;
};

module.exports = {
    parse: parse,
    parseLoginMessage: parseLoginMessage,
    parseData: parseData
};
