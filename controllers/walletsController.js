const User = require('../models/User');

// Find the wallet balance of a user from the wallet ID.
const getBalance = async (req, res, next) => {
    try {
        const { wallet_id } = req.params;
        const user = await User.findOne({ user_id: wallet_id });
        if (user) {
          res.status(200).json({
            wallet_id: user.user_id,
            balance: user.balance,
            wallet_user: {
              user_id: user.user_id,
              user_name: user.user_name,
            },
          });
        } else {
          res.status(404).json({ message: `wallet with id: ${wallet_id} was not found` });
        }
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

// add balance
const addBalance = async(req, res, next)=>{
    try {
        const walletId = parseInt(req.params.wallet_id);
        const { recharge } = req.body;
    
        // Validate recharge amount
        if (recharge < 100 || recharge > 10000) {
          return res.status(400).json({ message: `invalid amount: ${recharge}` });
        }
    
        // Find the user by wallet ID
        const user = await User.findOne({ user_id: walletId });
    
        if (user) {
          // Update the balance
          user.balance += recharge;
          await user.save();
    
          res.status(200).json({
            wallet_id: user.user_id,
            balance: user.balance,
            wallet_user: {
              user_id: user.user_id,
              user_name: user.user_name,
            },
          });
        } else {
          res.status(404).json({ message: `Wallet with ID ${walletId} not found.` });
        }
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}


module.exports = {
    getBalance,
    addBalance
}