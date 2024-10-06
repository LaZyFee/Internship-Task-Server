import { PlanModel } from "../Models/PlanModel.js";

export const getPlans = async (req, res) => {
    try {
        const plans = await PlanModel.find();
        res.json(plans);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const getPlansBySize = async (req, res) => {
    const { size } = req.params; // Get the size from the URL parameter

    try {
        // Find all plans
        const plans = await PlanModel.find();

        // Filter out the specific account size from each plan
        const filteredPlans = plans.map(plan => {
            if (plan.account_sizes[size]) {
                return {
                    plan_name: plan.plan_name,
                    details: plan.account_sizes[size],  // Return the account size details
                };
            }
            return null;
        }).filter(plan => plan !== null);  // Remove any null values (where size doesn't exist)

        if (filteredPlans.length === 0) {
            return res.status(404).json({ message: "No plans found for this size" });
        }

        res.json(filteredPlans);  // Send the filtered plans back to the client
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const updatePlan = async (req, res) => {
    try {
        const plan = await PlanModel.findByIdAndUpdate(
            req.params.id,
            req.body,  // Assuming req.body contains the updated details
            { new: true }
        );
        res.json(plan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const deletePlan = async (req, res) => {
    try {
        const plan = await PlanModel.findByIdAndDelete(req.params.id);
        res.json(plan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

