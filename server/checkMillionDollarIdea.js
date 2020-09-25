const checkMillionDollarIdea = (req, res, next) => {

    // if (!Number(req.body.numWeeks) || !Number(req.body.weeklyRevenue)) {
    //     res.status(400).send()
    // }

    // if ((req.body.numWeeks * req.body.weeklyRevenue) < 1000000) {
    //     res.status(400).send()
    // }

    const { numWeeks, weeklyRevenue } = req.body;
    const totalValue = Number(req.body.numWeeks) * Number(req.body.weeklyRevenue);

    if (!numWeeks || !weeklyRevenue || isNaN(totalValue) || (totalValue < 1000000)) {
        res.status(400).send();
    } else {
        next();
    }



};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
