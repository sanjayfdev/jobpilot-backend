import Job from "../models/job.model.js";

/* CREATE JOB */
export const createJob = async (req, res) => {
    console.log(req.body)
    try {
        const job = await Job.create({
            ...req.body,
            user: req.user.userId,
        });

        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* GET ALL JOBS (Logged-in user only) */
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ user: req.user.userId }).sort({
            appliedDate: -1,
        });

        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* UPDATE JOB */
export const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (job.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        if (job.status === "Rejected") {
            return res
                .status(400)
                .json({ message: "Rejected job cannot be updated" });
        }

        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* DELETE JOB */
export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (job.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await job.deleteOne();
        res.json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
