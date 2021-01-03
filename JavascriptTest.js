
let demo = require('./demo-booking-data')

function dateToTime(dateString) {
    return new Date(dateString).getTime();
}

function between2point(x, y, min, max) {
    return (x >= min && x <= max) || (y >= min && y <= max);
}

const checkAvailability = (roomId, startTime, endTime) => {
    let available = true;
    for (var i = 0; i < demo.length; i++) {
        if (roomId == demo[i].roomId) {
            var st = dateToTime(demo[i].startTime);
            var et = dateToTime(demo[i].endTime);
            var inst = dateToTime(startTime);
            var inet = dateToTime(endTime);
            if (between2point(inst, inet, st, et) || between2point(st, et, inst, inet)) {
                if ((inst != et) && (inet != st)) {
                    available = false;
                }
            }
        }
    }
    return available;
}
var available = checkAvailability('A101', '2019-09-28 07:00:00', '2019-09-28 10:20:00');
console.log(" available: " + available)
function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return [d.getUTCFullYear(), weekNo];
}


const getBookingsForWeek = (roomId, weekNo) => {
    var bookingRoom = [];
    for (var i = 0; i < demo.length; i++) {
        var stWeek = getWeekNumber(new Date(demo[i].startTime));
        var etWeek = getWeekNumber(new Date(demo[i].endTime));
        if ((weekNo == stWeek[1] || (weekNo + 1) == etWeek[1]) && roomId == demo[i].roomId) {
            bookingRoom.push(demo[i]);
        }
    }
    return bookingRoom;
}
var bookingRoom = getBookingsForWeek('A101', 38);
console.log('bookingRoom :', bookingRoom)
console.log('size :'+bookingRoom.length)