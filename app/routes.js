//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const redirect = (req, res, url) => {
  if (req.session.data['redirectUrl']) {
    req.session.data['redirectUrl'] = undefined;
    res.redirect("/check")
  }
  else {
    res.redirect(url)
  }
}

const requiredFieldValidation = (req, res, property, successUrl, failUrl, errorMessage) => {
  const value = req.session.data[property]
  if (!value){
        req.session.data['error'] = errorMessage;
        res.redirect(failUrl);
  } else {
    req.session.data['error'] = undefined;
    redirect(req, res, successUrl)
  }
}

// Add your routes here
router.post('/schemes-answer', function (req, res) {
    requiredFieldValidation(req, res, 'schemes', '/children', '/schemes', 'Select a scheme');
})
router.post('/children-answer', function (req, res) {
    requiredFieldValidation(req, res, 'number_of_children', '/age', '/children', 'Enter how many children you have');
})
router.post('/age-answer', function (req, res) {
    requiredFieldValidation(req, res, 'age-over-nine-months', '/disability', '/age', 'Select if your child is over 9 months');
})
router.post('/disability-answer', function (req, res) {
    requiredFieldValidation(req, res, 'disability', '/hours', '/disability', 'Select if your child has a disability');
})
router.post('/hours-answer', function (req, res) {
    requiredFieldValidation(req, res, 'hours', '/weeks', '/hours', 'Enter how many hours per week will your child will need');
})
router.post('/weeks-answer', function (req, res) {
    requiredFieldValidation(req, res, 'weeks', '/provider-frequency', '/weeks', 'Select how many weeks of the year you require care');
})
router.post('/provider-frequency-answer', function (req, res) {
    requiredFieldValidation(req, res, 'provider-frequency', '/provider-cost', '/provider-frequency', 'Enter how your provider charges for paid childcare');
})
router.post('/provider-cost-answer', function (req, res) {
    requiredFieldValidation(req, res, 'provider-rate', '/provider-hours', '/provider-cost', 'Enter your provider cost');
})
router.post('/provider-hours-answer', function (req, res) {
    requiredFieldValidation(req, res, 'provider-all-hours', '/consumables', '/provider-hours', 'Select the entitled hours used');
})
router.post('/consumables-answer', function (req, res) {
    redirect(req, res, "extras");
})
router.post('/extras-answer', function (req, res) {
    redirect(req, res, "check");
})