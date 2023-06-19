const time = {
    formatToClock,
    computeElapsedTime,
    formatToReadableDatetime,
};

function formatToClock(seconds: number, options?: { hideHours: boolean }) {
    if (seconds < 0) {
        return `${options?.hideHours ? '' : '00:'}00:00`;
    }
    const hours = Math.floor(seconds / 3600);
    seconds = seconds - hours * 3600;

    const minutes = Math.floor(seconds / 60);
    seconds = seconds - minutes * 60;

    let humanReadableHours = '';
    if (hours > 0) {
        humanReadableHours = formatToHumanReadable(hours) + ':';
    } else if (!options?.hideHours) {
        humanReadableHours = '00:';
    }

    return `${humanReadableHours}${formatToHumanReadable(minutes)}:${formatToHumanReadable(
        seconds,
    )}`;
}

function formatToReadableDatetime(timestamp: number) {
    const date = new Date();
    date.setTime(timestamp);
    const hrDate = `${date.toLocaleDateString()}`;
    const hrTime = `${formatToHumanReadable(date.getHours())}:${formatToHumanReadable(
        date.getMinutes(),
    )}:${formatToHumanReadable(date.getSeconds())}`;
    return `${hrDate} ${hrTime}`;
}

function formatToHumanReadable(value: number) {
    return value >= 10 ? `${value}` : `0${value}`;
}

function computeElapsedTime(date: string, now: Date) {
    const referenceDate = new Date(date);
    return Math.floor((now.getTime() - referenceDate.getTime()) / 1000);
}

export { time };
