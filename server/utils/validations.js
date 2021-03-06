/**
 * @file indexController.js
 * @author Ripan Halder
 * @version  1.0
 * @since 01/20/2020
 */

const { check, body } = require('express-validator');
const REQUEST_PARAM = require('../constants/constants').REQUEST_PARAM;

/**
 * Contains the validations for the registeration POST & PUT API: /v1/user
 * @memberof validations
 * @constant createUserValidator
 */
const createUserValidator = [
    check(REQUEST_PARAM.CREATE_USER.EMAIL_ADDRESS)
    .exists()
    .isEmail(),

    check(REQUEST_PARAM.CREATE_USER.PASSWORD)
    .exists(),
    check(REQUEST_PARAM.CREATE_USER.FIRSTNAME)
    .exists()
    .isLength({
        min: 1,
        max: 100
    }),

    check(REQUEST_PARAM.CREATE_USER.LASTNAME)
    .exists()
    .isLength({
        min: 1,
        max: 100
    })
]

const createBillValidator = [
    check(REQUEST_PARAM.CREATE_BILL.BILL_DATE)
    .exists(),

    check(REQUEST_PARAM.CREATE_BILL.DUE_DATE)
    .exists(),

    check(REQUEST_PARAM.CREATE_BILL.AMOUNT_DUE)
    .exists()
    .isNumeric(),
    
    check(REQUEST_PARAM.CREATE_BILL.CATEGORIES)
    .exists()
    .isArray(),
    
    check(REQUEST_PARAM.CREATE_BILL.PAYMENTSTATUS)
    .exists(),
    
    check(REQUEST_PARAM.CREATE_BILL.VENDOR)
    .exists(),

    check(REQUEST_PARAM.CREATE_BILL.ATTACHMENT)
    .not().exists()

]

const paymentStatusValidator = body('paymentStatus').custom((value, { req }) => {
    if (value !== "paid" && value !== "due" && value !== "past_due" && value !== "no_payment_required")  {
      throw new Error(`Payment Status must be 'paid', 'due', 'past_due' or 'no_payment_required'`);
    }
    return true;
  })

module.exports = {
    createBillValidator, createUserValidator, paymentStatusValidator
};