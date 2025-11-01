const express = require('express');
const authRoutes = require('./authRoutes');
const criterionRoutes = require('./criterionRoutes');
const institutionRoutes = require('./institutionRoutes');
const autonomousSubtaskRoutes = require('./autonomous/autonomousSubtaskRoutes');
const universitySubtaskRoutes = require('./university/universitySubtaskRoutes');
const universityMetricRoutes = require('./university/universityMetricRoutes');
const autonomousMetricRoutes = require('./autonomous/autonomousMetricRoutes');
const metricDraftRoutes = require('./metricDraftRoutes');
const uploadRoutes = require('./uploadRoutes');
const metricSubmissionRoutes = require('./metricSubmissionRoutes');
const taskRoutes = require('./taskRoutes');
const notificationRoutes = require('./notificationRoutes');
const userRoutes = require('./userRoutes');
const devAuthRoutes = require('./devAuthRoutes');
const s3Routes = require('../routes/S3Routes')

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/criterion', criterionRoutes);
router.use('/institutions', institutionRoutes);
router.use('/university-subtask', universitySubtaskRoutes);
router.use('/autonomous-subtask', autonomousSubtaskRoutes);
router.use('/university-metric', universityMetricRoutes);
router.use('/autonomous-metric', autonomousMetricRoutes);
router.use('/metrics', metricDraftRoutes);
router.use('/upload', uploadRoutes);
router.use('/submission', metricSubmissionRoutes);
router.use('/tasks', taskRoutes);
router.use('/notification', notificationRoutes);
router.use('/users', userRoutes);
router.use('/dev-auth', devAuthRoutes);
router.use('/s3', s3Routes)

module.exports = router;
