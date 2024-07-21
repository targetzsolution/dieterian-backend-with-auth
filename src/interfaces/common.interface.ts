// For Workout Plan
interface IExercise {
    e1: string;
    e2: string;
    e3: string;
    v1: Number | String;
    v2: Number | String;
    v3: Number | String;
    d1: String;
    d2: String;
    d3: String;
}

interface IWorkoutDays {
    description: string,
    exercise: IExercise[];
}

// For Nutrition Plan
interface IDiet {
    t1: string;
    t2: string;
    t3: string;
    m1: String;
    m2: String;
    m3: String;
}

interface INutritionDays {
    description: string,
    diet: IDiet[];
}

export { IWorkoutDays, IExercise, INutritionDays, IDiet };