const User = require('./../../models/index').User;
const Answer = require('./../../models/index').Answer;
const Op = require('./../../models/index').Sequelize.Op;
const sequelize = require('./../../models/index').sequelize;


module.exports = async (req, res) => {
    try{
        const user = await User.findOne({ where: {username: req.params.username }});
        const answers = await Answer.findAll({
            include: [{
                model: User,
                as: 'questionUser'
            }, {
                model: User,
                as: 'answerUser'
            }],
            where:  {
                answer_user_id: user.id,
                answer: { [Op.ne]: '' }
            }
        })

        const sugestions = await User.findAll({  limite: 4, order:  sequelize.random(), where: { id: {[Op.notIn]: [req.user.id] }}});
       
        return res.render('home/index', { user: req.user, answers, answerUser: user, sugestions });
    } catch(err){
        console.log('ERROR', err);
    }
    
}