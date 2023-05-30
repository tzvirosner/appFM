/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require("express");
const expressApp = express();
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const bodyParser = require("body-parser");
expressApp.use(express.static('public'));
expressApp.use(bodyParser.urlencoded({extended: true}));
expressApp.use(awsServerlessExpressMiddleware.eventContext())

const methodOverride = require("method-override");
expressApp.use(methodOverride("_method"));
const Finance = require("financejs");
const finance = new Finance();
const session = require('express-session');
const cookieParser = require('cookie-parser');

const redirectUnsetSession = function (req, res, next) {
    if (req.path === "/") {
        next()
    } else if (!req.session || !req.session.financials) {
        res.redirect("/");
    } else {
        next()
    }
};
expressApp.use(cookieParser());
expressApp.use(session({
    resave: true, // TODO
    saveUninitialized: true, // TODO
    secret: "1231j23k12h3kj12eb12kj3"
}));

// Enable CORS for all methods
expressApp.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

expressApp.use(redirectUnsetSession) // order matters!

// variables

const financials = {
	requ: "required",
	nc: "return (event.charCode !=8 && event.charCode ==0 || ( event.charCode === 46 || (event.charCode >= 48 && event.charCode <= 57)))",
	property_info: {"street address": "", city: "", state: "", zip: "", sf: "", "unit count": 0},
	hold_time: 0,
	budget: {
		purchase_price: ["purchase price", 0],
		closing_costs: ["closing costs", 0],
		construction_costs: ["construction costs", 0],
		total_budget: ["total budget", 0]
	},
	closing_costs_ratio: 0,
	capital_stack: {},
	num_unit_types: 0,
	units: [],
	rir: 0,  // rir = rental inflation rate
	vi: 0, // vi = vacancy input
	bdi: 0, // bdi = bad debt input
	management_fee: 0,
	oiir: 0, //oiir = other_income_inflation_rate
	how_many_expenses: 0,
	expenses: [],
	pricing_metrics: {
		"purchase price": 0,
		"purchase price PSF": 0,
		"purchase price per unit": 0,
		"total project cost": 0,
		"total project cost PSF": 0,
		"total project cost per unit": 0,
		"in place NOI": 0,
		"in place cap rate": 0,
		"GRM": 0
	},
// sdi = senior debt info
	sdi: {
		"loan amount": "",
		"LTV": 0,
		"LTC": 0,
		"interest rate": "",
		"interest only component": 0,
		"amortized component": 0,
		"interest only debt service": 0,
		"amortized debt service": 0,
		"lowest DSCR": 0,
		"average DSCR": 0,
		"dscr": [],
		"sat": [], // sat = senior amortization table
	},
	refinance: {
		"year of refinance": 0,
		"forward year NOI": 0,
		"valuation cap rate": 0,
		"value of asset": 0,
		"LTV": 0,
		"loan amount": 0,
		"% of proceeds for closing costs": 0,
		"cost of refinance": 0,
		"refinance proceeds": 0,
		"repayment of original loan": 0,
		"net refinance proceeds": 0,
		"return of equity": 0,
		"profit from refinance": 0,
		"% of equity invested after refinance": 0,
		"equity invested after refinance": 0,
		"interest rate": 0,
		"interest only component": 0,
		"amortized component": 0,
		"interest only debt service": 0,
		"amortized debt service": 0,
		"lowest DSCR": 0,
		"average DSCR": 0,
		"dscr": [],
		"sat": [], // sat = senior amortization table
	},
// CFP = Cash Flow Projection
	CFP: {
		"year": ["Y0 / in-place"],
		"rental income": [],
		"other income": [],
		"total income": [],
		"vacancy": [],
		"bad debt": [],
		"net income": []
	},
	notes_CFP: [],
	sale: {
		"year of sale": 0,
		"valuation cap rate": 0,
		"NOI": 0,
		"value of asset": 0,
		"% of proceeds for closing costs": 0,
		"cost of sale": 0,
		"sale proceeds": 0,
		"repayment of loan": 0,
		"net sale proceeds": 0,
		"return of equity": 0,
		"profit from sale": 0,
		"profit from refinance": 0,
		"profit from cash flow": 0,
		"total profit": 0,
		"IRR": 0,
		"equity multiple": 0,
		"average cash on cash return": 0,
	}
};

// functions  

function ts(num)
  {
	  const num_parts = num.toString().split(".");
	  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }

// finally code everything in its time BH!   

// address 

expressApp.get("/calulate/", function (req, res) {
    req.session.financials = financials;
    res.render("01_address.ejs", {ts: ts, x: req.session.financials})
})

expressApp.post("/calulate/address", function (req, res) {
    console.log("INSIDE _ ADDRESS")
    req.session.financials.property_info["street address"] = req.body.street_address;
    req.session.financials.property_info["city"] = req.body.city;
    req.session.financials.property_info["state"] = req.body.state;
    req.session.financials.property_info["zip"] = req.body.zip;
    req.session.financials.property_info["sf"] = Number(req.body.sf);
    res.redirect("/hold_time");
})

// hold time 

expressApp.get("/calulate/hold_time", function (req, res) {
    res.render("02_hold_time.ejs", {ts: ts, x: req.session.financials});
});

expressApp.post("/calulate/hold_time", function (req, res) {
    req.session.financials.hold_time = Number(req.body.hold_time);
    let i = 1;
    while (i <= req.session.financials.hold_time + 1) {
        req.session.financials.CFP.year.push("Y" + i);
        i++;
    }

    res.redirect("/budget");
})

// budget  

expressApp.get("/calulate/budget", function (req, res) {
    res.render("03_budget.ejs", {ts: ts, x: req.session.financials})
})

expressApp.post("/calulate/budget", function (req, res) {
    req.session.financials.budget.purchase_price[1] = Number(req.body.purchase_price);
    req.session.financials.closing_costs_ratio = Number(req.body.closing_costs);
    req.session.financials.budget.closing_costs[1] = req.session.financials.budget.purchase_price[1] * (req.session.financials.closing_costs_ratio / 100)
    req.session.financials.budget.construction_costs[1] = Number(req.body.construction_costs);
    req.session.financials.budget.total_budget[1] = req.session.financials.budget.purchase_price[1] + req.session.financials.budget.closing_costs[1] + req.session.financials.budget.construction_costs[1];
    req.session.financials.budget.purchase_price[2] = req.session.financials.budget.purchase_price[1] / req.session.financials.budget.total_budget[1] * 100;
    req.session.financials.budget.closing_costs[2] = req.session.financials.budget.closing_costs[1] / req.session.financials.budget.total_budget[1] * 100;
    req.session.financials.budget.construction_costs[2] = req.session.financials.budget.construction_costs[1] / req.session.financials.budget.total_budget[1] * 100;
    req.session.financials.budget.total_budget[2] = req.session.financials.budget.purchase_price[2] + req.session.financials.budget.closing_costs[2] + req.session.financials.budget.construction_costs[2];
    res.redirect("/debt");
});

//debt 

expressApp.get("/calulate/debt", function (req, res) {
    res.render("04_debt.ejs", {ts: ts, x: req.session.financials})
})

expressApp.post("/calulate/debt", function (req, res) {
    req.session.financials.sdi.LTV = Number(req.body.ltv);
    req.session.financials.sdi["loan amount"] = req.session.financials.sdi.LTV / 100 * req.session.financials.budget.purchase_price[1];
    req.session.financials.sdi.LTC = req.session.financials.sdi["loan amount"] / req.session.financials.budget.total_budget[1] * 100;
    req.session.financials.sdi["interest rate"] = Number(req.body.interest_rate);
    req.session.financials.sdi["interest only component"] = Number(req.body.interest_only);
    req.session.financials.sdi["amortized component"] = Number(req.body.NPER);
    if (req.session.financials.sdi["interest only component"] > 0) {
        req.session.financials.sdi["interest only debt service"] = req.session.financials.sdi["interest rate"] / 100 * req.session.financials.sdi["loan amount"];
    }

    req.session.financials.sdi["amortized debt service"] = finance.AM(req.session.financials.sdi["loan amount"], req.session.financials.sdi["interest rate"], req.session.financials.sdi["amortized component"], 1) * 12;
    req.session.financials.capital_stack.equity = ["equity", req.session.financials.budget.total_budget[1] - req.session.financials.sdi["loan amount"], (req.session.financials.budget.total_budget[1] - req.session.financials.sdi["loan amount"]) / req.session.financials.budget.total_budget[1] * 100];

    req.session.financials.capital_stack.debt = ["debt", req.session.financials.sdi["loan amount"], req.session.financials.sdi["loan amount"] / req.session.financials.budget.total_budget[1] * 100];
    req.session.financials.capital_stack.total_capital = ["total capital", req.session.financials.capital_stack.debt[1] + req.session.financials.capital_stack.equity[1], (req.session.financials.capital_stack.debt[1] + req.session.financials.capital_stack.equity[1]) / req.session.financials.budget.total_budget[1] * 100];
    req.session.financials.sdi.sat.push([]);
    req.session.financials.sdi.sat[0].push(0, 0, 0, 0, 0, 0, 0, 0, req.session.financials.sdi["loan amount"]);
    let i = 1;
    while (i <= req.session.financials.sdi["amortized component"] + req.session.financials.sdi["interest only component"]) {
        req.session.financials.sdi.sat[i] = [];
        req.session.financials.sdi.sat[i].push(Math.ceil(i / 12));
        req.session.financials.sdi.sat[i].push(i);
        req.session.financials.sdi.sat[i].push(req.session.financials.sdi.sat[i - 1][8]);
        if (i <= req.session.financials.sdi["interest only component"]) {
            req.session.financials.sdi.sat[i].push(req.session.financials.sdi["interest only debt service"] / 12);
        } else {
            req.session.financials.sdi.sat[i].push(finance.AM(req.session.financials.sdi.sat[i][2], req.session.financials.sdi["interest rate"], req.session.financials.sdi["amortized component"] - i + 1 + req.session.financials.sdi["interest only component"], 1));
        }

        req.session.financials.sdi.sat[i].push(req.session.financials.sdi["interest rate"] / 100 / 12 * req.session.financials.sdi.sat[i][2]);
        req.session.financials.sdi.sat[i].push(req.session.financials.sdi.sat[i][3] - req.session.financials.sdi.sat[i][4]);
        req.session.financials.sdi.sat[i].push(req.session.financials.sdi.sat[i - 1][6] + req.session.financials.sdi.sat[i][4]);
        req.session.financials.sdi.sat[i].push(req.session.financials.sdi.sat[i - 1][7] + req.session.financials.sdi.sat[i][5]);
        req.session.financials.sdi.sat[i].push(req.session.financials.sdi.sat[i][2] - req.session.financials.sdi.sat[i][5]);
        if (i === req.session.financials.sdi["interest only component"] + req.session.financials.sdi["amortized component"]) {
            req.session.financials.sdi.sat[i][8] = Math.abs(Math.round(req.session.financials.sdi.sat[i][8]));
        }

        i++;
    }

    res.redirect("/rental_income_HM");
});

// rental income how many 

expressApp.get("/calulate/rental_income_HM", function (req, res) {
    res.render("05_rental_income_HM.ejs", {ts: ts, x: req.session.financials});
});

expressApp.post("/calulate/rental_income_HM", function (req, res) {
    req.session.financials.num_unit_types = req.body.how_many;
    res.redirect("/rental_income");
});

// rental income  

expressApp.get("/calulate/rental_income", function (req, res) {
    res.render("06_rental_income.ejs", {ts: ts, x: req.session.financials});
});

expressApp.post("/calulate/rental_income", function (req, res) {
    req.session.financials.CFP["rental income"][0] = 0;
    let i = 0;
    while (i < req.session.financials.num_unit_types) {
        req.session.financials.units.push([]);
        req.session.financials.units[i].push(req.body[`type_${i}`]);
        req.session.financials.units[i].push(Number(req.body[`income_${i}`]));
        req.session.financials.units[i].push(Number(req.body[`amount_${i}`]));
        req.session.financials.property_info["unit count"] += req.session.financials.units[i][2];
        req.session.financials.CFP["rental income"][0] += req.session.financials.units[i][1] * req.session.financials.units[i][2] * 12;
        i++;
    }

    req.session.financials.rir = Number(req.body.inflation_rate);
    res.redirect("/other_rental_inputs");
});

// other rental inputs  

expressApp.get("/calulate/other_rental_inputs", function (req, res) {
    res.render("07_other_rental_inputs.ejs", {ts: ts, x: req.session.financials});
});

expressApp.post("/calulate/other_rental_inputs", function (req, res) {
    req.session.financials.vi = Number(req.body.vacancy);
    req.session.financials.bdi = Number(req.body.bad_debt);
    req.session.financials.management_fee = Number(req.body.management_fee);
    res.redirect("/other_income");
});

// other income 

expressApp.get("/calulate/other_income", function (req, res) {
    res.render("08_other_income.ejs", {ts: ts, x: req.session.financials});
});

expressApp.post("/calulate/other_income", function (req, res) {
    req.session.financials.oiir = Number(req.body.growth);
    let i = 0;
    while (i <= req.session.financials.hold_time + 1) {
        if (i > 0) {
            req.session.financials.CFP["rental income"].push(req.session.financials.CFP["rental income"][0] * (1 + req.session.financials.rir / 100) ** i);
        }

        req.session.financials.CFP["other income"].push(Number(req.body.other_income_amount) * (1 + req.session.financials.oiir / 100) ** i);
        req.session.financials.CFP["total income"].push(req.session.financials.CFP["rental income"][i] + req.session.financials.CFP["other income"][i]);
        req.session.financials.CFP["vacancy"].push(-req.session.financials.CFP["total income"][i] * req.session.financials.vi / 100);
        req.session.financials.CFP["bad debt"].push(-req.session.financials.CFP["total income"][i] * req.session.financials.bdi / 100);
        req.session.financials.CFP["net income"].push(req.session.financials.CFP["total income"][i] + req.session.financials.CFP["vacancy"][i] + req.session.financials.CFP["bad debt"][i]);
        i++;
    }

    req.session.financials.notes_CFP.push("", req.session.financials.rir + "% annual growth", req.session.financials.oiir + "% annual growth", "N/A", req.session.financials.vi + "% vacancy factor", req.session.financials.bdi + "% bad debt factor", "N/A", req.session.financials.management_fee + "% management fee");
    res.redirect("/how_many_expenses");
});

// how many expenses  

expressApp.get("/calulate/how_many_expenses", function (req, res) {
    res.render("09_how_many_expenses.ejs", {ts: ts, x: req.session.financials});
});

expressApp.post("/calulate/how_many_expenses", function (req, res) {
    req.session.financials.how_many_expenses = Number(req.body.how_many);
    var i = 0;
    req.session.financials.CFP["management fee"] = [];
    while (i <= req.session.financials.hold_time + 1) {
        req.session.financials.CFP["management fee"].push(req.session.financials.management_fee / 100 * req.session.financials.CFP["net income"][i]);
        i++;
    }
    if (req.session.financials.how_many_expenses === 0) {
        req.session.financials.CFP["total expenses"] = [];
        req.session.financials.CFP["NOI"] = [];
        var i = 0;
        while (i <= req.session.financials.hold_time + 1) {
            req.session.financials.CFP["total expenses"][i] = 0;
            req.session.financials.CFP["total expenses"][i] += req.session.financials.CFP["management fee"][i];
            req.session.financials.CFP["NOI"][i] = req.session.financials.CFP["net income"][i] - req.session.financials.CFP["total expenses"][i];
            i++;
        }

        res.redirect("/is_there_refinance")
    } else {
        res.redirect("/expenses");
    }

});

// expenses  

expressApp.get("/calulate/expenses", function (req, res) {
    res.render("10_expenses.ejs", {ts: ts, x: req.session.financials});
});

expressApp.post("/calulate/expenses", function (req, res) {
    var i = 0;
    while (i < req.session.financials.how_many_expenses) {
        req.session.financials.expenses.push([]);
        req.session.financials.expenses[i].push(req.body[`type_${i}`]);
        req.session.financials.expenses[i].push(Number(req.body[`amount_${i}`]));
        req.session.financials.expenses[i].push(Number(req.body[`inflation_${i}`]));
        req.session.financials.notes_CFP.push(req.session.financials.expenses[i][2] + "% annual growth")
        i++;
    }

    var i = 0;
    while (i < req.session.financials.how_many_expenses) {
        var j = 0;
        req.session.financials.CFP[req.session.financials.expenses[i][0]] = [];
        while (j <= req.session.financials.hold_time + 1) {
            req.session.financials.CFP[req.session.financials.expenses[i][0]].push(req.session.financials.expenses[i][1] * (1 + req.session.financials.expenses[i][2] / 100) ** j);
            j++;
        }
        i++;
    }

    req.session.financials.CFP["total expenses"] = [];
    req.session.financials.CFP["NOI"] = [];
    var i = 0;
    while (i <= req.session.financials.hold_time + 1) {
        var j = 0;
        req.session.financials.CFP["total expenses"][i] = 0;
        while (j < req.session.financials.how_many_expenses) {
            req.session.financials.CFP["total expenses"][i] += req.session.financials.CFP[req.session.financials.expenses[j][0]][i];
            j++;
        }

        req.session.financials.CFP["total expenses"][i] += req.session.financials.CFP["management fee"][i];
        req.session.financials.CFP["NOI"][i] = req.session.financials.CFP["net income"][i] - req.session.financials.CFP["total expenses"][i];
        i++;
    }

    res.redirect("/is_there_refinance");
});

// is there a refinance  

expressApp.get("/calulate/is_there_refinance", function (req, res) {
    res.render("11_is_there_refinance.ejs", {ts: ts, x: req.session.financials});
});

expressApp.post("/calulate/is_there_refinance", function (req, res) {
    req.session.financials.CFP["debt service"] = [];
    req.session.financials.CFP.DSCR = [];
    req.session.financials.CFP["debt service"].push("N/A");
    req.session.financials.sdi.dscr.push("N/A");
    var i = 1;
    while (i < req.session.financials.sdi.sat.length) {
        if ((i - 1) % 12 === 0) {
            req.session.financials.CFP["debt service"][(i - 1) / 12 + 1] = 0;
        }

        req.session.financials.CFP["debt service"][Math.ceil(i / 12)] += req.session.financials.sdi.sat[i][3];
        if (i % 12 === 0) {
            req.session.financials.sdi.dscr.push(req.session.financials.CFP["NOI"][i / 12] / req.session.financials.CFP["debt service"][i / 12]);
        }

        i++;
        if ((i - 1) / 12 === req.session.financials.hold_time + 1) break;
    }

    req.session.financials.sdi["lowest DSCR"] = Math.min(...req.session.financials.sdi.dscr.slice(1));
    var i = 1;
    let j = 0;
    while (i < req.session.financials.sdi.dscr.length - 1) {
        j += req.session.financials.sdi.dscr[i];
        i++;
    }

    req.session.financials.sdi["average DSCR"] = j / (req.session.financials.sdi.dscr.length - 2);
    req.session.financials.notes_CFP.push("N/A", "N/A", "N/A", "N/A", "N/A", "N/A");
    if (req.body.refinance === "yes") {
        res.redirect("/refinance_sizing");
    } else if (req.body.refinance === "no") {
        req.session.financials.notes_CFP.push("");
        res.redirect("/sale");
    }

});

// refinance sizing  

expressApp.get("/calulate/refinance_sizing", function (req, res) {
    res.render("12_refinance_sizing.ejs", {ts: ts, x: req.session.financials});
});

expressApp.post("/calulate/refinance_sizing", function (req, res) {
    req.session.financials.refinance["year of refinance"] = Number(req.body.year.replace("Y", ""));
    req.session.financials.refinance["forward year NOI"] = req.session.financials.CFP["NOI"][req.session.financials.refinance["year of refinance"] + 1];
    req.session.financials.refinance["valuation cap rate"] = Number(req.body.cap_rate);
    req.session.financials.refinance["value of asset"] = req.session.financials.refinance["forward year NOI"] / (req.session.financials.refinance["valuation cap rate"] / 100);
    req.session.financials.refinance["LTV"] = Number(req.body.LTV);
    req.session.financials.refinance["loan amount"] = req.session.financials.refinance["value of asset"] * req.session.financials.refinance["LTV"] / 100;
    req.session.financials.refinance["% of proceeds for closing costs"] = Number(req.body.closing_costs);
    req.session.financials.refinance["cost of refinance"] = -(req.session.financials.refinance["% of proceeds for closing costs"] * req.session.financials.refinance["loan amount"] / 100);
    req.session.financials.refinance["refinance proceeds"] = req.session.financials.refinance["loan amount"] + req.session.financials.refinance["cost of refinance"];
    req.session.financials.refinance["repayment of original loan"] = -req.session.financials.sdi.sat[req.session.financials.refinance["year of refinance"] * 12][8];
    req.session.financials.refinance["net refinance proceeds"] = req.session.financials.refinance["refinance proceeds"] + req.session.financials.refinance["repayment of original loan"];
    if (req.session.financials.refinance["net refinance proceeds"] < 0) {
        res.redirect("/refinance_will_not_work");
    } else {
        if (req.session.financials.refinance["net refinance proceeds"] < req.session.financials.capital_stack.equity[1]) {
            req.session.financials.refinance["return of equity"] = -req.session.financials.refinance["net refinance proceeds"];
        } else {
            req.session.financials.refinance["return of equity"] = -req.session.financials.capital_stack.equity[1];
        }

        req.session.financials.refinance["profit from refinance"] = req.session.financials.refinance["net refinance proceeds"] + req.session.financials.refinance["return of equity"];
        req.session.financials.refinance["equity invested after refinance"] = req.session.financials.capital_stack.equity[1] + req.session.financials.refinance["return of equity"];
        req.session.financials.refinance["% of equity invested after refinance"] = req.session.financials.refinance["equity invested after refinance"] / req.session.financials.capital_stack.equity[1];
        res.redirect("/refinance_debt_service");
    }
});

// refinance debt service  

expressApp.get("/calulate/refinance_debt_service", function (req, res) {
    res.render("13_refinance_debt_service.ejs", {ts: ts, x: req.session.financials});
});

expressApp.post("/calulate/refinance_debt_service", function (req, res) {
    req.session.financials.refinance["interest rate"] = Number(req.body.interest_rate);
    req.session.financials.refinance["interest only component"] = Number(req.body.interest_only);
    req.session.financials.refinance["amortized component"] = Number(req.body.NPER);
    if (req.session.financials.refinance["interest only component"] > 0) {
        req.session.financials.refinance["interest only debt service"] = req.session.financials.refinance["interest rate"] / 100 * req.session.financials.refinance["loan amount"];
    }

    req.session.financials.refinance["amortized debt service"] = finance.AM(req.session.financials.refinance["loan amount"], req.session.financials.refinance["interest rate"], req.session.financials.refinance["amortized component"], 1) * 12;
    req.session.financials.refinance.sat.push([]);
    req.session.financials.refinance.sat[0].push(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, req.session.financials.refinance["loan amount"]);
    var i = 1;
    while (i <= req.session.financials.refinance["amortized component"] + req.session.financials.refinance["interest only component"]) {
        req.session.financials.refinance.sat[i] = [];
        req.session.financials.refinance.sat[i].push(Math.ceil(i / 12) + req.session.financials.refinance["year of refinance"]);
        req.session.financials.refinance.sat[i].push(i + (req.session.financials.refinance["year of refinance"] * 12));
        req.session.financials.refinance.sat[i].push(Math.ceil(i / 12));
        req.session.financials.refinance.sat[i].push(i);
        req.session.financials.refinance.sat[i].push(req.session.financials.refinance.sat[i - 1][10]);
        if (i <= req.session.financials.refinance["interest only component"]) {
            req.session.financials.refinance.sat[i].push(req.session.financials.refinance["interest only debt service"] / 12);
        } else {
            req.session.financials.refinance.sat[i].push(finance.AM(req.session.financials.refinance.sat[i][4], req.session.financials.refinance["interest rate"], req.session.financials.refinance["amortized component"] - i + 1 + req.session.financials.refinance["interest only component"], 1));
        }

        req.session.financials.refinance.sat[i].push(req.session.financials.refinance["interest rate"] / 100 / 12 * req.session.financials.refinance.sat[i][4]);
        req.session.financials.refinance.sat[i].push(req.session.financials.refinance.sat[i][5] - req.session.financials.refinance.sat[i][6]);
        req.session.financials.refinance.sat[i].push(req.session.financials.refinance.sat[i - 1][8] + req.session.financials.refinance.sat[i][6]);
        req.session.financials.refinance.sat[i].push(req.session.financials.refinance.sat[i - 1][9] + req.session.financials.refinance.sat[i][7]);
        req.session.financials.refinance.sat[i].push(req.session.financials.refinance.sat[i][4] - req.session.financials.refinance.sat[i][7]);
        if (i === req.session.financials.refinance["interest only component"] + req.session.financials.refinance["amortized component"]) {
            req.session.financials.refinance.sat[i][10] = Math.abs(Math.round(req.session.financials.refinance.sat[i][10]));
        }

        i++;
    }

    var i = 1;
    while (i < req.session.financials.refinance.sat.length) {
        if (i > req.session.financials.refinance["year of refinance"] * 12) {
            if ((i - 1) % 12 === 0) {
                req.session.financials.CFP["debt service"][(i - 1) / 12 + 1] = 0;
            }

            req.session.financials.CFP["debt service"][Math.ceil(i / 12)] += req.session.financials.refinance.sat[i - (req.session.financials.refinance["year of refinance"] * 12)][5];
            if (i % 12 === 0) {
                req.session.financials.refinance.dscr.push(req.session.financials.CFP["NOI"][i / 12] / req.session.financials.CFP["debt service"][i / 12]);
            }

        }
        i++;
        if ((i - 1) / 12 === req.session.financials.hold_time + 1) break;
    }

    req.session.financials.refinance["lowest DSCR"] = Math.min(...req.session.financials.refinance.dscr.slice(0, -1));
    var i = 0;
    var j = 0;
    while (i < req.session.financials.refinance.dscr.length - 1) {
        j += req.session.financials.refinance.dscr[i];
        i++;
    }

    req.session.financials.refinance["average DSCR"] = j / (req.session.financials.refinance.dscr.length - 1);
    req.session.financials.sdi.dscr = req.session.financials.sdi.dscr.slice(0, req.session.financials.refinance["year of refinance"] + 1);
    req.session.financials.sdi["lowest DSCR"] = Math.min(...req.session.financials.sdi.dscr.slice(1));
    var i = 1;
    var j = 0;
    while (i < req.session.financials.sdi.dscr.length) {
        j += req.session.financials.sdi.dscr[i];
        i++;
    }

    req.session.financials.sdi["average DSCR"] = j / (req.session.financials.sdi.dscr.length - 1);
    req.session.financials.notes_CFP.push("N/A");
    res.redirect("/sale");
});

// refinance will not work  

expressApp.get("/calulate/refinance_will_not_work", function (req, res) {
    res.render("14_refinance_will_not_work.ejs", {ts: ts, x: req.session.financials});
});

expressApp.post("/calulate/refinance_will_not_work", function (req, res) {
    req.session.financials.refinance["year of refinance"] = 0;
    req.session.financials.refinance["forward year NOI"] = 0;
    req.session.financials.refinance["valuation cap rate"] = 0;
    req.session.financials.refinance["value of asset"] = 0;
    req.session.financials.refinance["LTV"] = 0;
    req.session.financials.refinance["loan amount"] = 0;
    req.session.financials.refinance["% of proceeds for closing costs"] = 0;
    req.session.financials.refinance["cost of refinance"] = 0;
    req.session.financials.refinance["refinance proceeds"] = 0;
    req.session.financials.refinance["repayment of original loan"] = 0;
    req.session.financials.refinance["net refinance proceeds"] = 0;
    if (req.body.what_now === "re-enter") {
        res.redirect("/refinance_sizing");
    } else if (req.body.what_now === "cancel") {
        req.session.financials.notes_CFP.push("");
        res.redirect("/sale");
    }
});

// sale 

expressApp.get("/calulate/sale", function (req, res) {
    res.render("15_sale.ejs", {ts: ts, x: req.session.financials});
});

expressApp.post("/calulate/sale", function (req, res) {
    var i = 0;
    while (i < req.session.financials.sdi.dscr.length) {
        req.session.financials.CFP.DSCR.push(req.session.financials.sdi.dscr[i]);
        i++;
    }

    i = 0;
    while (i < req.session.financials.refinance.dscr.length) {
        req.session.financials.CFP.DSCR.push(req.session.financials.refinance.dscr[i]);
        i++;
    }

    req.session.financials.CFP["cash flow"] = [];
    req.session.financials.CFP["cash flow"].push("N/A");
    req.session.financials.CFP["cash on cash return"] = [];
    req.session.financials.CFP["cash on cash return"].push("N/A");
    req.session.financials.CFP["cash on cash return (refinance proceeds deducted)"] = [];
    req.session.financials.CFP["cash on cash return (refinance proceeds deducted)"].push("N/A");
    req.session.financials.CFP["capital events"] = [];
    req.session.financials.CFP["cash flows including capital events"] = [];
    req.session.financials.CFP["cash flows including capital events"].push(-req.session.financials.capital_stack.equity[1]);

	i = 1;
    while (i <= req.session.financials.hold_time + 1) {
        req.session.financials.CFP["cash flow"].push(req.session.financials.CFP["NOI"][i] - req.session.financials.CFP["debt service"][i]);
        req.session.financials.CFP["cash flows including capital events"].push(req.session.financials.CFP["cash flow"][i]);
        req.session.financials.CFP["cash on cash return"].push(req.session.financials.CFP["cash flow"][i] / req.session.financials.capital_stack.equity[1] * 100);
        req.session.financials.sale["average cash on cash return"] += req.session.financials.CFP["cash on cash return"][i];
        if (i <= req.session.financials.refinance["year of refinance"] || req.session.financials.refinance["year of refinance"] === 0) {
            req.session.financials.CFP["cash on cash return (refinance proceeds deducted)"].push(req.session.financials.CFP["cash on cash return"][i]);
        } else if (req.session.financials.refinance["equity invested after refinance"] > 0) {
            req.session.financials.CFP["cash on cash return (refinance proceeds deducted)"].push(req.session.financials.CFP["cash flow"][i] / req.session.financials.refinance["equity invested after refinance"] * 100);
        } else if (req.session.financials.refinance["year of refinance"] > 0) {
            req.session.financials.CFP["cash on cash return (refinance proceeds deducted)"].push("all equity returned");
        }
        if (i <= req.session.financials.hold_time) {
            req.session.financials.sale["profit from cash flow"] += req.session.financials.CFP["cash flow"][i];
        }

        i++;
    }

    req.session.financials.sale["year of sale"] = req.session.financials.hold_time;
    req.session.financials.sale["valuation cap rate"] = Number(req.body.cap_rate);
    req.session.financials.sale["% of proceeds for closing costs"] = Number(req.body.closing_costs);
    req.session.financials.sale["NOI"] = req.session.financials.CFP["NOI"][req.session.financials.hold_time + 1];
    req.session.financials.sale["value of asset"] = req.session.financials.sale["NOI"] / (req.session.financials.sale["valuation cap rate"] / 100);
    req.session.financials.sale["cost of sale"] = -(req.session.financials.sale["% of proceeds for closing costs"] / 100 * req.session.financials.sale["value of asset"]);
    req.session.financials.sale["sale proceeds"] = req.session.financials.sale["value of asset"] + req.session.financials.sale["cost of sale"];
    if (req.session.financials.refinance["year of refinance"] === 0) {
        req.session.financials.sale["repayment of loan"] = -req.session.financials.sdi.sat[req.session.financials.hold_time * 12][8];
    } else {
        req.session.financials.sale["repayment of loan"] = -req.session.financials.refinance.sat[(req.session.financials.hold_time - req.session.financials.refinance["year of refinance"]) * 12][10];
    }

    req.session.financials.sale["net sale proceeds"] = req.session.financials.sale["sale proceeds"] + req.session.financials.sale["repayment of loan"];
    if (req.session.financials.refinance["year of refinance"] === 0) {
        req.session.financials.sale["return of equity"] = -req.session.financials.capital_stack.equity[1];
    } else {
        req.session.financials.sale["return of equity"] = -req.session.financials.refinance["equity invested after refinance"]
    }

    req.session.financials.sale["profit from sale"] = req.session.financials.sale["net sale proceeds"] + req.session.financials.sale["return of equity"];
    if (req.session.financials.refinance["year of refinance"] > 0) {
        req.session.financials.sale["profit from refinance"] = req.session.financials.refinance["profit from refinance"];
    }

    req.session.financials.sale["total profit"] = req.session.financials.sale["profit from sale"] + req.session.financials.sale["profit from refinance"] + req.session.financials.sale["profit from cash flow"];
    req.session.financials.sale["equity multiple"] = (req.session.financials.sale["total profit"] + req.session.financials.capital_stack.equity[1]) / req.session.financials.capital_stack.equity[1];
    req.session.financials.sale["average cash on cash return"] = (req.session.financials.sale["average cash on cash return"] - req.session.financials.CFP["cash on cash return"][req.session.financials.CFP["cash on cash return"].length - 1]) / req.session.financials.hold_time;
    if (req.session.financials.refinance["year of refinance"] > 0) {
        req.session.financials.CFP["cash flows including capital events"][req.session.financials.refinance["year of refinance"]] += req.session.financials.refinance["net refinance proceeds"];
    }

    req.session.financials.CFP["cash flows including capital events"][req.session.financials.hold_time] += req.session.financials.sale["net sale proceeds"];
    try {
        finance.IRR(...req.session.financials.CFP["cash flows including capital events"].slice(0, -1))
    } catch {
        req.session.financials.sale["IRR"] = "The IRR metric could not be computed based on the data inputted."
    }
    if (req.session.financials.sale["IRR"] === 0) {
        req.session.financials.sale["IRR"] = finance.IRR(...req.session.financials.CFP["cash flows including capital events"].slice(0, -1));
    }

    req.session.financials.pricing_metrics["purchase price"] = req.session.financials.budget.purchase_price[1];
    if (typeof req.session.financials.property_info["sf"] === "number" && req.session.financials.property_info["sf"] > 0) {
        req.session.financials.pricing_metrics["purchase price PSF"] = req.session.financials.pricing_metrics["purchase price"] / req.session.financials.property_info["sf"];
    } else {
        req.session.financials.pricing_metrics["purchase price PSF"] = "SF not provided";
    }

    req.session.financials.pricing_metrics["purchase price per unit"] = req.session.financials.pricing_metrics["purchase price"] / req.session.financials.property_info["unit count"];
    req.session.financials.pricing_metrics["total project cost"] = req.session.financials.budget.total_budget[1];
    if (typeof req.session.financials.property_info["sf"] === "number" && req.session.financials.property_info["sf"] > 0) {
        req.session.financials.pricing_metrics["total project cost PSF"] = req.session.financials.pricing_metrics["total project cost"] / req.session.financials.property_info["sf"];
    } else {
        req.session.financials.pricing_metrics["total project cost PSF"] = "SF not provided";
    }
    req.session.financials.pricing_metrics["total project cost per unit"] = req.session.financials.pricing_metrics["total project cost"] / req.session.financials.property_info["unit count"];
    req.session.financials.pricing_metrics["in place NOI"] = req.session.financials.CFP["NOI"][0];
    req.session.financials.pricing_metrics["in place cap rate"] = req.session.financials.pricing_metrics["in place NOI"] / req.session.financials.pricing_metrics["purchase price"] * 100;
    req.session.financials.pricing_metrics["GRM"] = req.session.financials.pricing_metrics["purchase price"] / req.session.financials.CFP["total income"][0];
    req.session.financials.CFP["capital events"].push(-req.session.financials.capital_stack.equity[1]);
    var i = 1;
    while (i <= req.session.financials.hold_time + 1) {
        if (i === req.session.financials.refinance["year of refinance"]) {
            req.session.financials.CFP["capital events"].push(req.session.financials.refinance["net refinance proceeds"]);
        } else if (i === req.session.financials.sale["year of sale"]) {
            req.session.financials.CFP["capital events"].push(req.session.financials.sale["net sale proceeds"]);
        } else {
            req.session.financials.CFP["capital events"].push(0);
        }
        i++;
    }

    req.session.financials.notes_CFP.push("N/A", "N/A");
    res.redirect("/output");
});

// output page 

expressApp.get("/calulate/output", function (req, res) {
    res.render("16_output_file.ejs", {ts: ts, x: req.session.financials, number: "number"});
});

expressApp.post("/calulate/output", function (req, res) {
    res.redirect("/output");
});

// amortization - inititial loan 

expressApp.post("/calulate/amort_initial", function (req, res) {
    res.render("17_amort_initial.ejs", {ts: ts, x: req.session.financials, number: "number"});
});

// amortization - refinance loan 

expressApp.post("/calulate/amort_refinance", function (req, res) {
    res.render("18_amort_refinance.ejs", {ts: ts, x: req.session.financials, number: "number"});
});


const port = process.env.PORT || 3000;
expressApp.listen(port, function () {
    console.log("server has started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = expressApp;

