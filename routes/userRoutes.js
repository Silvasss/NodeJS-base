const express = require('express')

const { getAllUsers, getSingleUser, showCurrentUser, updateUser, updatePassword } = require('../controllers/userController')

const { authenticateUser, authorizePermissions } = require('../middleware/authentication')


const router = express.Router()


router.route('/').get(authenticateUser, authorizePermissions('admin'), getAllUsers)
router.route('/show').get(authenticateUser, showCurrentUser)
router.route('/:id').get(authenticateUser, getSingleUser)

router.route('/updateUser').patch(authenticateUser, updateUser)
router.route('/updateUserPassword').patch(authenticateUser, updatePassword)


module.exports = router