const User = require('../models/User');

const getBalance = async (req, res, next) => {
  try {
    const { wallet_id } = req.params;
    const user = await User.findOne({ user_id: wallet_id });

    if (user) {
      res.status(200).json({
        status: 200,
        body: {
          wallet_id: user.user_id,
          balance: user.balance,
          wallet_user: {
            user_id: user.user_id,
            user_name: user.user_name,
          },
        }
      });
    } else {
      res.status(404).json({ status: 404, body: { message: `wallet with id: ${wallet_id} was not found` } });
    }
  } catch (error) {
    next(error);
  }
}

const addBalance = async (req, res, next) => {
  try {
    const walletId = parseInt(req.params.wallet_id);
    const { recharge } = req.body;

    // Validate recharge amount
    if (recharge < 100 || recharge > 10000) {
      return res.status(400).json({ status: 400, body: { message: `invalid amount: ${recharge}` } });
    }

    // Find the user by wallet ID
    const user = await User.findOne({ user_id: walletId });

    if (user) {
      // Update the balance
      user.balance += recharge;
      await user.save();

      res.status(200).json({
        status: 200,
        body: {
          wallet_id: user.user_id,
          balance: user.balance,
          wallet_user: {
            user_id: user.user_id,
            user_name: user.user_name,
          },
        }
      });
    } else {
      res.status(404).json({ status: 404, body: { message: `wallet with id; ${walletId} was not found.` } });
    }
  } catch (error) {
    next(error);
  }
}


module.exports = {
  getBalance,
  addBalance
}