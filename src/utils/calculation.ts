export const calculateMet = (speed: number, treadmill: boolean): number => {
    const speedMph = speed * 0.621371; // Convert km/h to mph

    if (treadmill) {
        if (speedMph <= 6) return 9.0;
        if (speedMph <= 7.5) return 9.0 + ((speedMph - 6) * (11.0 - 9.0)) / (7.5 - 6);
        if (speedMph <= 9) return 11.0 + ((speedMph - 7.5) * (12.5 - 11.0)) / (9 - 7.5);
        return 12.5 + (speedMph - 9) * 0.5;
    } else {
        if (speedMph <= 6) return 9.8;
        if (speedMph <= 7.5) return 9.8 + ((speedMph - 6) * (11.0 - 9.8)) / (7.5 - 6);
        if (speedMph <= 9) return 11.0 + ((speedMph - 7.5) * (12.8 - 11.0)) / (9 - 7.5);
        return 12.8 + (speedMph - 9) * 0.5;
    }
};

export const calculateCalories = (data: {
    speed: number;
    treadmill: boolean;
    sex: string;
    age: number;
    weight: number;
    time: number;
}): number => {
    const met = calculateMet(data.speed, data.treadmill);
    const durationInHours = data.time / 60;
    const bmr =
        data.sex === 'male'
            ? 88.362 + 13.397 * data.weight + 4.799 * 170 - 5.677 * data.age
            : 447.593 + 9.247 * data.weight + 3.098 * 170 - 4.33 * data.age;
    const caloriesBurned = (bmr / 24) * met * durationInHours;
    return parseFloat(caloriesBurned.toFixed(2));
};
