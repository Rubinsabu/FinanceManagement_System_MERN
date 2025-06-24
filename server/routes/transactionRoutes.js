const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
    addTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction
} = require('../controllers/transactionController');

router.use(authMiddleware);
router.post('/',addTransaction);
router.get('/',getTransactions);
router.put('/:id',updateTransaction);
router.delete('/:id',deleteTransaction);

module.exports = router;