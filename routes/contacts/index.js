const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')
const {
  validationQueryContact,
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
  validationObjectId
} = require('./valid-contacts-router')
const guard = require('../../helper/guard')
const subscription = require('../../helper/subscription')
const { UserSubscription } = require('../../helper/constants')
const handleError = require('../../helper/handle-error')

router.get('/', guard, validationQueryContact, ctrl.getAll).post('/', guard, validationCreateContact, handleError, ctrl.create)

router
  .get('/:contactId', guard, validationObjectId, ctrl.getById)
  .put('/:contactId', guard, validationUpdateContact, ctrl.update)
  .delete('/:contactId', guard, validationObjectId, validationObjectId, ctrl.remove)

router.patch('/:contactId/favorite', guard, validationObjectId, validationUpdateStatusContact, ctrl.updateStatus)

router.get('/starter', guard, subscription(UserSubscription.STARTER), ctrl.onlySTARTER)

router.get('/pro', guard, subscription(UserSubscription.PRO), ctrl.onlyPRO)

router.get('/business', guard, subscription(UserSubscription.BUSINESS), ctrl.onlyBUSINESS)

module.exports = router
