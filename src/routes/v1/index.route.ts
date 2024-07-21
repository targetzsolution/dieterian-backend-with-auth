import express from 'express';
import userRoute from './user.route';
import authRoute from './auth.route';
import contactRoute from './contact.route';
import bmiRoute from './bmi.route';
import workoutPlanRoute from './workoutPlan.route';
import nutritionPlanRoute from './nutritionPlan.route';
import userWorkoutPlanRoute from './userWorkoutPlan.route';
import userNutritionPlanRoute from './userNutritionPlan.route';
import dashboardRoute from './dashboard.route';
import path from 'path';
import app from '../../app';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/contacts',
    route: contactRoute
  },
  {
    path: '/bmi',
    route: bmiRoute
  },
  {
    path: '/workoutPlans',
    route: workoutPlanRoute
  },
  {
    path: '/nutritionPlans',
    route: nutritionPlanRoute
  },
  {
    path: '/userWorkoutPlan',
    route: userWorkoutPlanRoute
  },
  {
    path: '/userNutritionPlan',
    route: userNutritionPlanRoute
  },
  {
    path: '/dashboard',
    route: dashboardRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
