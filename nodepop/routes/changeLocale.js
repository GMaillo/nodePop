const express = require('express');
const router = express.Router();

router.get('/:locale', (req, res, next) => {
    const locale = req.params.locale;
    const backTo = req.get('referer');
    console.log(backTo);
    res.cookie('nodepop-locale', locale, {maxAge: 1000 * 60 * 60 * 24 * 20});

    res.redirect(backTo);

});

module.exports = router;